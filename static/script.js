document.addEventListener("DOMContentLoaded", function() {
    // Système de logs conditionnel
    const DEBUG = false;
    function log(...args) {
        if (DEBUG) console.log(...args);
    }
    
    log("Script starting...");
    const canvasEl = document.querySelector("canvas#neuro");
    log("Canvas found:", canvasEl);

    // Détection mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Réduire la qualité sur mobile
    const devicePixelRatio = isMobile 
        ? Math.min(window.devicePixelRatio, 1) // Limiter à 1 sur mobile
        : Math.min(window.devicePixelRatio, 2); // Jusqu'à 2 sur desktop
    
    log("Device pixel ratio:", devicePixelRatio, "Mobile:", isMobile);

    if (!canvasEl) {
        console.error("Canvas element not found");
        return;
    }

    const pointer = {
        x: 0,
        y: 0,
        tX: 0,
        tY: 0,
    };

    let uniforms;
    let lastFrameTime = 0;
    let frameRateLimit = isMobile ? 30 : 60; // Limiter le framerate sur mobile
    
    log("Initializing shader...");
    const gl = initShader();
    log("WebGL context:", gl);

    if (!gl) {
        console.error("WebGL context could not be initialized.");
        return;
    }

    setupEvents();
    resizeCanvas();
    window.addEventListener("resize", throttle(resizeCanvas, 100)); // Fonction réduire les appels
    render();

    function initShader() {
        log("Getting shader sources...");
        const vsSource = document.getElementById("vertShader").innerHTML;
        const fsSource = document.getElementById("fragShader").innerHTML;
        
        // Pour mobile, simplifier le fragment shader en remplaçant le nombre d'itérations
        const optimizedFsSource = isMobile 
            ? fsSource.replace(/for \(int j = 0; j < 15; j\+\+\)/, 'for (int j = 0; j < 5; j++)') 
            : fsSource;
        
        log("Shader sources loaded");

        const gl = canvasEl.getContext("webgl", { 
            alpha: true,
            antialias: !isMobile, // Désactiver l'antialiasing sur mobile
            powerPreference: "high-performance",
            failIfMajorPerformanceCaveat: isMobile // Échouer rapidement plutôt que de ralentir
        }) || canvasEl.getContext("experimental-webgl", { alpha: true });
        
        if (!gl) {
            console.error("WebGL not supported");
            return null;
        }

        function createShader(gl, sourceCode, type) {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, sourceCode);
            gl.compileShader(shader);

            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error("Shader compilation error: " + gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }

            return shader;
        }

        const vertexShader = createShader(gl, vsSource, gl.VERTEX_SHADER);
        const fragmentShader = createShader(gl, optimizedFsSource, gl.FRAGMENT_SHADER);

        function createShaderProgram(gl, vertexShader, fragmentShader) {
            const program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);

            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                console.error("Shader program error: " + gl.getProgramInfoLog(program));
                return null;
            }

            return program;
        }

        const shaderProgram = createShaderProgram(gl, vertexShader, fragmentShader);
        uniforms = getUniforms(shaderProgram);

        function getUniforms(program) {
            let uniforms = [];
            let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
            for (let i = 0; i < uniformCount; i++) {
                let uniformName = gl.getActiveUniform(program, i).name;
                uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
            }
            return uniforms;
        }

        const vertices = new Float32Array([-1., -1., 1., -1., -1., 1., 1., 1.]);

        const vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        gl.useProgram(shaderProgram);

        const positionLocation = gl.getAttribLocation(shaderProgram, "a_position");
        gl.enableVertexAttribArray(positionLocation);

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        return gl;
    }

    function render(timestamp) {
        try {
            // Limiter le framerate
            const elapsed = timestamp - lastFrameTime;
            const fpsInterval = 1000 / frameRateLimit;
            
            if (elapsed < fpsInterval && lastFrameTime) {
                requestAnimationFrame(render);
                return;
            }
            
            lastFrameTime = timestamp - (elapsed % fpsInterval);
            const currentTime = performance.now();

            // Réduire la fréquence de mise à jour du pointeur sur mobile
            if (!isMobile || Math.random() < 0.5) {
                pointer.x += (pointer.tX - pointer.x) * (isMobile ? 0.3 : 0.5);
                pointer.y += (pointer.tY - pointer.y) * (isMobile ? 0.3 : 0.5);
            }

            gl.uniform1f(uniforms.u_time, currentTime);
            gl.uniform2f(uniforms.u_pointer_position, pointer.x / window.innerWidth, 1 - pointer.y / window.innerHeight);
            gl.uniform1f(uniforms.u_scroll_progress, window.pageYOffset / (2 * window.innerHeight));

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            requestAnimationFrame(render);
        } catch (error) {
            console.error("Render error:", error);
            
            // Sur mobile, en cas d'erreur, simplifier davantage
            if (isMobile && frameRateLimit > 15) {
                frameRateLimit = 15; // Réduire encore plus
                log("Reducing framerate to recover:", frameRateLimit);
                setTimeout(() => requestAnimationFrame(render), 1000);
            }
        }
    }

    function resizeCanvas() {
        // Réduire la résolution du canvas sur mobile
        const scaleFactor = isMobile ? 0.75 : 1;
        canvasEl.width = window.innerWidth * devicePixelRatio * scaleFactor;
        canvasEl.height = window.innerHeight * devicePixelRatio * scaleFactor;
        
        if (gl && uniforms && uniforms.u_ratio) {
            gl.uniform1f(uniforms.u_ratio, canvasEl.width / canvasEl.height);
            gl.viewport(0, 0, canvasEl.width, canvasEl.height);
        }
    }

    function setupEvents() {
        const moveHandler = isMobile
            ? throttle(updateMousePosition, 100) // Throttle sur mobile
            : updateMousePosition;
            
        window.addEventListener("pointermove", e => {
            moveHandler(e.clientX, e.clientY);
        });
        
        window.addEventListener("touchmove", e => {
            if (e.targetTouches && e.targetTouches[0]) {
                moveHandler(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
            }
        }, { passive: true }); // Ajouter passive pour améliorer le défilement
        
        window.addEventListener("click", e => {
            updateMousePosition(e.clientX, e.clientY);
        });

        function updateMousePosition(eX, eY) {
            pointer.tX = eX;
            pointer.tY = eY;
        }
    }
    
    // Utilitaire pour limiter la fréquence d'appel d'une fonction
    function throttle(callback, delay) {
        let lastCall = 0;
        return function(...args) {
            const now = new Date().getTime();
            if (now - lastCall < delay) {
                return;
            }
            lastCall = now;
            return callback(...args);
        };
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const contactButton = document.querySelector('.contact button');
    
    if (contactButton) {
      contactButton.addEventListener('click', function() {
        this.classList.toggle('active');
        document.querySelector('.contact .title').classList.toggle('active');
        document.querySelector('.contact nav').classList.toggle('active');
      });
    }
});
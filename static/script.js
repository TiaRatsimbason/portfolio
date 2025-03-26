document.addEventListener("DOMContentLoaded", function() {
    // Système de logs conditionnel
    const DEBUG = false;
    function log(...args) {
        if (DEBUG) console.log(...args);
    }
    
    log("Script starting...");
    const canvasEl = document.querySelector("canvas#neuro");
    log("Canvas found:", canvasEl);

    // Détection mobile - uniquement pour l'ajustement de résolution
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Même pixel ratio que sur PC mais légèrement réduit sur mobile pour performance
    const devicePixelRatio = Math.min(window.devicePixelRatio, 2);
    
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
    let frameRateLimit = 60; // Même framerate pour tous les appareils
    
    log("Initializing shader...");
    const gl = initShader();
    log("WebGL context:", gl);

    if (!gl) {
        console.error("WebGL context could not be initialized.");
        return;
    }

    setupEvents();
    resizeCanvas();
    window.addEventListener("resize", throttle(resizeCanvas, 100));
    render();

    function initShader() {
        log("Getting shader sources...");
        const vsSource = document.getElementById("vertShader").innerHTML;
        const fsSource = document.getElementById("fragShader").innerHTML;
        
        // IMPORTANT: Utiliser exactement le même shader sur mobile et PC
        log("Using identical shader on all devices");

        // IMPORTANT: Utiliser les mêmes options WebGL sur tous les appareils
        const gl = canvasEl.getContext("webgl", { 
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
            failIfMajorPerformanceCaveat: false // Désactivé partout pour maximiser la compatibilité
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
        const fragmentShader = createShader(gl, fsSource, gl.FRAGMENT_SHADER);

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

            // Animation du pointeur - identique sur tous les appareils
            pointer.x += (pointer.tX - pointer.x) * 0.5;
            pointer.y += (pointer.tY - pointer.y) * 0.5;

            gl.uniform1f(uniforms.u_time, currentTime);
            gl.uniform2f(uniforms.u_pointer_position, pointer.x / window.innerWidth, 1 - pointer.y / window.innerHeight);
            gl.uniform1f(uniforms.u_scroll_progress, window.pageYOffset / (2 * window.innerHeight));

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            requestAnimationFrame(render);
        } catch (error) {
            console.error("Render error:", error);
            
            // En cas d'erreur, on réessaie après un court délai
            setTimeout(() => requestAnimationFrame(render), 500);
        }
    }

    function resizeCanvas() {
        // Légère réduction de résolution sur mobile uniquement
        const scaleFactor = 1.0;
        canvasEl.width = window.innerWidth * devicePixelRatio * scaleFactor;
        canvasEl.height = window.innerHeight * devicePixelRatio * scaleFactor;
        
        if (gl && uniforms && uniforms.u_ratio) {
            gl.uniform1f(uniforms.u_ratio, canvasEl.width / canvasEl.height);
            gl.viewport(0, 0, canvasEl.width, canvasEl.height);
        }
    }

    function setupEvents() {
        // Utiliser le même gestionnaire partout pour la cohérence
        window.addEventListener("pointermove", e => {
            updateMousePosition(e.clientX, e.clientY);
        });
        
        window.addEventListener("touchmove", e => {
            if (e.targetTouches && e.targetTouches[0]) {
                updateMousePosition(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
            }
        }, { passive: true });
        
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
            const now = Date.now();
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
document.addEventListener("DOMContentLoaded", function() {
    // Système de logs conditionnel
    const DEBUG = false;
    function log(...args) {
        if (DEBUG) console.log(...args);
    }
    
    log("Script starting...");
    const canvasEl = document.querySelector("canvas#neuro");
    log("Canvas found:", canvasEl);

    // Détection mobile améliorée - combine user agent et taille d'écran
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     window.innerWidth < 768;
    
    // Réduire la qualité sur mobile
    const devicePixelRatio = isMobile 
        ? Math.min(window.devicePixelRatio, 0.75) // Plus réduit sur mobile
        : Math.min(window.devicePixelRatio, 2); // Jusqu'à 2 sur desktop
    
    log("Device pixel ratio:", devicePixelRatio, "Mobile:", isMobile);

    if (!canvasEl) {
        console.error("Canvas element not found");
        return;
    }

    const pointer = {
        x: 0,
        y: 0,
        tX: window.innerWidth / 2, // Position initiale centrée
        tY: window.innerHeight / 2, // Position initiale centrée
    };

    let uniforms;
    let lastFrameTime = 0;
    let frameRateLimit = isMobile ? 20 : 60; // Plus limité sur mobile
    
    log("Initializing shader...");
    const gl = initShader();
    log("WebGL context:", gl);

    if (!gl) {
        console.error("WebGL context could not be initialized.");
        // Tenter de configurer un canvas 2D basique sur mobile si WebGL échoue
        if (isMobile) {
            setupFallbackCanvas();
        }
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
        
        // Pour mobile, simplifier davantage le fragment shader
        let optimizedFsSource = fsSource;
        if (isMobile) {
            // Réduire à 3 itérations au lieu de 5 pour le mobile
            optimizedFsSource = fsSource.replace(/for \(int j = 0; j < 15; j\+\+\)/, 'for (int j = 0; j < 3; j++)');
            // Simplifier les opérations coûteuses si possible
            optimizedFsSource = optimizedFsSource.replace(/pow\((.*?), 3\)/g, '($1 * $1 * $1)');
        } else {
            // Sur PC, garder la version originale ou réduire légèrement (à 10 itérations)
            optimizedFsSource = fsSource.replace(/for \(int j = 0; j < 15; j\+\+\)/, 'for (int j = 0; j < 10; j++)');
        }
        
        log("Shader sources processed");

        // IMPORTANT: Configuration différente selon la plateforme
        // Sur PC, conserver les paramètres qui fonctionnent bien
        // Sur mobile, optimiser pour la performance
        const contextOptions = isMobile 
            ? { 
                alpha: true,
                antialias: false,
                powerPreference: "low-power",
                failIfMajorPerformanceCaveat: false // Tenter WebGL même sur appareils lents
              }
            : { 
                alpha: true,
                antialias: true,
                powerPreference: "high-performance",
                failIfMajorPerformanceCaveat: false
              };
        
        try {
            // Tenter d'obtenir le contexte WebGL avec les options adaptées à la plateforme
            const gl = canvasEl.getContext("webgl", contextOptions) || 
                      canvasEl.getContext("experimental-webgl", contextOptions);
            
            if (!gl) {
                log("WebGL not supported");
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

            if (!vertexShader || !fragmentShader) {
                return null;
            }

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
            if (!shaderProgram) {
                return null;
            }
            
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
        } catch (error) {
            console.error("Error initializing WebGL:", error);
            return null;
        }
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

            // Animation du pointeur avec mouvement plus fluide sur PC
            const easeSpeed = isMobile ? 0.2 : 0.5;
            pointer.x += (pointer.tX - pointer.x) * easeSpeed;
            pointer.y += (pointer.tY - pointer.y) * easeSpeed;

            // Mise à jour des uniforms
            gl.uniform1f(uniforms.u_time, isMobile ? currentTime * 0.5 : currentTime); // Animation plus lente sur mobile
            gl.uniform2f(uniforms.u_pointer_position, pointer.x / window.innerWidth, 1 - pointer.y / window.innerHeight);
            gl.uniform1f(uniforms.u_scroll_progress, window.pageYOffset / (2 * window.innerHeight));

            // Dessiner le contenu
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            requestAnimationFrame(render);
        } catch (error) {
            console.error("Render error:", error);
            
            // Stratégie de récupération sur erreur
            if (isMobile && frameRateLimit > 15) {
                frameRateLimit = 15; // Réduire davantage
                log("Reducing framerate to recover:", frameRateLimit);
                setTimeout(() => requestAnimationFrame(render), 800);
            } else {
                // Sur PC, essayer de poursuivre normalement
                setTimeout(() => requestAnimationFrame(render), 500);
            }
        }
    }

    function resizeCanvas() {
        // Réduire la résolution encore plus sur mobile
        const scaleFactor = isMobile ? 0.5 : 1;
        const effectivePixelRatio = isMobile ? Math.min(devicePixelRatio, 1) : devicePixelRatio;
        
        canvasEl.width = window.innerWidth * effectivePixelRatio * scaleFactor;
        canvasEl.height = window.innerHeight * effectivePixelRatio * scaleFactor;
        
        if (gl && uniforms && uniforms.u_ratio) {
            gl.uniform1f(uniforms.u_ratio, canvasEl.width / canvasEl.height);
            gl.viewport(0, 0, canvasEl.width, canvasEl.height);
        }
    }

    function setupEvents() {
        // Gestion des événements tactiles et souris optimisée
        const moveHandler = isMobile
            ? throttle(updateMousePosition, 150) // Throttle plus important sur mobile
            : throttle(updateMousePosition, 50); 
            
        window.addEventListener("pointermove", e => {
            moveHandler(e.clientX, e.clientY);
        }, { passive: true });
        
        window.addEventListener("touchmove", e => {
            if (e.targetTouches && e.targetTouches[0]) {
                moveHandler(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
            }
        }, { passive: true });
        
        window.addEventListener("click", e => {
            updateMousePosition(e.clientX, e.clientY);
        });

        // Animation autonome minimale sur mobile
        if (isMobile) {
            setInterval(() => {
                if (Math.random() > 0.8) {
                    const randomX = Math.random() * window.innerWidth;
                    const randomY = Math.random() * window.innerHeight;
                    updateMousePosition(randomX, randomY);
                }
            }, 3000);
        }

        function updateMousePosition(eX, eY) {
            pointer.tX = eX;
            pointer.tY = eY;
        }
    }
    
    // Version simplifiée du canvas de secours pour mobile
    function setupFallbackCanvas() {
        try {
            const ctx = canvasEl.getContext('2d');
            if (!ctx) return;
            
            log("Setting up fallback 2D canvas");
            
            canvasEl.width = window.innerWidth;
            canvasEl.height = window.innerHeight;
            
            let hue = 0;
            
            function animate() {
                hue = (hue + 0.2) % 360;
                
                ctx.fillStyle = `rgba(21, 25, 18, 0.1)`;
                ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
                
                for (let i = 0; i < 3; i++) {
                    const x = Math.random() * canvasEl.width;
                    const y = Math.random() * canvasEl.height;
                    const radius = Math.random() * 2 + 1;
                    
                    ctx.beginPath();
                    ctx.arc(x, y, radius, 0, Math.PI * 2);
                    ctx.fillStyle = `hsla(${hue + i * 30}, 70%, 50%, 0.2)`;
                    ctx.fill();
                }
                
                requestAnimationFrame(animate);
            }
            
            animate();
        } catch (error) {
            console.error("Fallback canvas error:", error);
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
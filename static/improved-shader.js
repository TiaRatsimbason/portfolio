/**
 * Animation de fond améliorée pour la compatibilité mobile
 * Avec gestion des contextes perdus et optimisation des performances
 */
document.addEventListener("DOMContentLoaded", function() {
    // Vérifier si WebGL est désactivé (sur mobile)
    if (window.webglDisabled === true) {
        console.log("WebGL désactivé sur cet appareil, shader ignoré");
        return;
    }
    
    // Système de logs conditionnel
    const DEBUG = false;
    function log(...args) {
        if (DEBUG) console.log(...args);
    }
    
    log("Improved Shader Script starting...");
    const canvasEl = document.querySelector("canvas#neuro");
    log("Canvas found:", canvasEl);
    
    // Détection mobile améliorée
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Réduire le pixel ratio sur mobile pour améliorer les performances
    const devicePixelRatio = isMobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2);
    
    log("Device pixel ratio:", devicePixelRatio, "Mobile:", isMobile);
    
    if (!canvasEl) {
        console.error("Canvas element not found");
        return;
    }
    
    // Variables pour le shader
    let gl = null;
    let shaderProgram = null;
    let uniforms = null;
    let vertexBuffer = null;
    let isAnimationRunning = true;
    let contextLostCount = 0;
    const MAX_CONTEXT_LOST_RETRIES = 5;
    
    // Variables pour le pointeur et le rendu
    const pointer = {
        x: 0,
        y: 0,
        tX: 0,
        tY: 0,
    };
    
    let lastFrameTime = 0;
    // Réduire le framerate sur mobile pour économiser la batterie
    let frameRateLimit = isMobile ? 30 : 60;
    
    // Initialiser le shader
    initWebGL();
    
    // Écouter les événements de contexte perdu/restauré
    canvasEl.addEventListener('webglcontextlost', handleContextLost, false);
    canvasEl.addEventListener('webglcontextrestored', handleContextRestored, false);
    
    // Configurer les événements d'interaction
    setupEvents();
    
    // Ajuster la taille du canvas
    resizeCanvas();
    window.addEventListener("resize", throttle(resizeCanvas, 200));
    
    // Démarrer le rendu
    render();
    
    // Fonction pour initialiser WebGL
    function initWebGL() {
        try {
            log("Initializing WebGL context...");
            
            // Obtenir le contexte WebGL
            gl = canvasEl.getContext("webgl", { 
                alpha: true,
                antialias: false, // Désactiver l'antialiasing sur mobile pour les performances
                powerPreference: "default", // 'high-performance' peut épuiser la batterie sur mobile
                failIfMajorPerformanceCaveat: false,
                preserveDrawingBuffer: false // Meilleure performance sur mobile
            }) || canvasEl.getContext("experimental-webgl", { alpha: true });
            
            if (!gl) {
                console.error("WebGL not supported");
                return;
            }
            
            // Initialiser le shader
            initShader();
            
            log("WebGL initialized successfully");
        } catch (error) {
            console.error("Error initializing WebGL:", error);
        }
    }
    
    // Gestion de la perte de contexte WebGL
    function handleContextLost(event) {
        event.preventDefault();
        console.warn("WebGL context lost");
        isAnimationRunning = false;
        contextLostCount++;
        
        // Si nous avons trop d'échecs, réduire la complexité
        if (contextLostCount > MAX_CONTEXT_LOST_RETRIES) {
            console.warn("Too many context losses, reducing shader complexity");
            frameRateLimit = Math.max(15, frameRateLimit - 5); // Réduire encore le framerate
        }
        
        // Essayer de récupérer après un délai
        setTimeout(() => {
            if (canvasEl && !isAnimationRunning) {
                try {
                    // Forcer la restauration du contexte
                    const newCanvas = canvasEl.cloneNode(true);
                    canvasEl.parentNode.replaceChild(newCanvas, canvasEl);
                    canvasEl = newCanvas;
                    
                    // Réinitialiser
                    initWebGL();
                    setupEvents();
                    resizeCanvas();
                    isAnimationRunning = true;
                    render();
                } catch (e) {
                    console.error("Failed to recover WebGL context:", e);
                }
            }
        }, 1000);
    }
    
    // Récupération du contexte WebGL
    function handleContextRestored() {
        console.log("WebGL context restored");
        
        // Réinitialiser tout
        initShader();
        resizeCanvas();
        isAnimationRunning = true;
        
        // Redémarrer l'animation
        if (!lastFrameTime) {
            lastFrameTime = performance.now();
            requestAnimationFrame(render);
        }
    }
    
    // Initialisation du shader
    function initShader() {
        if (!gl) return;
        
        try {
            log("Getting shader sources...");
            const vsSource = document.getElementById("vertShader").innerHTML;
            
            // Shader simplifié pour mobile pour améliorer les performances
            let fsSource;
            if (isMobile && contextLostCount > 1) {
                // Version simplifiée du shader pour les appareils qui ont des problèmes
                fsSource = `
                    precision mediump float;
                    varying vec2 vUv;
                    uniform float u_time;
                    uniform float u_ratio;
                    uniform vec2 u_pointer_position;
                    uniform float u_scroll_progress;
                    
                    vec2 rotate(vec2 uv, float th) {
                        return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
                    }
                    
                    float neuro_shape(vec2 uv, float t, float p) {
                        vec2 sine_acc = vec2(0.);
                        vec2 res = vec2(0.);
                        float scale = 8.;
                        
                        // Réduire le nombre d'itérations pour mobile
                        for (int j = 0; j < 8; j++) {
                            uv = rotate(uv, 1.);
                            sine_acc = rotate(sine_acc, 1.);
                            vec2 layer = uv * scale + float(j) + sine_acc - t;
                            sine_acc += sin(layer);
                            res += (.5 + .5 * cos(layer)) / scale;
                            scale *= (1.2 - .07 * p);
                        }
                        return res.x + res.y;
                    }
                    
                    void main() {
                        vec2 uv = .5 * vUv;
                        uv.x *= u_ratio;
                        
                        vec2 pointer = vUv - u_pointer_position;
                        pointer.x *= u_ratio;
                        float p = clamp(length(pointer), 0., 1.);
                        p = .5 * pow(1. - p, 2.);
                        
                        float t = .001 * u_time;
                        vec3 color = vec3(0.);
                        
                        float noise = neuro_shape(uv, t, p);
                        
                        noise = 1.2 * pow(noise, 3.);
                        noise = max(.0, noise - .5);
                        noise *= (1. - length(vUv - .5));
                        
                        color = normalize(vec3(.2, .5 + .4 * cos(3. * u_scroll_progress), .5 + .5 * sin(3. * u_scroll_progress)));
                        
                        color = color * noise;
                        
                        gl_FragColor = vec4(color, noise);
                    }
                `;
            } else {
                fsSource = document.getElementById("fragShader").innerHTML;
            }
            
            log("Compiling shaders...");
            
            // Créer et compiler les shaders
            const vertexShader = createShader(gl, vsSource, gl.VERTEX_SHADER);
            const fragmentShader = createShader(gl, fsSource, gl.FRAGMENT_SHADER);
            
            if (!vertexShader || !fragmentShader) {
                console.error("Failed to compile shaders");
                return;
            }
            
            // Créer le programme shader
            shaderProgram = createShaderProgram(gl, vertexShader, fragmentShader);
            
            if (!shaderProgram) {
                console.error("Failed to create shader program");
                return;
            }
            
            // Obtenir les locations des uniformes
            uniforms = getUniforms(shaderProgram);
            
            // Créer et lier le buffer de vertex
            const vertices = new Float32Array([-1., -1., 1., -1., -1., 1., 1., 1.]);
            
            vertexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
            
            // Utiliser le programme shader
            gl.useProgram(shaderProgram);
            
            // Configurer l'attribut de position
            const positionLocation = gl.getAttribLocation(shaderProgram, "a_position");
            gl.enableVertexAttribArray(positionLocation);
            
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
            
            log("Shader setup complete");
        } catch (error) {
            console.error("Error setting up shader:", error);
        }
    }
    
    // Créer un shader
    function createShader(gl, sourceCode, type) {
        try {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, sourceCode);
            gl.compileShader(shader);
            
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error("Shader compilation error: " + gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            
            return shader;
        } catch (error) {
            console.error("Error creating shader:", error);
            return null;
        }
    }
    
    // Créer un programme shader
    function createShaderProgram(gl, vertexShader, fragmentShader) {
        try {
            const program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);
            
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                console.error("Shader program error: " + gl.getProgramInfoLog(program));
                return null;
            }
            
            return program;
        } catch (error) {
            console.error("Error creating shader program:", error);
            return null;
        }
    }
    
    // Obtenir les locations des uniformes
    function getUniforms(program) {
        try {
            let uniforms = [];
            let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
            for (let i = 0; i < uniformCount; i++) {
                let uniformName = gl.getActiveUniform(program, i).name;
                uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
            }
            return uniforms;
        } catch (error) {
            console.error("Error getting uniforms:", error);
            return [];
        }
    }
    
    // Fonction de rendu
    function render(timestamp) {
        if (!isAnimationRunning || !gl || !shaderProgram || !uniforms) {
            return;
        }
        
        try {
            // Limiter le framerate
            const now = timestamp || performance.now();
            const elapsed = now - lastFrameTime;
            const fpsInterval = 1000 / frameRateLimit;
            
            if (elapsed < fpsInterval && lastFrameTime) {
                requestAnimationFrame(render);
                return;
            }
            
            lastFrameTime = now - (elapsed % fpsInterval);
            
            // Animation du pointeur
            pointer.x += (pointer.tX - pointer.x) * 0.5;
            pointer.y += (pointer.tY - pointer.y) * 0.5;
            
            // Mettre à jour les uniformes
            gl.uniform1f(uniforms.u_time, now);
            gl.uniform2f(uniforms.u_pointer_position, pointer.x / window.innerWidth, 1 - pointer.y / window.innerHeight);
            gl.uniform1f(uniforms.u_scroll_progress, window.pageYOffset / (2 * window.innerHeight));
            
            // Dessiner
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            
            // Planifier le prochain frame
            requestAnimationFrame(render);
        } catch (error) {
            console.error("Render error:", error);
            
            // Gestion des erreurs de rendu
            isAnimationRunning = false;
            
            // Réessayer après un délai
            setTimeout(() => {
                // Vérifier si le contexte est toujours valide
                let isContextLost = true;
                try {
                    isContextLost = gl.isContextLost();
                } catch (e) {
                    console.error("Cannot check if context is lost:", e);
                }
                
                if (isContextLost) {
                    // Essayer de récupérer le contexte
                    try {
                        initWebGL();
                        if (gl) {
                            isAnimationRunning = true;
                            lastFrameTime = 0;
                            requestAnimationFrame(render);
                        }
                    } catch (e) {
                        console.error("Failed to recover from render error:", e);
                    }
                } else {
                    // Le contexte est bon, réessayer le rendu
                    isAnimationRunning = true;
                    lastFrameTime = 0;
                    requestAnimationFrame(render);
                }
            }, 1000);
        }
    }
    
    // Redimensionner le canvas
    function resizeCanvas() {
        if (!canvasEl || !gl || !uniforms) return;
        
        try {
            // Calculer la taille
            const scaleFactor = isMobile ? 0.75 : 1.0; // Réduire la résolution sur mobile
            canvasEl.width = window.innerWidth * devicePixelRatio * scaleFactor;
            canvasEl.height = window.innerHeight * devicePixelRatio * scaleFactor;
            
            // Mettre à jour le viewport et le ratio
            if (uniforms.u_ratio) {
                gl.uniform1f(uniforms.u_ratio, canvasEl.width / canvasEl.height);
                gl.viewport(0, 0, canvasEl.width, canvasEl.height);
            }
        } catch (error) {
            console.error("Error resizing canvas:", error);
            
            // Essayer de récupérer en cas d'erreur
            setTimeout(() => initWebGL(), 500);
        }
    }
    
    // Configurer les événements
    function setupEvents() {
        try {
            // Enlever les anciens écouteurs si présents
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("click", handleClick);
            
            // Ajouter les nouveaux écouteurs
            window.addEventListener("pointermove", handlePointerMove);
            window.addEventListener("touchmove", handleTouchMove, { passive: true });
            window.addEventListener("click", handleClick);
            
            // Écouteur de visibilité pour suspendre/reprendre l'animation
            document.addEventListener("visibilitychange", handleVisibilityChange);
        } catch (error) {
            console.error("Error setting up events:", error);
        }
    }
    
    // Gestionnaires d'événements
    function handlePointerMove(e) {
        updateMousePosition(e.clientX, e.clientY);
    }
    
    function handleTouchMove(e) {
        if (e.targetTouches && e.targetTouches[0]) {
            updateMousePosition(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
        }
    }
    
    function handleClick(e) {
        updateMousePosition(e.clientX, e.clientY);
    }
    
    function handleVisibilityChange() {
        if (document.hidden) {
            // Page masquée, suspendre l'animation
            isAnimationRunning = false;
        } else {
            // Page visible, reprendre l'animation
            if (!isAnimationRunning) {
                isAnimationRunning = true;
                lastFrameTime = 0;
                requestAnimationFrame(render);
            }
        }
    }
    
    // Mettre à jour la position du pointeur
    function updateMousePosition(eX, eY) {
        pointer.tX = eX;
        pointer.tY = eY;
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

    // Ajouter un écouteur pour "heartbeat" - pour maintenir l'animation active
    setInterval(() => {
        if (!isAnimationRunning && !document.hidden) {
            console.log("Restarting animation via heartbeat");
            isAnimationRunning = true;
            lastFrameTime = 0;
            requestAnimationFrame(render);
        }
    }, 5000);
});

// Préserver le gestionnaire d'événements contact existant
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
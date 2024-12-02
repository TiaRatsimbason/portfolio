document.addEventListener("DOMContentLoaded", function() {
    console.log("Script starting...");
    const canvasEl = document.querySelector("canvas#neuro");
    console.log("Canvas found:", canvasEl);

    const devicePixelRatio = Math.min(window.devicePixelRatio, 2);
    console.log("Device pixel ratio:", devicePixelRatio);

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

    let uniforms; // Déclarer uniforms dans le scope global de la fonction

    console.log("Initializing shader...");
    const gl = initShader();
    console.log("WebGL context:", gl);

    if (!gl) {
        console.error("WebGL context could not be initialized.");
        return;
    }

    setupEvents();
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    render();

    function initShader() {
        console.log("Getting shader sources...");
        const vsSource = document.getElementById("vertShader").innerHTML;
        const fsSource = document.getElementById("fragShader").innerHTML;
        console.log("Shader sources loaded:", { vsSource, fsSource });

        const gl = canvasEl.getContext("webgl", { alpha: true }) || canvasEl.getContext("experimental-webgl", { alpha: true });
        
        if (!gl) {
            console.error("WebGL not supported");
            return null;
        }

        function createShader(gl, sourceCode, type) {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, sourceCode);
            gl.compileShader(shader);

            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
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
                console.error("Unable to initialize the shader program: " + gl.getProgramInfoLog(program));
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

    function render() {
        const currentTime = performance.now();

        pointer.x += (pointer.tX - pointer.x) * .5;
        pointer.y += (pointer.tY - pointer.y) * .5;

        gl.uniform1f(uniforms.u_time, currentTime);
        gl.uniform2f(uniforms.u_pointer_position, pointer.x / window.innerWidth, 1 - pointer.y / window.innerHeight);
        gl.uniform1f(uniforms.u_scroll_progress, window["pageYOffset"] / (2 * window.innerHeight));

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        requestAnimationFrame(render);
    }

    function resizeCanvas() {
        canvasEl.width = window.innerWidth * devicePixelRatio;
        canvasEl.height = window.innerHeight * devicePixelRatio;
        gl.uniform1f(uniforms.u_ratio, canvasEl.width / canvasEl.height);
        gl.viewport(0, 0, canvasEl.width, canvasEl.height);
    }

    function setupEvents() {
        window.addEventListener("pointermove", e => {
            updateMousePosition(e.clientX, e.clientY);
        });
        window.addEventListener("touchmove", e => {
            updateMousePosition(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
        });
        window.addEventListener("click", e => {
            updateMousePosition(e.clientX, e.clientY);
        });

        function updateMousePosition(eX, eY) {
            pointer.tX = eX;
            pointer.tY = eY;
        }
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

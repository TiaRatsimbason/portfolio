from flask import Flask, render_template
import os

app = Flask(__name__)

# Configuration pour les fichiers statiques
app.static_folder = 'static'

@app.route('/')
def accueil():
    return render_template('index.html')

# Assurez-vous que ce dossier existe
if not os.path.exists('templates'):
    os.makedirs('templates')
if not os.path.exists('static'):
    os.makedirs('static')

# Créer le fichier HTML
with open('templates/index.html', 'w', encoding='utf-8') as f:
    f.write("""
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css?family=Saira+Semi+Condensed" rel="stylesheet">
    <title>Mon Portfolio</title>
    <style>
        @import url('https://fonts.googleapis.com/css?family=Saira+Semi+Condensed');
        
        body {
            background: #39393B;
            font-family: 'Saira Semi Condensed', sans-serif;
            margin: 0;
            padding: 0;
            color: white;
            min-height: 100vh;
        }

        .main-container {
            color: #ffffff;
            text-align: center;
            padding: 20px;
            margin-top: 20px;
            position: relative;
            z-index: 2;
        }

        .first-container, .second-container, .third-container {
            cursor: pointer;
            position: relative;
            margin-bottom: 15px;
        }

        .share h1 {
            font-size: 3vw;
            letter-spacing: 5px;
            margin: 10px 0;
            line-height: 1;
            white-space: nowrap;
        }

        .share span {
            display: inline-block;
            position: relative;
            margin: 0 2px;
            transition: color 0.6s, transform 0.6s;
        }

        .share span:after {
            content: '';
            position: absolute;
            height: 100%;
            width: 0;
            top: 0;
            left: 0;
            transition: 0.6s;
            z-index: -5;
            background: white;
        }

        .share:hover span {
            color: #000;
        }

        .share:hover span:after {
            width: 100%;
        }

        /* Animation pour chaque lettre avec délai */
        .share:hover > h1 > span:nth-child(1):after { transition-delay: 100ms; transform: rotate(-25deg); }
        .share:hover > h1 > span:nth-child(2):after { transition-delay: 200ms; transform: rotate(-20deg); }
        .share:hover > h1 > span:nth-child(3):after { transition-delay: 300ms; transform: rotate(-15deg); }
        .share:hover > h1 > span:nth-child(4):after { transition-delay: 400ms; transform: rotate(-10deg); }
        .share:hover > h1 > span:nth-child(5):after { transition-delay: 500ms; transform: rotate(-5deg); }
        .share:hover > h1 > span:nth-child(6):after { transition-delay: 600ms; transform: rotate(0deg); }
        .share:hover > h1 > span:nth-child(7):after { transition-delay: 700ms; transform: rotate(5deg); }
        .share:hover > h1 > span:nth-child(8):after { transition-delay: 800ms; transform: rotate(10deg); }
        .share:hover > h1 > span:nth-child(9):after { transition-delay: 900ms; transform: rotate(-5deg); }
        .share:hover > h1 > span:nth-child(10):after { transition-delay: 1000ms; transform: rotate(5deg); }
        .share:hover > h1 > span:nth-child(11):after { transition-delay: 1100ms; transform: rotate(0deg); }
        .share:hover > h1 > span:nth-child(12):after { transition-delay: 1200ms; transform: rotate(5deg); }
        .share:hover > h1 > span:nth-child(13):after { transition-delay: 1300ms; transform: rotate(5deg); }
        .share:hover > h1 > span:nth-child(14):after { transition-delay: 1400ms; transform: rotate(10deg); }
        .share:hover > h1 > span:nth-child(15):after { transition-delay: 1500ms; transform: rotate(10deg); }
        .share:hover > h1 > span:nth-child(16):after { transition-delay: 1600ms; transform: rotate(20deg); }
        .share:hover > h1 > span:nth-child(17):after { transition-delay: 1700ms; transform: rotate(20deg); }
        .share:hover > h1 > span:nth-child(18):after { transition-delay: 1800ms; transform: rotate(20deg); }
        .share:hover > h1 > span:nth-child(19):after { transition-delay: 1900ms; transform: rotate(30deg); }
        .share:hover > h1 > span:nth-child(20):after { transition-delay: 2000ms; transform: rotate(25deg); }
        .share:hover > h1 > span:nth-child(21):after { transition-delay: 2100ms; transform: rotate(25deg); }
        .share:hover > h1 > span:nth-child(22):after { transition-delay: 2200ms; transform: rotate(20deg); }
        .share:hover > h1 > span:nth-child(23):after { transition-delay: 2300ms; transform: rotate(20deg); }
        
        /* Styles principaux */
        body, html {
            margin: 0;
            padding: 0;
            background-color: #151912;
            overflow-x: hidden;
            font-family: 'Saira Semi Condensed', sans-serif;
            color: white;
            min-height: 100vh;
        }

        .main-container {
            color: #ffffff;
            text-align: center;
            padding: 20px;
            margin-top: 20px;
            position: relative;
            z-index: 2;
        }

        .first-container, .second-container, .third-container {
            cursor: pointer;
            position: relative;
            margin-bottom: 15px;
        }

        .share h1 {
            font-size: 3vw;
            letter-spacing: 5px;
            margin: 10px 0;
            line-height: 1;
            white-space: nowrap;
        }

        .share span {
            display: inline-block;
            position: relative;
            margin: 0 2px;
            transition: color 0.6s, transform 0.6s;
        }

        .share span:after {
            content: '';
            position: absolute;
            height: 100%;
            width: 0;
            top: 0;
            left: 0;
            transition: 0.6s;
            z-index: -5;
            background: white;
        }

        .share:hover span {
            color: #000;
        }

        .share:hover span:after {
            width: 100%;
        }

        /* Styles principaux */
        header {
            background: rgba(44, 62, 80, 0.7);
            color: white;
            padding: 2rem;
            text-align: center;
            animation: fadeIn 1s ease-out;
            position: relative;
            z-index: 1;
            backdrop-filter: blur(5px);
        }
        
        .competences {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1rem;
            padding: 2rem;
            position: relative;
            z-index: 1;
        }
        
        .competence {
            background: rgba(52, 152, 219, 0.7);
            color: white;
            padding: 0.8rem 1.5rem;
            border-radius: 20px;
            animation: fadeIn 1s ease-out;
            backdrop-filter: blur(5px);
            transition: transform 0.3s ease;
        }

        .competence:hover {
            transform: scale(1.05);
            background: rgba(52, 152, 219, 0.9);
        }
        
        .projet-container {
            position: relative;
            margin: 2rem auto;
            max-width: 600px;
            z-index: 1;
            padding: 0 1rem;
            pointer-events: none;
        }

        .projet {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 25px;
            border-radius: 15px;
            position: relative;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            color: white;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            opacity: 1;
            pointer-events: auto;
        }

        .projet.visible {
            opacity: 1;
            transform: translateY(0);
        }

        .projet:hover {
            transform: scale(1.05);
            background: rgba(255, 255, 255, 0.15);
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
            z-index: 10;
        }
        
        .contact {
            background: rgba(44, 62, 80, 0.7);
            color: white;
            padding: 2rem;
            text-align: center;
            position: relative;
            z-index: 1;
            backdrop-filter: blur(5px);
            margin-top: 3rem;
        }

        .contact h2 {
            margin-bottom: 1rem;
        }

        .contact p {
            margin: 0.5rem 0;
        }

        .projet h2 {
            color: #3498db;
            margin-bottom: 1rem;
        }

        .projet p {
            line-height: 1.6;
        }

        @media (max-width: 768px) {
            .competence {
                padding: 0.5rem 1rem;
            }

            .projet-container {
                margin: 1rem;
            }

            .projet {
                padding: 1rem;
            }
            
            .share h1 {
                font-size: 7vw;
            }
        }

        canvas#neuro {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            opacity: .95;
        }
    </style>
</head>
<body>
    <canvas id="neuro"></canvas>
    <header>
        <div class="main-container">
            <div class="first-container share">
                <h1>
                    <span>M</span><span>A</span><span>C</span><span>H</span><span>I</span><span>N</span><span>E</span>
                    <span>L</span><span>E</span><span>A</span><span>R</span><span>N</span><span>I</span><span>N</span><span>G</span>
                    <span>E</span><span>N</span><span>G</span><span>I</span><span>N</span><span>E</span><span>E</span><span>R</span>
                </h1>
            </div>
        </div>
    </header>

    <section class="competences">
        <div class="competence">Python</div>
        <div class="competence">Machine Learning</div>
        <div class="competence">Deep Learning</div>
        <div class="competence">TensorFlow</div>
        <div class="competence">PyTorch</div>
        <div class="competence">Flask</div>
        <div class="competence">SQL</div>
        <div class="competence">Docker</div>
    </section>

    <div class="projet-container">
        <div class="projet">
            <h2>Système de Recommandation IA</h2>
            <p>Développement d'un système de recommandation basé sur l'apprentissage profond pour une plateforme e-commerce. Utilisation de PyTorch et mise en production avec Docker.</p>
        </div>
    </div>

    <div class="projet-container">
        <div class="projet">
            <h2>Détection d'Anomalies en Temps Réel</h2>
            <p>Implémentation d'un système de détection d'anomalies en temps réel utilisant des algorithmes de machine learning et déployé sur une architecture microservices.</p>
        </div>
    </div>

    <section class="contact">
        <h2>Contact</h2>
        <p>Email: ratsimbason.tia@email.com</p>
        <p>LinkedIn: linkedin.com/in/tia-ratsimbason-42110887</p>
        <p>GitHub: github.com/votre-compte</p>
    </section>

    <script type="x-shader/x-fragment" id="vertShader">
        precision mediump float;

        varying vec2 vUv;
        attribute vec2 a_position;

        void main() {
            vUv = .5 * (a_position + 1.);
            gl_Position = vec4(a_position, 0.0, 1.0);
        }
    </script>

    <script type="x-shader/x-fragment" id="fragShader">
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

            for (int j = 0; j < 15; j++) {
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
            noise += pow(noise, 10.);
            noise = max(.0, noise - .5);
            noise *= (1. - length(vUv - .5));

            color = normalize(vec3(.2, .5 + .4 * cos(3. * u_scroll_progress), .5 + .5 * sin(3. * u_scroll_progress)));

            color = color * noise;

            gl_FragColor = vec4(color, noise);
        }
    </script>

    <script>
        document.addEventListener("DOMContentLoaded", function() {
            const canvasEl = document.querySelector("canvas#neuro");
            const devicePixelRatio = Math.min(window.devicePixelRatio, 2);

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
        const gl = initShader();

        if (!gl) {
            console.error("WebGL context could not be initialized.");
            return;
        }

        setupEvents();

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        render();

        function initShader() {
            const vsSource = document.getElementById("vertShader").innerHTML;
            const fsSource = document.getElementById("fragShader").innerHTML;

            const gl = canvasEl.getContext("webgl") || canvasEl.getContext("experimental-webgl");

            if (!gl) {
                alert("WebGL is not supported by your browser.");
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
</script>
</body>
</html>
    """)

if __name__ == '__main__':
    app.run(debug=True)
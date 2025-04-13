window.onload = init;

// Fonction pour l'animation textuelle
function animateText() {
  // Lettering.js - pour séparer chaque lettre en span
  $(".title").lettering();
  $(".button").lettering();
  
  // Animation avec GSAP
  var title1 = new TimelineMax();
  title1.to(".button", 0, {visibility: 'hidden', opacity: 0})
  title1.staggerFromTo(".title span", 0.5, 
  {ease: Back.easeOut.config(1.7), opacity: 0, bottom: -80},
  {ease: Back.easeOut.config(1.7), opacity: 1, bottom: 0}, 0.05);
  title1.to(".button", 0.2, {visibility: 'visible', opacity: 1});
  
  // S'assurer que le bouton est correctement positionné sur mobile
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    const button = document.querySelector('.button');
    if (button) {
      button.style.transform = 'translateX(40%) rotate(-10deg)';
      button.style.right = '10px';
      button.style.left = 'auto';
      button.style.bottom = '20px';
      button.style.position = 'absolute';
      button.style.backgroundColor = 'rgba(0,0,0,0.5)';
    }
  }
  
  // Gestion du clic sur le bouton "Again"
  $('.button').off('click').on('click', function(event) {
    // Empêcher la propagation du clic pour éviter de déclencher handleClick
    event.stopPropagation();
    // Relancer l'animation
    animateText();
  });
}
let currentIndex = 0;
let clickable = true;
let isFirstLoad = true;

// Fonction pour gérer le clic
function handleClick(e) {
  if (e instanceof Event && e.type !== 'auto') {
    e.preventDefault();
  }
  
  if (!clickable) return; // Éviter les clics multiples rapides

  const articles = document.querySelectorAll("article");
  clickable = false; // Désactiver les clics pendant la transition

  // D'abord, rendre visible le conteneur principal s'il ne l'est pas déjà
  if (isFirstLoad) {
    document.querySelector("main").classList.remove("hidden");
    isFirstLoad = false;
  }
  
  // Toujours masquer l'animation textuelle quand on navigue
  hideTextAnimation();
  
  // Cacher l'article courant s'il y en a un d'affiché
  let articleVisible = false;
  for (let i = 0; i < articles.length; i++) {
    if (!articles[i].classList.contains("hide") || articles[i].style.display === 'flex') {
      articles[i].classList.add("hide");
      articles[i].style.display = 'none';
      articleVisible = true;
      
      // Petit délai pour attendre la fin de l'animation de disparition
      setTimeout(() => {
        // Afficher le suivant après que le précédent soit caché
        showNextArticle(articles);
      }, 1000); // Délai correspondant à l'animation de fade-out
      break;
    }
  }
  
  // Si aucun article n'est visible, afficher le premier
  if (!articleVisible) {
    showNextArticle(articles);
  }
}

// Fonction pour masquer l'animation textuelle
function hideTextAnimation() {
  const container = document.querySelector('.container');
  if (container) {
    container.style.display = 'none';
  }
  
  // Ne modifions que le bouton mobile spécifique s'il existe
  const mobileButton = document.querySelector('.mobile-again-button');
  if (mobileButton) {
    mobileButton.style.display = 'none';
  }
}

// Fonction pour afficher l'animation textuelle quand l'image apparait
function showTextAnimation() {
  // Rendre le conteneur visible
  const container = document.querySelector('.container');
  container.style.display = 'block';
  
  // Uniquement sur mobile, gérer le bouton mobile spécifique
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    const mobileButton = document.querySelector('.mobile-again-button');
    if (mobileButton) {
      mobileButton.style.display = 'block';
    }
  }
  
  // Lancer l'animation
  animateText();
}

// Fonction pour afficher l'article suivant
function showNextArticle(articles) {
  // Cacher tous les articles pour être sûr
  articles.forEach(article => article.classList.add("hide"));
  
  // Rendre l'article actuel visible
  articles[currentIndex].classList.remove("hide");
  articles[currentIndex].style.display = "flex";
  
  // Débug - afficher l'index actuel
  console.log("Affichage de l'article ", currentIndex);
  
  // Si c'est l'image finale (dernier article), afficher l'animation textuelle
  if (articles[currentIndex].classList.contains('final-image')) {
    setTimeout(showTextAnimation, 500); // Petit délai pour laisser l'image s'afficher d'abord
  } else {
    // S'assurer que l'animation textuelle est masquée pour les autres articles
    hideTextAnimation();
  }
  
  // Passer à l'index suivant pour le prochain clic
  currentIndex = (currentIndex + 1) % articles.length;
  
  // Réactiver les clics après un court délai pour éviter les doubles clics accidentels
  setTimeout(() => {
    clickable = true;
  }, 1000);
}

function init() {
  let renderer;
  const dpr = Math.max(1, devicePixelRatio);
  const resize = () => {
    const { innerWidth: width, innerHeight: height } = window;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    if (renderer) {
      renderer.updateScale(dpr);
    }
  };
  const source = document.querySelector("script[type='x-shader/x-fragment']")
    .textContent;
  document.title = "💻 Machine Learning Engineer";
  renderer = new Renderer(canvas, dpr);
  renderer.setup();
  renderer.init();
  resize();
  if (renderer.test(source) === null) {
    renderer.updateShader(source);
  }
  window.onresize = resize;
  const loop = (now) => {
    renderer.render(now);
    requestAnimationFrame(loop);
  };
  loop(0);
  
  // Ne pas lancer l'animation textuelle immédiatement
  // Elle sera lancée quand l'image apparaîtra
  
  // S'assurer que tous les articles sont initialement masqués
  document.querySelectorAll('article').forEach(article => {
    article.classList.add('hide');
    article.style.display = 'none';
  });
  
  // Ajouter les écouteurs d'événements pour le clic
  document.addEventListener('click', handleClick);
  document.addEventListener('touchstart', handleClick);
  
  // Démarrer automatiquement la présentation après un délai
  setTimeout(() => {
    if (isFirstLoad) { // Seulement si l'utilisateur n'a pas encore cliqué
      handleClick(new Event('auto'));
    }
    
    // S'assurer que l'animation textuelle est masquée au début
    hideTextAnimation();
  }, 2000);
}

class Renderer {
  #vertexSrc = "#version 300 es\nprecision highp float;\nin vec4 position;\nvoid main(){gl_Position=position;}";
  #fragmtSrc = "#version 300 es\nprecision highp float;\nout vec4 O;\nuniform float time;\nuniform vec2 resolution;\nvoid main() {\n\tvec2 uv=gl_FragCoord.xy/resolution;\n\tO=vec4(uv,sin(time)*.5+.5,1);\n}";
  #vertices = [-1, 1, -1, -1, 1, 1, 1, -1];
  constructor(canvas, scale) {
    this.canvas = canvas;
    this.scale = scale;
    this.gl = canvas.getContext("webgl2");
    this.gl.viewport(0, 0, canvas.width * scale, canvas.height * scale);
    this.shaderSource = this.#fragmtSrc;
    this.mouseCoords = [0, 0];
    this.pointerCoords = [0, 0];
    this.nbrOfPointers = 0;
  }
  get defaultSource() {
    return this.#fragmtSrc;
  }
  updateShader(source) {
    this.reset();
    this.shaderSource = source;
    this.setup();
    this.init();
  }
  updateMouse(coords) {
    this.mouseCoords = coords;
  }
  updatePointerCoords(coords) {
    this.pointerCoords = coords;
  }
  updatePointerCount(nbr) {
    this.nbrOfPointers = nbr;
  }
  updateScale(scale) {
    this.scale = scale;
    this.gl.viewport(
      0,
      0,
      this.canvas.width * scale,
      this.canvas.height * scale
    );
  }
  compile(shader, source) {
    const gl = this.gl;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
      this.canvas.dispatchEvent(
        new CustomEvent("shader-error", { detail: gl.getShaderInfoLog(shader) })
      );
    }
  }
  test(source) {
    let result = null;
    const gl = this.gl;
    const shader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      result = gl.getShaderInfoLog(shader);
    }
    if (gl.getShaderParameter(shader, gl.DELETE_STATUS)) {
      gl.deleteShader(shader);
    }
    return result;
  }
  reset() {
    const { gl, program, vs, fs } = this;
    if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return;
    if (gl.getShaderParameter(vs, gl.DELETE_STATUS)) {
      gl.detachShader(program, vs);
      gl.deleteShader(vs);
    }
    if (gl.getShaderParameter(fs, gl.DELETE_STATUS)) {
      gl.detachShader(program, fs);
      gl.deleteShader(fs);
    }
    gl.deleteProgram(program);
  }
  setup() {
    const gl = this.gl;
    this.vs = gl.createShader(gl.VERTEX_SHADER);
    this.fs = gl.createShader(gl.FRAGMENT_SHADER);
    this.compile(this.vs, this.#vertexSrc);
    this.compile(this.fs, this.shaderSource);
    this.program = gl.createProgram();
    gl.attachShader(this.program, this.vs);
    gl.attachShader(this.program, this.fs);
    gl.linkProgram(this.program);
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(this.program));
    }
  }
  init() {
    const { gl, program } = this;
    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(this.#vertices),
      gl.STATIC_DRAW
    );
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    program.resolution = gl.getUniformLocation(program, "resolution");
    program.time = gl.getUniformLocation(program, "time");
    program.touch = gl.getUniformLocation(program, "touch");
    program.pointerCount = gl.getUniformLocation(program, "pointerCount");
    program.pointers = gl.getUniformLocation(program, "pointers");
  }
  render(now = 0) {
    const {
      gl,
      program,
      buffer,
      canvas,
      mouseCoords,
      pointerCoords,
      nbrOfPointers
    } = this;

    if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return;
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.uniform2f(program.resolution, canvas.width, canvas.height);
    gl.uniform1f(program.time, now * 1e-3);
    gl.uniform2f(program.touch, ...mouseCoords);
    gl.uniform1i(program.pointerCount, nbrOfPointers);
    gl.uniform2fv(program.pointers, pointerCoords);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}
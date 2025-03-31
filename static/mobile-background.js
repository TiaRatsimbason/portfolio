/**
 * Solution de fond d'écran vidéo pour mobile
 * Remplace le shader WebGL par une vidéo en boucle sur les appareils mobiles
 */
document.addEventListener('DOMContentLoaded', function() {
    // Détection mobile améliorée
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                    (window.innerWidth <= 768);
    
    if (isMobile) {
      console.log('Appareil mobile détecté, utilisation du fond vidéo');
      
      // 1. Masquer le canvas WebGL
      const canvasEl = document.querySelector("canvas#neuro");
      if (canvasEl) {
        canvasEl.style.display = 'none';
      }
      
      // 2. Créer l'élément vidéo
      const videoBackground = document.createElement('div');
      videoBackground.id = 'video-background';
      videoBackground.innerHTML = `
        <video autoplay loop muted playsinline id="background-video">
          <source src="/static/videos/abstract-background.mp4" type="video/mp4">
        </video>
      `;
      
      // 3. Ajouter des styles pour la vidéo
      const videoStyles = document.createElement('style');
      videoStyles.textContent = `
        #video-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }
        
        #background-video {
          position: absolute;
          top: 50%;
          left: 50%;
          min-width: 100%;
          min-height: 100%;
          width: auto;
          height: auto;
          transform: translateX(-50%) translateY(-50%);
          object-fit: cover;
          opacity: 0.8;
        }
      `;
      
      // 4. Ajouter au DOM
      document.head.appendChild(videoStyles);
      document.body.insertBefore(videoBackground, document.body.firstChild);
      
      // 5. S'assurer que la vidéo se lance correctement
      const video = document.getElementById('background-video');
      
      // Fonction pour tenter de lancer la vidéo si elle ne démarre pas automatiquement
      const tryPlayVideo = function() {
        if (video && video.paused) {
          video.play().catch(error => {
            console.log('Lecture vidéo différée, nouvelle tentative dans 1s');
            setTimeout(tryPlayVideo, 1000);
          });
        }
      };
      
      // Essayer de lancer la vidéo au chargement
      tryPlayVideo();
      
      // Tentative supplémentaire lors de l'interaction utilisateur
      document.addEventListener('touchstart', function() {
        tryPlayVideo();
      }, { once: true });
      
      // 6. Désactiver le script WebGL pour économiser les ressources
      window.webglDisabled = true;
    } else {
      console.log('Desktop détecté, utilisation du shader WebGL');
    }
  });
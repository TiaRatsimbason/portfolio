/**
 * Solution de fond d'écran vidéo pour mobile
 * Remplace le shader WebGL par une vidéo en boucle sur les appareils mobiles
 */
document.addEventListener('DOMContentLoaded', function() {
    // Configuration du fond d'écran vidéo
    const config = {
      // Mettre à false pour désactiver la vidéo et utiliser WebGL partout
      enableVideoBackground: true,
      // Ajuster la taille de la vidéo (1 = taille normale, <1 pour dézoomer, >1 pour zoomer)
      videoScale: 1.0
    };
    
    // Détection mobile améliorée
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                    (window.innerWidth <= 768);
    
    if (isMobile && config.enableVideoBackground) {
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
          <source src="/static/videos/video.mp4" type="video/mp4">
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
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover; /* Ceci assure que la vidéo couvre toute la zone tout en maintenant ses proportions */
          object-position: center center; /* Centre le contenu */
          opacity: 0.8;
        }
        
        /* Styles alternatifs si object-fit ne fonctionne pas correctement */
        @media screen and (max-width: 767px) {
          #background-video {
            /* Mode alternatif pour certains appareils */
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      `;
      
      // 4. Ajouter au DOM
      document.head.appendChild(videoStyles);
      document.body.insertBefore(videoBackground, document.body.firstChild);
      
      // 5. S'assurer que la vidéo se lance correctement et appliquer l'échelle
      const video = document.getElementById('background-video');
      
      // Appliquer l'échelle de la vidéo si nécessaire
      if (video && config.videoScale !== 1.0) {
        // Ajouter du CSS inline pour contrôler l'échelle
        video.style.transform = `scale(${config.videoScale})`;
      }
      
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
      
      // 7. Ajouter une fonction pour ajuster la vidéo depuis la console si nécessaire
      window.adjustVideoBackground = function(newScale) {
        const video = document.getElementById('background-video');
        if (video) {
          config.videoScale = newScale;
          video.style.transform = `scale(${config.videoScale})`;
          console.log(`Échelle de la vidéo ajustée à: ${config.videoScale}`);
        } else {
          console.error("Vidéo non trouvée");
        }
      };
    } else {
      console.log('Desktop détecté, utilisation du shader WebGL');
    }
  });
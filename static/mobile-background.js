/**
 * Solution simplifiée de fond d'écran vidéo pour mobile
 * Remplace le shader WebGL par une vidéo en boucle sur les appareils mobiles
 */
document.addEventListener('DOMContentLoaded', function() {
    // Détection mobile
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
          background-color: #151912; /* Couleur de fond qui correspond à votre site */
        }
        
        #background-video {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: contain; /* Montre toute la vidéo sans la couper */
          opacity: 0.8;
        }
      `;
      
      // 4. Ajouter au DOM
      document.head.appendChild(videoStyles);
      document.body.insertBefore(videoBackground, document.body.firstChild);
      
      // 5. S'assurer que la vidéo se lance correctement
      const video = document.getElementById('background-video');
      video.play().catch(error => {
        console.log('Lecture vidéo différée, tentative au prochain clic utilisateur');
        
        // Tentative de lecture au clic
        document.addEventListener('touchstart', function() {
          video.play().catch(e => console.error('Échec de lecture vidéo:', e));
        }, { once: true });
      });
      
      // 6. Désactiver le script WebGL pour économiser les ressources
      window.webglDisabled = true;
      
      // 7. Fonction utilitaire pour basculer entre les modes d'affichage
      window.toggleVideoFit = function() {
        if (video) {
          video.style.objectFit = video.style.objectFit === 'contain' ? 'cover' : 'contain';
          console.log(`Mode d'affichage: ${video.style.objectFit}`);
        }
      };
    } else {
      console.log('Desktop détecté, utilisation du shader WebGL');
    }
  });
/**
 * Correction du centrage du titre "MACHINE LEARNING ENGINEER" sur mobile
 */
document.addEventListener('DOMContentLoaded', function() {
    // Éviter les exécutions multiples
    if (window.titleMobileFixApplied) return;
    window.titleMobileFixApplied = true;
    
    console.log('Title mobile optimization initializing...');
    
    // Attendre que tous les styles et scripts soient chargés
    setTimeout(function() {
      // Vérifier si les styles ont déjà été injectés
      if (!document.getElementById('title-mobile-styles')) {
        // Injecter des styles CSS prioritaires pour centrer le titre sur mobile
        const mobileStyles = document.createElement('style');
        mobileStyles.id = 'title-mobile-styles';
        mobileStyles.textContent = `
          /* Styles prioritaires pour le titre sur mobile */
          @media screen and (max-width: 599px) {
            /* Conteneur principal du titre */
            .first-container.share {
              width: 100% !important;
              max-width: 100% !important;
              padding: 0 15px !important;
              box-sizing: border-box !important;
            }
            
            /* Style du titre */
            .first-container.share h1 {
              width: 100% !important;
              font-size: 5.5vw !important;
              white-space: normal !important;
              letter-spacing: 2px !important;
              line-height: 1.4 !important;
              margin: 0 auto 15px auto !important;
              padding: 0 !important;
              transform: translateX(0) !important;
            }
            
            /* Style des lettres dans le titre */
            .first-container.share h1 span {
              font-size: 7.2vw !important;
              margin: 0 1px !important;
            }
          }
          
          /* Très petits écrans */
          @media screen and (max-width: 375px) {
            .first-container.share h1 {
              font-size: 5vw !important;
            }
            
            .first-container.share h1 span {
              font-size: 6.6vw !important;
            }
          }
        `;
        
        document.head.appendChild(mobileStyles);
        console.log('Styles mobiles pour le titre injectés');
      }
      
      // Fonction pour ajuster le centrage du titre sur les petits écrans
      const adjustTitleCentering = function() {
        // Vérifier si on est sur mobile
        if (window.innerWidth <= 599) {
          const titleContainer = document.querySelector('.first-container.share');
          const title = document.querySelector('.first-container.share h1');
          
          if (titleContainer && title) {
            // Assurer que le conteneur du titre prend toute la largeur disponible
            titleContainer.style.width = '100%';
            titleContainer.style.maxWidth = '100%';
            
            // Forcer le titre à prendre toute la largeur et à s'adapter
            title.style.width = '100%';
            title.style.whiteSpace = 'normal';
            title.style.transform = 'translateX(0)';
          }
        }
      };
      
      // Appliquer les ajustements immédiatement
      adjustTitleCentering();
      
      // Observer les changements de taille d'écran pour réappliquer si nécessaire
      let resizeTimeout;
      window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(adjustTitleCentering, 250);
      });
      
    }, 800); // Délai suffisant pour s'assurer que tous les CSS sont chargés
  });
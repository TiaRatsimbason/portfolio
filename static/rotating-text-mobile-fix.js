/**
 * Optimisation mobile pour le texte rotatif
 * Augmente la taille du texte et éloigne la section du titre principal sur mobile
 */
document.addEventListener('DOMContentLoaded', function() {
    // Éviter les exécutions multiples
    if (window.rotatingTextMobileFixApplied) return;
    window.rotatingTextMobileFixApplied = true;
    
    console.log('Rotating text mobile optimization initializing...');
    
    // Attendre que tous les styles et scripts soient chargés
    setTimeout(function() {
      // Vérifier si les styles ont déjà été injectés
      if (!document.getElementById('rotating-text-mobile-styles')) {
        // Injecter des styles CSS prioritaires pour le texte rotatif sur mobile
        const mobileStyles = document.createElement('style');
        mobileStyles.id = 'rotating-text-mobile-styles';
        mobileStyles.textContent = `
          /* Styles prioritaires pour le texte rotatif sur mobile */
          @media screen and (max-width: 599px) {
            /* Ajouter de l'espace entre le titre et la section rotative */
            .header-extension {
              margin-top: 40px !important;
              padding-top: 10px !important;
            }
            
            /* Conteneur du texte rotatif */
            .rotating-text-section {
              height: 160px !important; /* Augmenter la hauteur pour plus d'espace */
              margin-top: 15px !important;
            }
            
            /* Conteneur des mots qui tournent */
            #rotate-words {
              height: 160px !important;
              font-size: 1.6em !important; /* Augmenter la taille sur mobile */
            }
            
            /* Texte secondaire (sous-titre) */
            #rotate-words span {
              height: auto !important;
              min-height: 35px !important;
              font-size: 0.8em !important; /* Augmenter la taille du sous-titre */
              margin-top: 8px !important;
              display: block !important;
            }
            
            /* Éléments animés individuels */
            #rotate-words div {
              line-height: 1.4em !important;
            }
          }
          
          /* Très petits écrans */
          @media screen and (max-width: 375px) {
            .header-extension {
              margin-top: 30px !important; /* Un peu moins d'espace sur très petits écrans */
            }
            
            #rotate-words {
              font-size: 1.4em !important; /* Plus petit sur très petits écrans */
            }
            
            #rotate-words span {
              font-size: 0.75em !important;
            }
          }
        `;
        
        document.head.appendChild(mobileStyles);
        console.log('Styles mobiles pour le texte rotatif injectés');
      }
      
      // Fonction pour ajuster dynamiquement la section de texte rotatif
      const adjustRotatingText = function() {
        // Vérifier si on est sur mobile
        if (window.innerWidth <= 599) {
          const headerExtension = document.querySelector('.header-extension');
          const rotatingSection = document.querySelector('.rotating-text-section');
          const rotateWords = document.getElementById('rotate-words');
          
          if (headerExtension && rotatingSection && rotateWords) {
            // Ajuster l'espacement
            headerExtension.style.marginTop = '40px';
            headerExtension.style.paddingTop = '10px';
            
            // Ajuster la hauteur du conteneur
            rotatingSection.style.height = '160px';
            rotateWords.style.height = '160px';
            
            // Augmenter la taille du texte
            rotateWords.style.fontSize = window.innerWidth <= 375 ? '1.4em' : '1.6em';
            
            // Ajuster les spans (sous-titres)
            const spans = rotateWords.querySelectorAll('span');
            spans.forEach(span => {
              span.style.fontSize = window.innerWidth <= 375 ? '0.75em' : '0.8em';
              span.style.marginTop = '8px';
              span.style.minHeight = '35px';
            });
          }
        }
      };
      
      // Appliquer les ajustements immédiatement
      adjustRotatingText();
      
      // Observer les changements de taille d'écran
      let resizeTimeout;
      window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(adjustRotatingText, 250);
      });
      
    }, 1000); // Délai suffisant pour s'assurer que tous les CSS sont chargés
  });
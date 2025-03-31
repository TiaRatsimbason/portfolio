/**
 * Optimisation mobile améliorée pour le slider de projets
 * Version optimisée avec une meilleure gestion des conflits potentiels
 */
document.addEventListener('DOMContentLoaded', function() {
    // Éviter les exécutions multiples
    if (window.mobileProjectFixApplied) return;
    window.mobileProjectFixApplied = true;
    
    console.log('Mobile project optimization initializing...');
    
    // Attendre que tous les styles et scripts soient chargés
    setTimeout(function() {
      // Vérifier si les styles ont déjà été injectés
      if (!document.getElementById('mobile-project-styles')) {
        // Injecter des styles CSS prioritaires pour les appareils mobiles
        const mobileStyles = document.createElement('style');
        mobileStyles.id = 'mobile-project-styles';
        mobileStyles.textContent = `
          /* Styles prioritaires pour les projets sur mobile */
          @media screen and (max-width: 599px) {
            /* Conteneur principal du slider */
            #projet-target, .projet-walkthrough {
              width: 100% !important;
              max-width: 100% !important;
              padding: 10px 0 !important;
              overflow: visible !important;
              contain: layout style !important;
            }
            
            /* Conteneur Swiper */
            .swiper-container {
              width: calc(100% - 20px) !important;
              max-width: 100% !important;
              margin: 0 auto !important;
              overflow: visible !important;
              padding: 10px 0 40px !important;
            }
            
            /* Slides Swiper */
            .swiper-slide {
              width: 100% !important;
              overflow: visible !important;
              transform: scale(0.97) !important;
              transform-origin: center center !important;
            }
            
            /* Carte de projet */
            .card-item {
              width: 100% !important;
              padding: 25px 20px !important;
              margin: 0 auto !important;
              overflow: visible !important;
              box-sizing: border-box !important;
            }
            
            /* Contenu de la carte */
            .card-content {
              gap: 10px !important;
            }
            
            /* Titre du projet */
            .card-item h2 {
              font-size: 1.4rem !important;
              line-height: 1.2 !important;
            }
            
            /* Description du projet */
            .card-item p, .projet-description {
              font-size: 0.9rem !important;
              line-height: 1.3 !important;
            }
            
            /* Liste des tâches */
            .projet-tasks {
              padding-left: 15px !important;
            }
            
            .projet-tasks li {
              margin-bottom: 5px !important;
              font-size: 0.85rem !important;
              line-height: 1.3 !important;
            }
            
            /* Tech stack */
            .tech-stack {
              font-size: 0.85rem !important;
              padding: 6px 10px !important;
              max-width: 100% !important;
              overflow-wrap: break-word !important;
              word-wrap: break-word !important;
            }
            
            /* Boutons de navigation */
            .swiper-button-prev,
            .swiper-button-next {
              width: 30px !important;
              height: 30px !important;
              background: rgba(255, 255, 255, 0.2) !important;
            }
            
            .swiper-button-prev {
              left: 0 !important;
            }
            
            .swiper-button-next {
              right: 0 !important;
            }
            
            .swiper-button-prev:after,
            .swiper-button-next:after {
              font-size: 14px !important;
            }
            
            /* Pagination */
            .swiper-pagination {
              bottom: 0 !important;
            }
          }
          
          /* Très petits écrans */
          @media screen and (max-width: 380px) {
            .card-item {
              padding: 20px 15px !important;
              transform: scale(0.95) !important;
            }
            
            .card-item h2 {
              font-size: 1.2rem !important;
            }
            
            .tech-stack {
              font-size: 0.8rem !important;
              padding: 5px 8px !important;
            }
            
            /* Détails du projet */
            .projet-details {
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 5px !important;
            }
          }
        `;
        
        document.head.appendChild(mobileStyles);
        console.log('Styles mobiles pour les projets injectés');
      }
      
      // Fonction pour surveiller l'initialisation de Swiper avec un observateur de mutations
      const setupMobileSwiperObserver = function() {
        // Fonction pour optimiser le Swiper sur mobile
        const optimizeSwiperForMobile = function() {
          // Vérifier si on est sur mobile
          if (window.innerWidth <= 599 && window.mySwiper) {
            console.log('Optimizing Swiper for mobile...');
            
            try {
              // Stocker les paramètres de l'instance actuelle
              const currentSlide = window.mySwiper.activeIndex;
              const wasLooping = window.mySwiper.params.loop;
              
              // Détruire l'ancienne instance
              window.mySwiper.destroy(true, true);
              
              // Recréer avec des paramètres optimisés pour mobile
              window.mySwiper = new Swiper(".swiper-container", {
                slidesPerView: 1,
                spaceBetween: 15,
                centeredSlides: true,
                initialSlide: currentSlide || 0,
                loop: wasLooping,
                speed: 400,
                simulateTouch: true,
                touchRatio: 1.5,
                shortSwipes: true,
                
                pagination: {
                  el: ".swiper-pagination",
                  clickable: true,
                  dynamicBullets: true
                },
                
                navigation: {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev"
                }
              });
              
              // Assurer la visibilité des slides
              document.querySelectorAll('.swiper-slide').forEach(slide => {
                slide.style.opacity = slide.classList.contains('swiper-slide-active') ? '1' : '0';
                slide.style.visibility = slide.classList.contains('swiper-slide-active') ? 'visible' : 'hidden';
              });
              
              // Ajouter des écouteurs pour la gestion de la visibilité
              window.mySwiper.on('slideChangeTransitionStart', function() {
                document.querySelectorAll('.swiper-slide').forEach(slide => {
                  if (!slide.classList.contains('swiper-slide-active')) {
                    slide.style.opacity = '0';
                  }
                });
              });
              
              window.mySwiper.on('slideChangeTransitionEnd', function() {
                document.querySelectorAll('.swiper-slide').forEach(slide => {
                  if (slide.classList.contains('swiper-slide-active')) {
                    slide.style.opacity = '1';
                    slide.style.visibility = 'visible';
                  } else {
                    slide.style.opacity = '0';
                    slide.style.visibility = 'hidden';
                  }
                });
              });
              
              console.log('Swiper optimisé pour mobile');
              
              // Petite correction pour les boutons de navigation potentiellement masqués
              setTimeout(() => {
                const prevBtn = document.querySelector('.swiper-button-prev');
                const nextBtn = document.querySelector('.swiper-button-next');
                if (prevBtn) prevBtn.style.display = 'flex';
                if (nextBtn) nextBtn.style.display = 'flex';
              }, 100);
              
            } catch (error) {
              console.error('Erreur lors de l\'optimisation mobile de Swiper:', error);
            }
          }
        };
        
        // Observer le clic sur le bouton "View Work"
        document.addEventListener('click', function(e) {
          if (e.target.closest('.project-button')) {
            console.log('View Work button clicked, waiting for Swiper initialization...');
            
            // Utiliser un intervalle pour vérifier l'initialisation de Swiper
            let checkCount = 0;
            const checkInterval = setInterval(() => {
              if (window.mySwiper || checkCount > 20) {
                clearInterval(checkInterval);
                if (window.mySwiper) {
                  setTimeout(optimizeSwiperForMobile, 300);
                }
              }
              checkCount++;
            }, 100);
          }
        });
        
        // Observer les changements de taille d'écran
        let resizeTimeout;
        window.addEventListener('resize', function() {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(() => {
            if (document.querySelector('.projet-walkthrough.visible')) {
              optimizeSwiperForMobile();
            }
          }, 300);
        });
      };
      
      // Initialiser l'observateur
      setupMobileSwiperObserver();
      
    }, 1000); // Délai suffisant pour s'assurer que tous les CSS sont chargés
  });
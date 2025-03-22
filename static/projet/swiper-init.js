document.addEventListener('DOMContentLoaded', function() {
    console.log('Simplified Swiper init script loaded');
    
    // Fonction pour initialiser Swiper appelée quand on clique sur le bouton
    document.addEventListener('click', function(e) {
      if (e.target.closest('.project-button')) {
        console.log('View Work button clicked');
        
        // Initialiser Swiper après l'animation de transition
        setTimeout(function() {
          try {
            console.log('Initializing Swiper...');
            
            // Configuration simple de Swiper
            const swiper = new Swiper('.swiper-container', {
              init: false, // Ne pas initialiser immédiatement
              loop: false, // Désactiver le loop pour simplifier
              effect: 'slide',
              slidesPerView: 1,
              centeredSlides: true,
              spaceBetween: 50,
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
              pagination: {
                el: '.swiper-pagination',
                clickable: true,
              }
            });
            
            // Initialiser manuellement
            swiper.on('init', function() {
              console.log('Swiper initialized successfully');
              // Rendre visible le slide actif
              setTimeout(function() {
                const activeSlide = document.querySelector('.swiper-slide-active');
                if (activeSlide) {
                  console.log('Making active slide visible');
                  activeSlide.style.opacity = '1';
                }
              }, 100);
            });
            
            // Initialiser manuellement
            swiper.init();
            
          } catch(e) {
            console.error('Error initializing Swiper:', e);
          }
        }, 1000); // Délai important pour s'assurer que tout est prêt
      }
    });
  });
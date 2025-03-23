/**
 * Solution simplifiée pour le slider de projets
 */
document.addEventListener('DOMContentLoaded', () => {
    setupThumbPanning();
    setupButtonMovement();
    setupViewWorkButton();
  });
  
  // Animation du mouvement de l'image dans la carte
  function setupThumbPanning() {
    const thumbs = document.querySelectorAll('.thumb');
    thumbs.forEach((thumb) => {
      const image = thumb.querySelector('.thumb-img');
      if (!image) return;
      
      thumb.addEventListener('mousemove', (e) => {
        if (typeof gsap !== 'undefined') {
          const rect = thumb.getBoundingClientRect();
          const xPercent = (e.clientX - rect.left) / rect.width * 100 - 50;
          const yPercent = (e.clientY - rect.top) / rect.height * 100 - 50;
          const xMove = xPercent * 0.05; 
          const yMove = yPercent * 0.05;
          gsap.to(image, { duration: 0.25, x: `${-xMove}%`, y: `${-yMove}%`, ease: 'power3.out' });
        }
      });
      
      thumb.addEventListener('mouseleave', () => {
        if (typeof gsap !== 'undefined') {
          gsap.to(image, { duration: 0.25, x: '0%', y: '0%', ease: 'power3.out' });
        }
      });
    });
  }
  
  // Animation du bouton qui suit le curseur
  function setupButtonMovement() {
    if (typeof gsap === 'undefined') return;
    
    const thumbs = document.querySelectorAll(".thumb");
    thumbs.forEach((thumb) => {
      const button = thumb.querySelector(".project-button");
      if (!button) return;
      
      const xTo = gsap.quickTo(button, "x", { ease: "power3" });
      const yTo = gsap.quickTo(button, "y", { ease: "power3" });
      
      thumb.addEventListener("mousemove", (e) => {
        const boundingRect = thumb.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const x = e.pageX - boundingRect.left - boundingRect.width / 2;
        const y = e.pageY - boundingRect.top - boundingRect.height / 2 - scrollTop;
        xTo(x);
        yTo(y);
      });
      
      thumb.addEventListener("mouseleave", () => {
        xTo(0);
        yTo(0);
      });
    });
  }
  
  // Gestion du clic sur "View Work"
  function setupViewWorkButton() {
    const viewWorkButton = document.querySelector('.project-button');
    if (!viewWorkButton) return;
    
    viewWorkButton.addEventListener('click', () => {
      // Masquer la carte
      const projectCardContainer = document.querySelector('.project-card-container');
      if (!projectCardContainer) return;
      
      if (typeof gsap !== 'undefined') {
        gsap.to(projectCardContainer, {
          opacity: 0,
          scale: 0.9,
          duration: 0.5,
          ease: 'power3.out',
          onComplete: () => {
            projectCardContainer.style.display = 'none';
            showProjectSlider();
          }
        });
      } else {
        projectCardContainer.style.display = 'none';
        showProjectSlider();
      }
    });
  }
  
  // Affichage du slider et initialisation de Swiper
  function showProjectSlider() {
    const projectSlider = document.querySelector('.projet-walkthrough');
    if (!projectSlider) return;
    
    // Afficher le slider
    projectSlider.classList.add('visible');
    
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(projectSlider, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7, 
          ease: 'power3.out',
          onComplete: () => {
            // Appliquer un délai pour s'assurer que DOM est prêt
            setTimeout(initializeSwiper, 300);
          }
        }
      );
    } else {
      projectSlider.style.opacity = '1';
      projectSlider.style.transform = 'translateY(0)';
      // Appliquer un délai
      setTimeout(initializeSwiper, 300);
    }
  }
  
  // Initialisation du Swiper avec une configuration ultra-simplifiée
  function initializeSwiper() {
    // Détruire l'instance Swiper précédente si elle existe
    if (window.mySwiper) {
      window.mySwiper.destroy(true, true);
      window.mySwiper = null;
    }
    
    if (!window.Swiper) {
      console.error("Swiper n'est pas disponible");
      return;
    }
    
    console.log("Initializing Swiper with simplified config");
    
    // Configuration ultra-simplifiée de Swiper
    window.mySwiper = new Swiper(".swiper-container", {
      slidesPerView: 1,
      spaceBetween: 30,
      centeredSlides: true,
      initialSlide: 0,
      simulateTouch: true,
      loop: true,
      speed: 500,
      
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    });
    
    // Corriger la visibilité des slides
    document.querySelectorAll('.swiper-slide').forEach(slide => {
      if (slide.classList.contains('swiper-slide-active')) {
        slide.style.opacity = '1';
        slide.style.visibility = 'visible';
      } else {
        slide.style.opacity = '0';
        slide.style.visibility = 'hidden';
      }
    });
    
    // Ajouter des écouteurs pour gérer la visibilité lors des transitions
    window.mySwiper.on('slideChangeTransitionStart', function() {
      document.querySelectorAll('.swiper-slide').forEach(slide => {
        slide.style.opacity = '0';
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
  }
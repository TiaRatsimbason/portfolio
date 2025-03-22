document.addEventListener('DOMContentLoaded', () => {
    // S'assurer que GSAP est disponible
    if (typeof gsap === 'undefined') {
      // Charger GSAP si non disponible
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
      script.onload = function() {
        initProjectCard();
      };
      document.head.appendChild(script);
    } else {
      initProjectCard();
    }
  });
  
  function initProjectCard() {
    setupThumbPanning();
    setupButtonMovement();
    setupViewWorkButton();
  }
  
  function setupThumbPanning() {
    const thumbs = document.querySelectorAll('.thumb');
    thumbs.forEach((thumb) => {
      const image = thumb.querySelector('.thumb-img');
      thumb.addEventListener('mousemove', (e) => {
        const rect = thumb.getBoundingClientRect();
        const xPercent = (e.clientX - rect.left) / rect.width * 100 - 50;
        const yPercent = (e.clientY - rect.top) / rect.height * 100 - 50;
        const xMove = xPercent * 0.05; 
        const yMove = yPercent * 0.05;
        gsap.to(image, { duration: 0.25, x: `${-xMove}%`, y: `${-yMove}%`, ease: 'power3.out' });
      });
      thumb.addEventListener('mouseleave', () => {
        gsap.to(image, { duration: 0.25, x: '0%', y: '0%', ease: 'power3.out' });
      });
    });
  }
  
  function setupButtonMovement() {
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
  
  function setupViewWorkButton() {
    const viewWorkButton = document.querySelector('.project-button');
    if (!viewWorkButton) return;
    
    viewWorkButton.addEventListener('click', () => {
      // Masquer la carte
      const projectCardContainer = document.querySelector('.project-card-container');
      if (projectCardContainer) {
        gsap.to(projectCardContainer, {
          opacity: 0,
          scale: 0.9,
          duration: 0.5,
          ease: 'power3.out',
          onComplete: () => {
            projectCardContainer.style.display = 'none';
            
            // Afficher le slider de projets
            const projectSlider = document.querySelector('.projet-walkthrough');
            if (projectSlider) {
              projectSlider.classList.add('visible');
              gsap.fromTo(projectSlider, 
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
              );
            }
          }
        });
      }
    });
  }
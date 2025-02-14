document.addEventListener('DOMContentLoaded', () => {
    // Attendons que tout le contenu soit chargé
    const initSwiper = () => {
        // Vérifions d'abord si les slides existent
        const slides = document.querySelectorAll('.swiper-slide');
        console.log('Nombre de slides trouvés:', slides.length);

        if (slides.length === 0) {
            console.warn('Aucun slide trouvé, nouvelle tentative dans 100ms');
            setTimeout(initSwiper, 100);
            return;
        }

        try {
            const swiper = new Swiper('.projet-walkthrough.swiper', {
                // Configuration de base
                init: false, // Désactivons l'initialisation automatique
                slidesPerView: 1,
                centeredSlides: true,
                spaceBetween: 30,
                grabCursor: true,
                
                // Configuration du loop
                loop: true,
                loopedSlides: slides.length,
                
                // Effet de transition
                effect: 'coverflow',
                coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false,
                },
                
                // Navigation
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                
                // Pagination
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },

                // Événements
                on: {
                    beforeInit() {
                        console.log('Avant initialisation Swiper');
                    },
                    init() {
                        console.log('Swiper initialisé avec succès');
                        // Forçons une mise à jour après l'initialisation
                        this.update();
                    },
                    slideChange() {
                        console.log('Changement de slide');
                    }
                }
            });

            // Initialisons manuellement après la configuration
            swiper.init();
            
        } catch (error) {
            console.error('Erreur lors de l\'initialisation du slider :', error);
        }
    };

    // Lançons l'initialisation
    initSwiper();
});
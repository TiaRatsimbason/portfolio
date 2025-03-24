/**
 * responsive.js - Script pour améliorer la responsivité du portfolio
 * 
 * Ce script ajoute une gestion dynamique des éléments pour différentes tailles d'écran
 * et assure la compatibilité avec tous les composants existants.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour gérer le redimensionnement
    function handleResize() {
        const windowWidth = window.innerWidth;
        
        // Ajuster la position du profil pour les écrans mobiles
        const profileElement = document.querySelector('.profile-special');
        if (profileElement) {
            if (windowWidth <= 768) {
                // Sur mobile, centrer le profil
                profileElement.style.position = 'relative';
                profileElement.style.left = '0';
                profileElement.style.margin = '0 auto 40px auto';
            } else if (windowWidth <= 1200) {
                // Sur tablette
                profileElement.style.position = 'relative';
                profileElement.style.left = '0';
                profileElement.style.margin = '0 auto 30px auto';
            } else {
                // Sur desktop, revenir à la position d'origine
                profileElement.style.position = 'absolute';
                profileElement.style.left = '30px';
                profileElement.style.margin = '0';
            }
        }
        
        // Ajuster les dimensions de la grille de compétences
        const skillsGrid = document.querySelector('.skills-grid');
        if (skillsGrid) {
            if (windowWidth <= 480) {
                // Mobile
                skillsGrid.style.setProperty('--cell-size', '60px');
                skillsGrid.style.gap = '0.5rem';
            } else if (windowWidth <= 768) {
                // Tablette
                skillsGrid.style.setProperty('--cell-size', '70px');
                skillsGrid.style.gap = '0.7rem';
            } else if (windowWidth <= 990) {
                // Petit desktop
                skillsGrid.style.setProperty('--cell-size', '80px');
                skillsGrid.style.gap = '0.8rem';
            } else {
                // Grand desktop
                skillsGrid.style.setProperty('--cell-size', '90px');
                skillsGrid.style.gap = '1rem';
            }
        }
        
        // S'assurer que les tooltips restent visibles sur petit écran
        const tooltips = document.querySelectorAll('.tooltip');
        if (tooltips.length > 0) {
            tooltips.forEach(tooltip => {
                if (windowWidth <= 480) {
                    tooltip.style.minWidth = '200px';
                    tooltip.style.maxWidth = '90vw';
                } else if (windowWidth <= 768) {
                    tooltip.style.minWidth = '250px';
                } else {
                    tooltip.style.minWidth = '600px';
                }
            });
        }
        
        // Ajuster la taille des cards projet
        const projectCards = document.querySelectorAll('.card-item');
        if (projectCards.length > 0) {
            projectCards.forEach(card => {
                if (windowWidth <= 480) {
                    card.style.width = '95%';
                    card.style.padding = '20px';
                } else if (windowWidth <= 768) {
                    card.style.width = '90%';
                    card.style.padding = '25px';
                } else {
                    card.style.width = '85%';
                    card.style.padding = '35px';
                }
            });
        }
        
        // Assurer la visibilité des boutons swiper sur mobile
        const swiperButtons = document.querySelectorAll('.swiper-button-prev, .swiper-button-next');
        if (swiperButtons.length > 0) {
            swiperButtons.forEach(button => {
                if (windowWidth <= 480) {
                    button.style.width = '30px';
                    button.style.height = '30px';
                } else if (windowWidth <= 768) {
                    button.style.width = '35px';
                    button.style.height = '35px';
                } else {
                    button.style.width = '40px';
                    button.style.height = '40px';
                }
            });
        }
    }
    
    // Exécuter une fois au chargement
    handleResize();
    
    // Ajouter un écouteur d'événement pour le redimensionnement
    window.addEventListener('resize', handleResize);
    
    // Fonction pour corriger les problèmes d'affichage des slides Swiper
    function fixSwiperSlides() {
        // Vérifier si Swiper est initialisé
        if (window.mySwiper) {
            const activeSlide = document.querySelector('.swiper-slide-active');
            if (activeSlide) {
                // Forcer la visibilité du slide actif
                activeSlide.style.opacity = '1';
                activeSlide.style.visibility = 'visible';
            }
            
            // S'assurer que les slides inactifs sont bien masqués
            const inactiveSlides = document.querySelectorAll('.swiper-slide:not(.swiper-slide-active)');
            inactiveSlides.forEach(slide => {
                slide.style.opacity = '0';
                slide.style.visibility = 'hidden';
            });
        }
    }
    
    // Observer les changements de DOM pour les slides Swiper
    // Cela aidera à corriger les slides lorsqu'ils changent
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class' && 
                (mutation.target.classList.contains('swiper-slide-active') || 
                 mutation.target.classList.contains('swiper-slide'))) {
                fixSwiperSlides();
            }
        });
    });
    
    // Démarrer l'observation après un léger délai
    setTimeout(() => {
        const slides = document.querySelectorAll('.swiper-slide');
        if (slides.length > 0) {
            slides.forEach(slide => {
                observer.observe(slide, { attributes: true });
            });
            fixSwiperSlides();
        }
    }, 1000);
    
    // Assurer la compatibilité des composants neuro et contact
    function ensureContactCompatibility() {
        const contactArea = document.querySelector('.contact-area');
        if (contactArea) {
            // S'assurer que la section contact a une hauteur fixe selon la taille d'écran
            if (window.innerWidth <= 480) {
                contactArea.style.height = '80px';
            } else if (window.innerWidth <= 768) {
                contactArea.style.height = '100px';
            } else {
                contactArea.style.height = '120px';
            }
        }
    }
    
    // Exécuter la fonction pour le contact
    ensureContactCompatibility();
    window.addEventListener('resize', ensureContactCompatibility);
});

document.addEventListener('DOMContentLoaded', function() {
    // Configuration du comportement tactile pour les tooltips sur mobile
    function setupMobileTooltips() {
        // Ne s'applique que sur les appareils tactiles
        if (!('ontouchstart' in window)) return;
        
        const tooltipContainers = document.querySelectorAll('.tooltip-container');
        if (tooltipContainers.length === 0) return;
        
        // Gestion des événements tactiles pour les tooltips
        tooltipContainers.forEach(container => {
            container.addEventListener('touchstart', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    
                    // Fermer tous les autres tooltips
                    tooltipContainers.forEach(otherContainer => {
                        if (otherContainer !== container) {
                            otherContainer.classList.remove('touch-active');
                        }
                    });
                    
                    // Basculer l'état actif
                    container.classList.toggle('touch-active');
                }
            });
        });
        
        // Fermer les tooltips en touchant ailleurs sur l'écran
        document.addEventListener('touchstart', function(e) {
            if (!e.target.closest('.tooltip-container')) {
                tooltipContainers.forEach(container => {
                    container.classList.remove('touch-active');
                });
            }
        });
    }
    
    // Calculer la hauteur minimale nécessaire pour la section en fonction du scale
    function adjustSkillsContainerHeight() {
        const skillsContainer = document.querySelector('.skills-container');
        const skillsGrid = document.querySelector('.skills-grid');
        
        if (!skillsContainer || !skillsGrid) return;
        
        // Obtenir le facteur d'échelle actuel à partir du style transform
        const transformStyle = window.getComputedStyle(skillsGrid).transform;
        let scale = 1;
        
        if (transformStyle && transformStyle !== 'none') {
            const matrix = transformStyle.match(/matrix\(([^)]+)\)/);
            if (matrix) {
                const values = matrix[1].split(',');
                scale = parseFloat(values[0]);
            }
        }
        
        // Calculer la hauteur naturelle de la grille
        const gridHeight = skillsGrid.scrollHeight;
        
        // Appliquer une hauteur minimale au conteneur en fonction de l'échelle
        // Plus le scale est petit, moins la hauteur nécessaire est grande
        skillsContainer.style.minHeight = `${gridHeight * scale * 1.1}px`;
    }
    
    // Observer les changements de dimensions pour ajuster la hauteur
    function observeResizing() {
        // Appliquer une fois immédiatement
        adjustSkillsContainerHeight();
        
        // Puis observer les changements
        const resizeObserver = new ResizeObserver(() => {
            adjustSkillsContainerHeight();
        });
        
        const skillsGrid = document.querySelector('.skills-grid');
        if (skillsGrid) {
            resizeObserver.observe(skillsGrid);
        }
        
        // S'assurer que ça s'ajuste également lors du redimensionnement de la fenêtre
        window.addEventListener('resize', adjustSkillsContainerHeight);
    }
    
    // Initialiser
    setupMobileTooltips();
    
    // Utiliser un délai pour s'assurer que tous les éléments sont bien chargés
    setTimeout(observeResizing, 300);
});
/**
 * responsive.js - Script pour améliorer la responsivité du portfolio
 * 
 * Ce script ajoute une gestion dynamique des éléments pour différentes tailles d'écran
 * et assure la compatibilité avec tous les composants existants.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Détection de l'appareil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
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
                // Résoudre le chevauchement avec le titre
                profileElement.style.transform = windowWidth <= 480 ? 'scale(0.7)' : 'scale(0.8)';
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
                profileElement.style.transform = 'scale(1.2)';
            }
        }
        
        // Ajuster le titre pour éviter le chevauchement
        const titleContainer = document.querySelector('.first-container.share h1');
        if (titleContainer && windowWidth <= 768) {
            titleContainer.style.marginTop = '30px';
            titleContainer.style.fontSize = windowWidth <= 480 ? 'clamp(1.1rem, 7vw, 1.8rem)' : 'clamp(1.2rem, 8vw, 2rem)';
            titleContainer.style.width = '100%';
            titleContainer.style.padding = '0 10px';
            titleContainer.style.lineHeight = '1.3';
        } else if (titleContainer) {
            titleContainer.style.marginTop = '';
            titleContainer.style.fontSize = '';
            titleContainer.style.width = '';
            titleContainer.style.padding = '';
        }
        
        // Ajuster les dimensions de la grille de compétences
        const skillsGrid = document.querySelector('.skills-grid');
        if (skillsGrid) {
            if (windowWidth <= 768) {
                // Sur mobile, passer en mode défilement horizontal
                skillsGrid.style.transform = 'scale(1)';
                skillsGrid.style.gridTemplateColumns = windowWidth <= 480 ? 
                    'repeat(9, 60px)' : 'repeat(9, 70px)';
                skillsGrid.style.gap = windowWidth <= 480 ? '6px' : '8px';
                skillsGrid.style.overflowX = 'auto';
                skillsGrid.style.justifyContent = 'flex-start';
                skillsGrid.style.width = 'auto';
                skillsGrid.style.maxWidth = '100%';
                skillsGrid.style.margin = '0';
                skillsGrid.style.padding = '10px';
            } else if (windowWidth <= 480) {
                // Configuration originale pour petits écrans
                skillsGrid.style.transform = 'scale(0.35)';
                skillsGrid.style.margin = '-110px auto';
            } else if (windowWidth <= 650) {
                skillsGrid.style.transform = 'scale(0.45)';
                skillsGrid.style.margin = '-90px auto';
            } else if (windowWidth <= 768) {
                skillsGrid.style.transform = 'scale(0.5)';
                skillsGrid.style.margin = '-80px auto';
            } else if (windowWidth <= 880) {
                skillsGrid.style.transform = 'scale(0.6)';
                skillsGrid.style.margin = '-60px auto';
            } else if (windowWidth <= 970) {
                skillsGrid.style.transform = 'scale(0.7)';
                skillsGrid.style.margin = '-40px auto';
            } else if (windowWidth <= 1080) {
                skillsGrid.style.transform = 'scale(0.8)';
                skillsGrid.style.margin = '-20px auto';
            } else if (windowWidth <= 1200) {
                skillsGrid.style.transform = 'scale(0.9)';
                skillsGrid.style.margin = '0 auto';
            } else {
                skillsGrid.style.transform = 'scale(1)';
                skillsGrid.style.margin = '2rem auto';
            }
        }
        
        // Ajuster le conteneur de compétences
        const skillsContainer = document.querySelector('.skills-container');
        if (skillsContainer && windowWidth <= 768) {
            skillsContainer.style.overflowX = 'auto';
            skillsContainer.style.padding = windowWidth <= 480 ? '5px' : '10px 5px';
            skillsContainer.style.minHeight = windowWidth <= 480 ? '320px' : '350px';
        } else if (skillsContainer) {
            skillsContainer.style.overflowX = '';
            skillsContainer.style.padding = '';
        }
        
        // S'assurer que les tooltips restent visibles sur petit écran
        const tooltips = document.querySelectorAll('.tooltip');
        if (tooltips.length > 0) {
            tooltips.forEach(tooltip => {
                if (windowWidth <= 480) {
                    tooltip.style.width = '250px';
                    tooltip.style.maxWidth = '80vw';
                    tooltip.style.left = '50%';
                    tooltip.style.transform = 'translateX(-50%)';
                } else if (windowWidth <= 768) {
                    tooltip.style.width = '300px';
                    tooltip.style.maxWidth = '80vw';
                    tooltip.style.left = '50%';
                    tooltip.style.transform = 'translateX(-50%)';
                } else {
                    tooltip.style.width = '';
                    tooltip.style.maxWidth = '';
                    tooltip.style.left = '';
                    tooltip.style.transform = '';
                }
            });
        }
        
        // Ajuster la taille des cartes projet
        const projectCards = document.querySelectorAll('.card-item');
        if (projectCards.length > 0) {
            projectCards.forEach(card => {
                if (windowWidth <= 480) {
                    card.style.width = '95%';
                    card.style.padding = '15px';
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
    window.addEventListener('resize', throttle(handleResize, 100));
    
    // Fonction pour permettre le défilement horizontal du tableau périodique
    function enableHorizontalScroll() {
        const skillsContainer = document.querySelector('.skills-container');
        if (!skillsContainer) return;
        
        // Ajouter un indicateur de défilement
        if (window.innerWidth <= 768 && !document.querySelector('.scroll-indicator')) {
            const scrollIndicator = document.createElement('div');
            scrollIndicator.className = 'scroll-indicator';
            scrollIndicator.innerHTML = '<span>←</span> <span>→</span>';
            skillsContainer.appendChild(scrollIndicator);
            
            // Faire disparaître l'indicateur après 3 secondes
            setTimeout(() => {
                scrollIndicator.style.opacity = '0';
            }, 3000);
        }
        
        // Activer le défilement horizontal par toucher/souris
        if (window.innerWidth <= 768) {
            let isDown = false;
            let startX;
            let scrollLeft;
            
            skillsContainer.addEventListener('mousedown', (e) => {
                isDown = true;
                skillsContainer.style.cursor = 'grabbing';
                startX = e.pageX - skillsContainer.offsetLeft;
                scrollLeft = skillsContainer.scrollLeft;
            });
            
            skillsContainer.addEventListener('mouseleave', () => {
                isDown = false;
                skillsContainer.style.cursor = 'grab';
            });
            
            skillsContainer.addEventListener('mouseup', () => {
                isDown = false;
                skillsContainer.style.cursor = 'grab';
            });
            
            skillsContainer.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - skillsContainer.offsetLeft;
                const walk = (x - startX) * 2; // Vitesse de défilement
                skillsContainer.scrollLeft = scrollLeft - walk;
            });
        }
    }
    
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
    window.addEventListener('resize', throttle(ensureContactCompatibility, 100));
    
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
        
        // Sur mobile, utiliser une hauteur fixe
        if (window.innerWidth <= 768) {
            skillsContainer.style.minHeight = window.innerWidth <= 480 ? '320px' : '350px';
            return;
        }
        
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
    
    // Fonction utilitaire pour limiter les appels fréquents
    function throttle(func, delay) {
        let lastCall = 0;
        return function(...args) {
            const now = new Date().getTime();
            if (now - lastCall < delay) {
                return;
            }
            lastCall = now;
            return func(...args);
        };
    }
    
    // Initialiser toutes les fonctionnalités responsive
    setupMobileTooltips();
    enableHorizontalScroll();
    
    // Utiliser un délai pour s'assurer que tous les éléments sont bien chargés
    setTimeout(() => {
        adjustSkillsContainerHeight();
        handleResize(); // Réappliquer une fois de plus
    }, 300);
});
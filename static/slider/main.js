// Fonction globale pour ouvrir l'image en plein écran
function openFullscreen(buttonElement) {
    const card = buttonElement.closest('.item');
    const backgroundStyle = card.getAttribute('style');
    const imageUrlMatch = backgroundStyle.match(/url\(['"]?(.*?)['"]?\)/);
    const imageUrl = imageUrlMatch ? imageUrlMatch[1] : '';
    
    const title = card.querySelector('.name').textContent;
    const description = card.querySelector('.description').textContent;
    
    // Récupérer les éléments du modal
    const modal = document.getElementById('fullscreenModal');
    const fullscreenImage = document.getElementById('fullscreenImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    // Définir le contenu du modal
    fullscreenImage.src = imageUrl;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    
    // Afficher le modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    console.log('Modal opened with image:', imageUrl);
}

document.addEventListener('DOMContentLoaded', function() {
    // Sélecteurs pour la navigation du slider
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');
    
    // Sélecteurs pour le modal
    const modal = document.getElementById('fullscreenModal');
    const fullscreenImage = document.getElementById('fullscreenImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const closeModal = document.querySelector('.close-modal');
    
    // Navigation du slider
    next.addEventListener('click', function() {
        let items = document.querySelectorAll('.item');
        document.querySelector('.slide').appendChild(items[0]);
    });
    
    prev.addEventListener('click', function() {
        let items = document.querySelectorAll('.item');
        document.querySelector('.slide').prepend(items[items.length - 1]);
    });
    
    // Ajout de la navigation au clavier
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            next.click();
        } else if (e.key === 'ArrowLeft') {
            prev.click();
        }
    });
    
    // Gestion du modal plein écran
    function setupFullscreenButtons() {
        console.log('Setting up fullscreen buttons');
        const seeMoreButtons = document.querySelectorAll('.content button');
        
        seeMoreButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Button clicked');
                
                // Trouver l'élément parent (la carte)
                const card = this.closest('.item');
                
                // Obtenir l'URL de l'image (depuis le style background)
                const backgroundStyle = card.getAttribute('style');
                const imageUrlMatch = backgroundStyle.match(/url\(['"]?(.*?)['"]?\)/);
                const imageUrl = imageUrlMatch ? imageUrlMatch[1] : '';
                
                console.log('Image URL:', imageUrl);
                
                // Obtenir le titre et la description
                const title = card.querySelector('.name').textContent;
                const description = card.querySelector('.description').textContent;
                
                // Ouvrir le modal
                openModal(imageUrl, title, description);
            });
        });
    }
    
    // Fonction pour ouvrir le modal
    function openModal(imageUrl, title, description) {
        console.log('Opening modal with:', imageUrl);
        fullscreenImage.src = imageUrl;
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Empêche le défilement
    }
    
    // Gestionnaires pour fermer le modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Navigation tactile pour mobile (conservée pour la fonctionnalité mais pas l'apparence)
    let touchStartX = 0;
    let touchEndX = 0;
    
    const slider = document.querySelector('.container');
    
    slider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    slider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe gauche
            next.click();
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe droite
            prev.click();
        }
    }
    
    // Initialiser les boutons après un court délai pour s'assurer que le DOM est prêt
    setTimeout(setupFullscreenButtons, 500);
    
    // Réinitialiser les boutons lorsque les cartes changent
    next.addEventListener('click', function() {
        setTimeout(setupFullscreenButtons, 100);
    });
    
    prev.addEventListener('click', function() {
        setTimeout(setupFullscreenButtons, 100);
    });
});

// Fonction pour détecter si l'appareil est mobile - désactivée pour ne pas appliquer les optimisations mobiles
function isMobileDevice() {
    // Toujours retourner false pour garder l'apparence PC
    return false;
}

// Ajoutez ce code à la fin de votre fichier main.js

// Forcer le mode paysage sur les appareils mobiles
window.addEventListener('load', function() {
    // Détection des appareils mobiles
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Vérifier et inciter à l'orientation paysage
        checkOrientation();
        
        // Écouter les changements d'orientation
        window.addEventListener('orientationchange', checkOrientation);
        window.addEventListener('resize', checkOrientation);
    }
    
    function checkOrientation() {
        // Si orientation portrait sur mobile
        if (window.innerWidth < window.innerHeight) {
            console.log("Orientation portrait détectée, encourager le mode paysage");
            // Le message est affiché via CSS, pas besoin d'ajouter du code ici
            
            // Certains navigateurs mobiles supportent cette API (attention, expérimental)
            try {
                if (screen.orientation && screen.orientation.lock) {
                    screen.orientation.lock('landscape').catch(function(error) {
                        console.log("Impossible de verrouiller l'orientation: ", error);
                    });
                }
            } catch (e) {
                console.log("API d'orientation non supportée");
            }
        }
    }
    
    // Ajuster le zoom pour que tout soit visible
    document.documentElement.style.zoom = "98%";
});

// Ajoutez ce code à la fin de votre fichier main.js

// Optimiser l'affichage sur mobile en mode paysage
window.addEventListener('load', function() {
    // Détection des appareils mobiles
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Optimiser le dimensionnement
        optimizeLandscapeView();
        
        // Réoptimiser lors des redimensionnements
        window.addEventListener('orientationchange', optimizeLandscapeView);
        window.addEventListener('resize', optimizeLandscapeView);
    }
    
    function optimizeLandscapeView() {
        // Obtenir les dimensions réelles du viewport
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Calculer le ratio pour s'assurer que tout rentre parfaitement
        const container = document.querySelector('.container');
        if (container) {
            // Ajuster la taille du conteneur en fonction de la hauteur disponible
            if (viewportWidth < 901) {
                // Pour les mobiles, s'assurer que tout s'affiche correctement
                const containerHeight = Math.min(viewportHeight * 0.85, 500);
                container.style.height = containerHeight + 'px';
                
                // Ajuster la taille du conteneur pour éviter les débordements
                const scale = Math.min(1, (viewportHeight - 50) / 600);
                if (scale < 1) {
                    container.style.transform = `scale(${scale})`;
                    container.style.transformOrigin = 'center center';
                } else {
                    container.style.transform = 'none';
                }
                
                // S'assurer que le bouton de retour est toujours visible
                const backButton = document.querySelector('.back-button-container');
                if (backButton) {
                    backButton.style.bottom = '10px';
                }
            } else {
                // Réinitialiser pour les grands écrans
                container.style.transform = '';
                container.style.height = '';
            }
        }
    }
});
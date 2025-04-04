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
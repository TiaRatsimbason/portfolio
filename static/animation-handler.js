// Script pour gérer l'animation accessible depuis la photo de profil
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si l'appareil est mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Sélectionner l'élément de la photo de profil
    const profileImage = document.querySelector('.profile-avatar-img img');
    
    // Si l'élément existe, ajouter l'écouteur d'événement
    if (profileImage) {
        // Ajouter un style de curseur pour indiquer que c'est cliquable
        profileImage.style.cursor = 'pointer';
        
        // Ajouter un effet de survol
        profileImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        profileImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Ajouter l'événement de clic pour ouvrir l'animation
        profileImage.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Créer la modal pour afficher l'animation
            createAnimationModal();
        });
    }
    
    // Créer la modal pour l'animation
    function createAnimationModal() {
        // Créer l'élément de la modal
        const modal = document.createElement('div');
        modal.classList.add('animation-modal');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.5s ease;
        `;
        
        // Créer l'iframe pour l'animation avec optimisation mobile
        const iframe = document.createElement('iframe');
        iframe.src = '/static/animation/index.html';
        iframe.style.cssText = `
            width: 100%;
            height: 100%;
            border: none;
            overflow: hidden;
        `;
        
        // Ajouter un bouton de fermeture explicite
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '×';
        closeButton.style.cssText = `
            position: absolute;
            top: 20px;
            right: 30px;
            background: none;
            border: none;
            color: white;
            font-size: 40px;
            cursor: pointer;
            z-index: 10001;
            padding: 0;
            margin: 0;
            opacity: 0.8;
            transition: all 0.3s ease;
        `;
        
        closeButton.addEventListener('mouseenter', function() {
            this.style.opacity = '1';
            this.style.transform = 'rotate(90deg)';
        });
        
        closeButton.addEventListener('mouseleave', function() {
            this.style.opacity = '0.8';
            this.style.transform = 'rotate(0)';
        });
        
        closeButton.addEventListener('click', closeModal);
        
        // Ajouter l'iframe et le bouton à la modal
        modal.appendChild(iframe);
        modal.appendChild(closeButton);
        
        // Ajouter la modal au body
        document.body.appendChild(modal);
        
        // Afficher la modal avec une animation
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 50);
        
        // Ajouter l'écouteur d'événement pour fermer la modal
        window.addEventListener('message', function(event) {
            if (event.data === 'closeAnimation') {
                closeModal();
            }
        });
        
        // Ajouter un écouteur pour fermer avec Escape
        window.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
        
        // Fonction pour fermer la modal
        function closeModal() {
            modal.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 500);
        }
    }
});
// Script de secours pour les appareils mobiles uniquement
document.addEventListener('DOMContentLoaded', function() {
    // S'exécute avec un délai pour s'assurer que tout est chargé
    setTimeout(function() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            console.log("Appareil mobile détecté - Application des styles spécifiques");
            
            // Sur mobile, nous allons utiliser un bouton alternatif pour éviter les problèmes de positionnement
            const originalButton = document.querySelector('.container .button');
            
            // Créer un nouveau bouton spécifique pour mobile
            const mobileButton = document.createElement('div');
            mobileButton.classList.add('mobile-again-button');
            mobileButton.innerText = "AGAIN";
            mobileButton.style.cssText = `
                position: fixed;
                bottom: 50px;
                right: 20px;
                background-color: rgba(0,0,0,0.7);
                color: #e55643;
                padding: 8px;
                border-radius: 5px;
                font-weight: bold;
                z-index: 1001;
                display: none;
                cursor: pointer;
            `;
            
            // Ajouter le bouton mobile au corps du document
            document.body.appendChild(mobileButton);
            
            // Masquer le bouton original sur mobile
            if (originalButton) {
                originalButton.style.display = 'none';
            }
            
            // Fonction pour montrer le bouton mobile uniquement à l'écran final
            function updateButtonVisibility() {
                const finalImage = document.querySelector('.final-image');
                if (finalImage && !finalImage.classList.contains('hide')) {
                    mobileButton.style.display = 'block';
                } else {
                    mobileButton.style.display = 'none';
                }
            }
            
            // Vérifier la visibilité périodiquement
            setInterval(updateButtonVisibility, 500);
            
            // Gérer le clic sur le bouton mobile
            mobileButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Simuler un clic sur le bouton original
                if (originalButton) {
                    originalButton.click();
                } else {
                    // Fallback si le bouton original n'est pas disponible
                    if (typeof animateText === 'function') {
                        animateText();
                    }
                }
            });
            
            // Détecter les clics sur l'écran pour mettre à jour la visibilité
            document.addEventListener('click', function() {
                setTimeout(updateButtonVisibility, 800);
            });
        }
    }, 1000);
});
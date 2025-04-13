// Script pour assurer la compatibilité mobile
document.addEventListener('DOMContentLoaded', function() {
    // Détection mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Ajouter la classe mobile pour les styles spécifiques
        document.body.classList.add('mobile-device');
        
        // Adapter l'animation aux contraintes mobiles
        const applyMobileFixes = function() {
            // S'assurer que les titres ont la bonne couleur
            const titles = document.querySelectorAll('.title');
            if (titles.length >= 3) {
                titles[0].style.color = '#e55643'; // Let's
                titles[1].style.color = '#2b9f5e'; // work
                titles[2].style.color = '#f1c83c'; // together
            }
            
            // Fonction helper pour forcer l'animation correcte
            window.ensureCorrectAnimation = function() {
                const container = document.querySelector('.container');
                if (container && container.style.display === 'block') {
                    // Recalculer la position de l'animation si nécessaire
                    container.style.transform = 'translate(-50%, -50%)';
                    
                    // Force le redimensionnement du texte
                    const h1 = container.querySelector('h1');
                    if (h1) {
                        h1.style.fontSize = isMobile && window.innerWidth < 480 ? '32px' : '42px';
                    }
                    
                    // S'assurer que le bouton "Again" est correctement positionné sur mobile
                    const button = container.querySelector('.button');
                    if (button && isMobile) {
                        // Repositionner complètement le bouton pour éviter le chevauchement avec l'image
                        button.style.transform = 'rotate(-10deg)';
                        button.style.right = '20px';
                        button.style.left = 'auto';
                        button.style.bottom = '50px';
                        button.style.backgroundColor = 'rgba(0,0,0,0.7)';
                        button.style.padding = '8px 12px';
                        button.style.borderRadius = '5px';
                        button.style.zIndex = '1001';
                        button.style.position = 'fixed';
                        button.style.fontSize = '16px';
                        button.style.width = 'auto';
                        button.style.display = 'inline-block';
                        button.style.visibility = 'hidden'; // Caché par défaut, sera rendu visible uniquement sur l'écran final
                    }
                }
            };
            
            // Vérifier et corriger l'animation périodiquement
            setInterval(window.ensureCorrectAnimation, 1000);
            
            // Faire en sorte que les articles aient la bonne disposition sur mobile
            const articles = document.querySelectorAll('article');
            articles.forEach(article => {
                if (isMobile) {
                    article.style.display = 'flex';
                    article.style.flexDirection = 'column';
                    article.style.textAlign = 'center';
                    
                    // S'assurer que les titres et paragraphes ont la bonne largeur
                    const title = article.querySelector('h2');
                    const paragraph = article.querySelector('p');
                    
                    if (title) {
                        title.style.width = '100%';
                        title.style.marginBottom = '20px';
                    }
                    
                    if (paragraph) {
                        paragraph.style.width = '100%';
                        paragraph.style.textAlign = 'justify';
                    }
                }
            });
        };
        
        // Appliquer les correctifs après un délai pour s'assurer que tout est chargé
        setTimeout(applyMobileFixes, 500);
    }
});
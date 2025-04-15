// Script d'urgence pour garantir la disparition de l'écran de chargement
(function() {
    // Fonction auto-exécutée qui s'exécute immédiatement
    
    // Garantir l'exécution même si le DOMContentLoaded est déjà passé
    function ensureLoaderRemoval() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            // Forcer la suppression directe de l'écran de chargement
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                if (loadingScreen.parentNode) {
                    loadingScreen.parentNode.removeChild(loadingScreen);
                    console.log('Écran de chargement retiré par le mécanisme d\'urgence');
                }
            }, 3000);
        }
    }
    
    // Délai court pour laisser au mécanisme normal la chance de fonctionner
    setTimeout(ensureLoaderRemoval, 3000);
    
    // S'assurer également que la page est visible
    setTimeout(() => {
        document.body.style.visibility = 'visible';
        document.body.style.opacity = '1';
    }, 3500);
    
    // Exécuter la fonction au chargement du DOM si ce n'est pas déjà fait
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ensureLoaderRemoval);
    } else {
        ensureLoaderRemoval();
    }
    
    // Ultime fallback pour garantir l'affichage
    window.addEventListener('load', function() {
        setTimeout(ensureLoaderRemoval, 1000);
    });
})();
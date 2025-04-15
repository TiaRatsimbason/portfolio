// Script simplifié pour l'écran de chargement
document.addEventListener('DOMContentLoaded', function() {
    // Référence à l'écran de chargement
    const loadingScreen = document.getElementById('loading-screen');
    
    // Fonction simple pour masquer l'écran de chargement
    function hideLoadingScreen() {
        // S'assurer que l'écran de chargement existe
        if (loadingScreen) {
            // Ajout de la classe pour la transition en fondu
            loadingScreen.classList.add('hidden');
            
            // Suppression complète après la transition
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }
    
    // Attendre un court délai pour s'assurer que les éléments principaux sont chargés
    // mais sans trop attendre pour éviter un blocage
    setTimeout(hideLoadingScreen, 2000);
    
    // Fallback de sécurité: si après 5 secondes l'écran est toujours visible, le forcer à disparaître
    setTimeout(() => {
        if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
            console.warn("Fallback: Masquage forcé de l'écran de chargement");
            hideLoadingScreen();
        }
    }, 5000);
});
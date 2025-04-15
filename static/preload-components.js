// Fonction pour précharger les composants des pages annexes
function preloadAdditionalComponents() {
    // Mise à jour du statut de chargement (si la fonction existe)
    function updateLoading(message) {
        const progressElement = document.getElementById('loading-progress');
        if (progressElement) {
            progressElement.textContent = message;
        }
    }
    
    // Préchargement de la modale de profil
    function preloadProfileModal() {
        return new Promise(resolve => {
            updateLoading('Chargement du profil...');
            // Simulation d'un clic sur l'avatar pour déclencher le chargement de la modale
            const profileAvatar = document.querySelector('.profile-avatar');
            if (profileAvatar) {
                // On crée un clone invisible pour déclencher le chargement sans montrer la modale
                const clonedAvatar = profileAvatar.cloneNode(true);
                clonedAvatar.style.position = 'absolute';
                clonedAvatar.style.opacity = '0';
                clonedAvatar.style.pointerEvents = 'none';
                
                document.body.appendChild(clonedAvatar);
                
                // Simulation d'un clic
                const event = new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                
                // On attend un peu pour que le gestionnaire d'événements soit bien attaché
                setTimeout(() => {
                    clonedAvatar.dispatchEvent(event);
                    
                    // On attend que la modale soit créée dans le DOM
                    const checkModalCreated = setInterval(() => {
                        const modal = document.querySelector('.profile-modal');
                        if (modal) {
                            // On s'assure que la modale reste cachée
                            modal.style.opacity = '0';
                            modal.style.pointerEvents = 'none';
                            modal.style.display = 'none';
                            
                            // On nettoie notre clone
                            document.body.removeChild(clonedAvatar);
                            clearInterval(checkModalCreated);
                            resolve();
                        }
                    }, 100);
                    
                    // Timeout de sécurité
                    setTimeout(() => {
                        clearInterval(checkModalCreated);
                        if (clonedAvatar.parentNode) {
                            document.body.removeChild(clonedAvatar);
                        }
                        resolve();
                    }, 3000);
                }, 500);
            } else {
                resolve();
            }
        });
    }
    
    // Préchargement des composants du projet MLOPS
    function preloadMlopsServices() {
        return new Promise(resolve => {
            updateLoading('Chargement des services MLOPS...');
            // On cherche le bouton "Voir les services dans l'application" du projet MLOPS
            const mlopsButtons = Array.from(document.querySelectorAll('.project-button')).filter(
                btn => btn.textContent.includes('services') || btn.textContent.includes('application')
            );
            
            if (mlopsButtons.length > 0) {
                // On clone le bouton pour déclencher le chargement sans montrer la page
                const clonedButton = mlopsButtons[0].cloneNode(true);
                clonedButton.style.position = 'absolute';
                clonedButton.style.opacity = '0';
                clonedButton.style.pointerEvents = 'none';
                
                document.body.appendChild(clonedButton);
                
                // Simulation d'un clic
                const event = new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                
                setTimeout(() => {
                    clonedButton.dispatchEvent(event);
                    
                    // On attend que les composants du service soient chargés
                    const checkServicesLoaded = setInterval(() => {
                        const servicesContainer = document.querySelector('.swiper-container');
                        if (servicesContainer) {
                            // On s'assure que le conteneur reste caché
                            servicesContainer.style.opacity = '0';
                            servicesContainer.style.display = 'none';
                            
                            // On nettoie notre clone
                            document.body.removeChild(clonedButton);
                            clearInterval(checkServicesLoaded);
                            resolve();
                        }
                    }, 100);
                    
                    // Timeout de sécurité
                    setTimeout(() => {
                        clearInterval(checkServicesLoaded);
                        if (clonedButton.parentNode) {
                            document.body.removeChild(clonedButton);
                        }
                        resolve();
                    }, 3000);
                }, 800);
            } else {
                resolve();
            }
        });
    }
    
    // Séquence de chargement des composants
    async function sequentialLoad() {
        try {
            // D'abord précharger la modale de profil
            await preloadProfileModal();
            
            // Ensuite précharger les services MLOPS
            await preloadMlopsServices();
            
            // Finalisation
            updateLoading('Composants annexes chargés', 100);
            return true;
        } catch (error) {
            console.error('Erreur lors du préchargement séquentiel:', error);
            return false;
        }
    }
    
    // On retourne une promesse qui se résout lorsque tout est chargé
    return sequentialLoad();
}

// Export pour utilisation dans loading-screen.js
window.preloadAdditionalComponents = preloadAdditionalComponents;
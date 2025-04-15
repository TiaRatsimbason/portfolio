document.addEventListener('DOMContentLoaded', function() {
    // Référence à l'écran de chargement
    const loadingScreen = document.getElementById('loading-screen');
    
    // Liste des ressources à précharger
    const resourcesToPreload = [
        // Images principales
        '/static/images/photo.png',
        '/static/images/photo_sans_contour.png',
        '/static/images/click_me.png',
        
        // Images de projet
        '/static/images/projects/mlops_bg.png',
        
        // Logos technologies
        '/static/images/prometheus.png',
        '/static/images/FastAPI.png',
        '/static/images/mlflow.png',
        '/static/images/Docker.png',
        '/static/images/grafana.png',
        '/static/images/airflow.png',
        '/static/images/Mongodb.png',
        
        // Vidéos
        '/static/videos/background.mp4',
        '/static/videos/modale.mp4',
        '/static/videos/video.mp4',
        
        // Scripts importants
        '/static/improved-shader.js',
        '/static/skills/index.js',
        '/static/projet/index.js',
        '/static/contact/index.js',
        '/static/animation-handler.js',
        '/static/preload-components.js'
    ];
    
    // Fonction pour précharger une image
    function preloadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(url);
            img.onerror = () => {
                console.warn(`Échec de chargement pour: ${url}`);
                resolve(url); // On résout quand même pour ne pas bloquer
            };
            img.src = url;
        });
    }
    
    // Fonction pour précharger une vidéo
    function preloadVideo(url) {
        return new Promise((resolve, reject) => {
            const video = document.createElement('video');
            video.preload = 'auto';
            
            video.onloadeddata = () => resolve(url);
            video.onerror = () => {
                console.warn(`Échec de chargement pour: ${url}`);
                resolve(url); // On résout quand même pour ne pas bloquer
            };
            
            video.src = url;
        });
    }
    
    // Fonction pour précharger un script
    function preloadScript(url) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            
            script.onload = () => resolve(url);
            script.onerror = () => {
                console.warn(`Échec de chargement pour: ${url}`);
                resolve(url); // On résout quand même pour ne pas bloquer
            };
            
            script.src = url;
            document.head.appendChild(script);
        });
    }
    
    // Fonction principale pour précharger toutes les ressources
    async function preloadResources() {
        const promises = resourcesToPreload.map(url => {
            if (url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.gif')) {
                return preloadImage(url);
            } else if (url.endsWith('.mp4') || url.endsWith('.webm')) {
                return preloadVideo(url);
            } else if (url.endsWith('.js')) {
                return preloadScript(url);
            }
            return Promise.resolve(url);
        });
        
        // On attend que toutes les ressources soient chargées
        await Promise.all(promises);
        
        // On s'assure également que le DOM est complètement chargé
        if (document.readyState !== 'complete') {
            return new Promise(resolve => {
                window.addEventListener('load', resolve);
            });
        }
    }
    
    // Fonction pour précharger les composants dynamiques
    function preloadComponents() {
        return new Promise(resolve => {
            updateProgress('Chargement des composants principaux...');
            
            // Vérifie si les sections principales sont chargées
            function checkComponentsLoaded() {
                const skillsSection = document.querySelector('.skills-grid');
                const projectSection = document.querySelector('.projects-container');
                const contactSection = document.querySelector('.contact-container');
                
                if (skillsSection && projectSection && contactSection) {
                    // Une fois les composants principaux chargés, on charge les composants annexes
                    if (window.preloadAdditionalComponents) {
                        updateProgress('Chargement des composants annexes...');
                        window.preloadAdditionalComponents()
                            .then(() => {
                                console.log('Composants annexes préchargés');
                                updateProgress('Composants annexes préchargés', 100);
                                resolve();
                            })
                            .catch(err => {
                                console.warn('Erreur lors du préchargement des composants annexes:', err);
                                // On continue quand même
                                updateProgress('Finalisation du chargement...', 95);
                                resolve();
                            });
                    } else {
                        resolve();
                    }
                } else {
                    // Si tout n'est pas chargé, on vérifie à nouveau après un court délai
                    setTimeout(checkComponentsLoaded, 100);
                }
            }
            
            // Commence la vérification
            checkComponentsLoaded();
        });
    }
    
    // Fonction pour masquer l'écran de chargement
    function hideLoadingScreen() {
        // Mettre à jour le message final
        updateProgress('Chargement terminé !', 100);
        
        // Petite attente supplémentaire pour s'assurer que tout est rendu
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            
            // On supprime complètement l'écran de chargement après la transition
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500); // Durée de la transition
        }, 800);
    }
    
    // Initialisation
    async function init() {
        try {
            // Démarrage du processus de chargement
            updateProgress('Initialisation...', 0);
            
            // Précharge toutes les ressources
            await preloadResources();
            
            // Attend que les composants dynamiques soient chargés
            updateProgress('Chargement des sections...', 60);
            await preloadComponents();
            
            // Finalisation et optimisation
            updateProgress('Finalisation...', 90);
            
            // Masque l'écran de chargement
            hideLoadingScreen();
        } catch (error) {
            console.error('Erreur pendant le chargement:', error);
            
            // En cas d'erreur, on affiche un message d'erreur avant de masquer l'écran
            updateProgress('Une erreur est survenue pendant le chargement');
            setTimeout(hideLoadingScreen, 3000);
        }
    }
    
    // Démarrer l'initialisation
    init();
    
    // Fallback: si après 5 secondes l'écran est toujours visible, on le masque
    setTimeout(() => {
        if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
            console.warn("Fallback: Masquage forcé de l'écran de chargement après délai");
            updateProgress('Chargement forcé...', 100);
            hideLoadingScreen();
        }
    }, 5000);
});
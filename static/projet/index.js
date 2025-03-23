/**
 * Script principal pour gérer le chargement des ressources de la section projet
 * Ce fichier est simplifié pour éviter les conflits et prioriser le chargement des ressources
 */

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Starting project assets loading...');
    const targetElement = document.getElementById('projet-target');
    if (!targetElement) {
        console.error('Element "projet-target" not found in DOM');
        return;
    }

    try {
        // Charger la feuille de style principale en priorité
        loadStylesheet('/static/projet/projet-clean.css');
        
        // Charger la feuille de style de la carte
        loadStylesheet('/static/projet/project-card.css');
        
        // Si l'élément cible est vide, charger le contenu HTML
        if (targetElement.children.length === 0) {
            const htmlContent = await fetchTemplate('projet.html');
            targetElement.innerHTML = htmlContent || generateFallbackHTML();
        }
        
        // Charger le script GSAP si nécessaire
        if (!window.gsap) {
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js');
        }
        
        // Charger le script Swiper si nécessaire
        if (!window.Swiper) {
            loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');
        }
        
        // Charger le script principal pour les fonctionnalités après un court délai
        setTimeout(() => {
            loadScript('/static/projet/swiper-ultimate.js');
        }, 100);
        
    } catch (error) {
        console.error('Error loading project components:', error);
    }
});

/**
 * Charge une feuille de style si elle n'est pas déjà chargée
 */
function loadStylesheet(url) {
    if (!document.querySelector(`link[href="${url}"]`)) {
        const styleLink = document.createElement('link');
        styleLink.rel = 'stylesheet';
        styleLink.href = url;
        document.head.appendChild(styleLink);
        console.log(`Stylesheet loaded: ${url}`);
    }
}

/**
 * Charge un script si nécessaire
 */
function loadScript(url) {
    if (!document.querySelector(`script[src="${url}"]`)) {
        const script = document.createElement('script');
        script.src = url;
        script.defer = true;
        document.body.appendChild(script);
        console.log(`Script loaded: ${url}`);
    }
}

/**
 * Récupère un template HTML depuis le serveur
 */
async function fetchTemplate(templateName) {
    try {
        const response = await fetch(`/templates/${templateName}`);
        if (response.ok) {
            return await response.text();
        } else {
            console.warn(`Failed to fetch template: ${templateName}`);
            return null;
        }
    } catch (error) {
        console.error(`Error fetching template ${templateName}:`, error);
        return null;
    }
}

/**
 * Génère un HTML minimaliste de repli en cas d'échec
 */
function generateFallbackHTML() {
    return `
    <section id="projet-section">
        <div class="project-card-container">
            <div class="page">
                <div class="thumb">
                    <div class="thumb-wrapper">
                        <img class="thumb-img" src="/static/images/projects/mlops_bg.png" alt="Project Background">
                    </div>
                    <div class="thumb-details">
                        <span>Projets Data Science</span>
                        <span style="opacity: 0.4;">2023-2024</span>
                    </div>
                    <div class="project-button">
                        <span>View Work</span>
                        <div class="refractions"></div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="projet-walkthrough">
            <!-- Contenu minimal pour le slider -->
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <!-- Projets seront ajoutés dynamiquement -->
                </div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
    </section>
    
    <!-- Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="/static/projet/swiper-ultimate.js" defer></script>
    `;
}
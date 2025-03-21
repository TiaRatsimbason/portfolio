document.addEventListener('DOMContentLoaded', async () => {
    const targetElement = document.getElementById('projet-target');
    if (!targetElement) {
        console.error("L'élément cible pour les projets n'a pas été trouvé");
        return;
    }

    try {
        // Charger la feuille de style si elle n'est pas déjà chargée
        if (!document.querySelector('link[href="/static/projet/projet.css"]')) {
            const styleLink = document.createElement('link');
            styleLink.rel = 'stylesheet';
            styleLink.href = '/static/projet/projet.css';
            document.head.appendChild(styleLink);
        }

        // Vérifier si l'élément a déjà un contenu
        if (targetElement.children.length === 0) {
            // Si vide, injecter le contenu HTML
            const projetHTML = `
                <div class="projet-walkthrough swiper">
                    <div class="swiper-wrapper">
                        <!-- Projet 1 - MLOps -->
                        <div class="swiper-slide">
                            <div class="card-item">
                                <div class="card-content">
                                    <h2>MLOps - Pipeline MLOps pour classification multi-modale e-commerce</h2>
                                    <p>Classification automatique de produits e-commerce par traitement multi-modal</p>
                                    <div class="projet-details">
                                        <div class="company">DATASCIENTEST, Paris</div>
                                        <div class="projet-date">06.2024 / 11.2024</div>
                                    </div>
                                    <ul class="projet-tasks">
                                        <li>Modèle Multimodal LSTM (texte) + VGG16 (images) sous TensorFlow à mettre en production</li>
                                        <li>API asynchrone FastAPI + stockage scalable MongoDB/GridFS</li>
                                        <li>Industrialisation: Versioning des modèles (MLflow), CICD (GitHub Actions), monitoring Prometheus/Grafana, conception de DAG pour workflow (Airflow)</li>
                                        <li>DataOps: Ingestion parallélisée (ProcessPoolExecutor) + tests unitaires et intégration avec pytest</li>
                                        <li>Scalabilité: Déploiement conteneurisé (Docker) via Docker Compose, avec une architecture alignée sur les standards cloud-native (Kubernetes-compatible)</li>
                                    </ul>
                                    <div class="tech-stack">Python • TensorFlow • FastAPI • MongoDB • MLflow • Docker • Kubernetes</div>
                                </div>
                            </div>
                        </div>

                        <!-- Projet 2 - DATA PRODUCT MANAGER -->
                        <div class="swiper-slide">
                            <div class="card-item">
                                <div class="card-content">
                                    <h2>DATA PRODUCT MANAGER - Projet d'amélioration d'un service de vélo en libre-service</h2>
                                    <p>Application du machine learning pour optimiser un service de vélos partagés</p>
                                    <div class="projet-details">
                                        <div class="company">DATASCIENTEST, Paris</div>
                                        <div class="projet-date">02.2024 / 05.2024</div>
                                    </div>
                                    <div class="projet-description">
                                        Projet pour optimiser un service de vélos en libre-service : application du design thinking pour développer des solutions d'IA. Implémentation de modèles de maintenance prédictive et d'optimisation des flux inter-stations. Définition et suivi des KPIs via des outils de BI et dataViz avec une approche data-driven pour améliorer la qualité de service.
                                    </div>
                                    <div class="tech-stack">Python • Scikit-learn • PowerBI • Design Thinking</div>
                                </div>
                            </div>
                        </div>

                        <!-- Projet 3 - DATA SCIENTIST -->
                        <div class="swiper-slide">
                            <div class="card-item">
                                <div class="card-content">
                                    <h2>DATA SCIENTIST - Système de traduction pour lunettes connectées</h2>
                                    <p>Développement de modèles NLP pour un dispositif de traduction en temps réel</p>
                                    <div class="projet-details">
                                        <div class="company">DATASCIENTEST, Paris</div>
                                        <div class="projet-date">04.2023 / 02.2024</div>
                                    </div>
                                    <div class="projet-description">
                                        Développement de modèles de traduction automatique (seq-2-seq, Transformer) avec fine-tuning de modèles pré-entraînés. Implémentation d'algorithmes de classification supervisée/non supervisée (K-Means, KNN, Random Forest) et de techniques de tokenization/vectorisation. Création de visualisations de données avec Matplotlib/Seaborn et intégration d'outils de reconnaissance vocale (Whisper).
                                    </div>
                                    <div class="tech-stack">PyTorch • Transformers • Whisper • NLTK</div>
                                    <a href="https://demosthene-or-avr23-cds-translation.hf.space/" target="_blank" class="voir-projet">Voir la démo</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Pagination et boutons de navigation -->
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                    <div class="swiper-pagination"></div>
                </div>
            `;
            
            targetElement.innerHTML = projetHTML;
        }

        // Initialiser Swiper
        const initSwiper = () => {
            if (window.Swiper) {
                new Swiper('.swiper-container', {
                    loop: true,
                    grabCursor: true,
                    effect: 'slide',
                    speed: 800,
                    spaceBetween: 0,
                    slidesPerView: 1,
                    centeredSlides: true,
                    initialSlide: 0,
                    slideToClickedSlide: false,
                    
                    // Pagination
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                        dynamicBullets: true,
                    },
                    
                    // Navigation
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }
                });
                console.log('Swiper initialisé avec succès');
            } else {
                console.error('Swiper n\'est pas disponible. Vérifiez que la bibliothèque est bien chargée.');
            }
        };

        // Vérifier si Swiper est déjà chargé, sinon attendre qu'il le soit
        if (window.Swiper) {
            initSwiper();
        } else {
            // Attendre un peu que Swiper soit chargé
            setTimeout(() => {
                if (window.Swiper) {
                    initSwiper();
                } else {
                    console.error('Swiper n\'a pas été chargé correctement');
                }
            }, 500);
        }
        
    } catch (error) {
        console.error('Erreur lors du chargement des projets:', error);
    }
});
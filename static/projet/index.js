document.addEventListener('DOMContentLoaded', async () => {
    const targetElement = document.getElementById('projet-target');
    if (!targetElement) {
        console.error("L'élément cible pour les projets n'a pas été trouvé");
        return;
    }

    try {
        // Création du contenu HTML pour les projets
        const projetSection = document.createElement('div');
        projetSection.className = 'projet-walkthrough swiper';
        
        projetSection.innerHTML = `
            <div class="swiper-wrapper">
                <!-- Projet 1 - MLOps -->
                <div class="swiper-slide">
                    <div class="card-item">
                        <div class="card-content">
                            <h2>MLOps - Classification multi-modale e-commerce</h2>
                            <p>Pipeline MLOps complète pour la classification automatique de produits</p>
                            <div class="projet-details">
                                <div class="company">DATASCIENTEST, Paris</div>
                                <div class="projet-date">06.2024 / 11.2024</div>
                            </div>
                            <ul class="projet-tasks">
                                <li>Modèle Multimodal LSTM (texte) + ResNet16 (images) sous TensorFlow à mettre en production</li>
                                <li>API asynchrone FastAPI + stockage scalable MongoDB/GridFS</li>
                                <li>Industrialisation: Versioning des modèles (MLflow), CICD (GitHub Actions), monitoring Prometheus/Grafana, conception de DAG pour workflow (Airflow)</li>
                                <li>DataOps: Ingestion parallélisée (ProcessPoolExecutor) + tests unitaires et intégration avec pytest</li>
                                <li>Scalabilité: Déploiement conteneurisé (Docker) via Docker Compose, avec une architecture alignée sur les standards cloud-native (Kubernetes-compatible)</li>
                            </ul>
                            <div class="tech-stack">TensorFlow • FastAPI • MLflow • MongoDB • Docker • Kubernetes • Airflow</div>
                        </div>
                    </div>
                </div>

                <!-- Projet 2 - DATA PRODUCT MANAGER -->
                <div class="swiper-slide">
                    <div class="card-item">
                        <div class="card-content">
                            <h2>DATA PRODUCT MANAGER</h2>
                            <p>Projet d'amélioration d'un service de vélo en libre-service grâce à l'IA</p>
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
                            <h2>DATA SCIENTIST</h2>
                            <p>Système de traduction pour lunettes connectées</p>
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
        `;
        
        // Remplacement de l'élément cible par le contenu généré
        targetElement.innerHTML = '';
        targetElement.appendChild(projetSection);

        // Initialisation du slider Swiper
        const swiper = new Swiper('.projet-walkthrough', {
            loop: true,
            grabCursor: true,
            spaceBetween: 30,
            centeredSlides: true,
            slidesPerView: 'auto',
            
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
            },
            
            // Responsive breakpoints
            breakpoints: {
                0: {
                    slidesPerView: 1, // 1 slide visible sur les petits écrans
                },
                768: {
                    slidesPerView: 1, // 1 slide visible sur les écrans moyens
                },
                1024: {
                    slidesPerView: 1, // 1 slide visible sur les grands écrans
                },
            },
        });
        
    } catch (error) {
        console.error('Erreur lors du chargement des projets:', error);
    }
});
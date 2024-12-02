document.addEventListener('DOMContentLoaded', async () => {
    const targetElement = document.getElementById('projet-target');
    if (!targetElement) return;

    try {
        const styleLink = document.createElement('link');
        styleLink.rel = 'stylesheet';
        styleLink.href = '/static/projet/projet.css';
        document.head.appendChild(styleLink);

        // Création de la section projet à l'intérieur du container existant
        const projetSection = document.createElement('div'); // changé de 'section' à 'div'
        projetSection.className = 'projet-section';
        projetSection.innerHTML = `
            <div class="projet-container">
                <div class="projet">
                    <h2>MLOps - Rakuten Product Classification MLOps Pipeline</h2>
                    <p>
                        Développement d'une pipeline MLOps complète pour la classification automatique de produits e-commerce (27 catégories) utilisant une API RESTful asynchrone avec FastAPI et MongoDB/GridFS. Architecture d'un modèle hybride LSTM/VGG16 pour l'analyse texte-image avec TensorFlow. Mise en place du versioning des modèles (MLflow), de l'ingestion parallélisée des données, du monitoring des performances et des tests automatisés, en suivant les bonnes pratiques DevOps.
                    </p>
                    <div class="projet-date">06.2024 / 11.2024</div>
                </div>
            </div>

            <div class="projet-container">
                <div class="projet">
                    <h2>DATA PRODUCT MANAGER - Service de vélo en libre-service</h2>
                    <p>
                        Projet pour optimiser un service de vélos en libre-service : application du design thinking pour développer des solutions d'IA. Implémentation de modèles de maintenance prédictive et d'optimisation des flux inter-stations. Définition et suivi des KPIs via des outils de BI et dataviz, avec une approche data-driven pour améliorer la qualité de service.
                    </p>
                    <div class="projet-date">02.2024 / 05.2024</div>
                </div>
            </div>

            <div class="projet-container">
                <div class="projet">
                    <h2>DATA SCIENTIST - Système de traduction pour lunettes connectées</h2>
                    <p>
                        Développement de modèles de traduction automatique (seq2-seq, Transformer) avec fine-tuning de modèles pré-entraînés. Implémentation d'algorithmes de classification supervisée/non supervisée (K-Means, KNN, Random Forest) et de techniques de tokenisation/vectorisation. Création de visualisations de données avec Matplotlib/Seaborn et intégration d'outils de reconnaissance vocale (Whisper).
                    </p>
                    <div class="projet-date">04.2023 / 02.2024</div>
                    <div class="projet-link">
                        <a href="https://demosthene-or-avr23-cds-translation.hf.space/" target="_blank">Voir le projet</a>
                    </div>
                </div>
            </div>
        `;

        targetElement.appendChild(projetSection);

    } catch (error) {
        console.error('Erreur lors du chargement des projets:', error);
    }
});
document.addEventListener('DOMContentLoaded', async () => {
    const targetElement = document.getElementById('skills-target');
    if (!targetElement) return;

    const skillsSection = document.createElement('section');
    skillsSection.className = 'skills-container';

    try {
        const styleLink = document.createElement('link');
        styleLink.rel = 'stylesheet';
        styleLink.href = '/static/skills/skills.css';
        document.head.appendChild(styleLink);

        skillsSection.innerHTML = `
            <h1>My Skills Periodic Table</h1>
            <div class="skills-grid">
                <!-- Première ligne - Web et Languages -->
                <div class="tooltip-container web pos-r1-c1">
                    <a class="icon">
                        <div class="layer">
                            <span></span><span></span><span></span><span></span>
                            <span class="fab">Fa</span>
                        </div>
                    </a>
                    <div class="tooltip">
                        <div class="profile">
                            <div class="user">
                                <div class="img">Fa</div>
                                <div class="details">
                                    <div class="name">FastAPI</div>
                                    <div class="username">Web Framework</div>
                                </div>
                            </div>
                            <div class="about">Modern, fast web framework for building APIs with Python</div>
                        </div>
                    </div>
                </div>

                <div class="tooltip-container web pos-r1-c2">
                    <a class="icon">
                        <div class="layer">
                            <span></span><span></span><span></span><span></span>
                            <span class="fab">Fl</span>
                        </div>
                    </a>
                    <div class="tooltip">
                        <div class="profile">
                            <div class="user">
                                <div class="img">Fl</div>
                                <div class="details">
                                    <div class="name">Flask</div>
                                </div>
                            </div>
                            <div class="about">Lightweight WSGI web framework</div>
                        </div>
                    </div>
                </div>

                <!-- Espaces vides dans la première ligne -->
                <div class="empty-cell"></div>
                <div class="empty-cell"></div>
                <div class="empty-cell"></div>

                <div class="tooltip-container lang pos-r1-c8">
                    <a class="icon">
                        <div class="layer">
                            <span></span><span></span><span></span><span></span>
                            <span class="fab">Py</span>
                        </div>
                    </a>
                    <div class="tooltip">
                        <div class="profile">
                            <div class="user">
                                <div class="img">Py</div>
                                <div class="details">
                                    <div class="name">Python</div>
                                </div>
                            </div>
                            <div class="about">Primary programming language for ML/AI</div>
                        </div>
                    </div>
                </div>

                <div class="tooltip-container lang pos-r1-c9">
                    <a class="icon">
                        <div class="layer">
                            <span></span><span></span><span></span><span></span>
                            <span class="fab">Sh</span>
                        </div>
                    </a>
                    <div class="tooltip">
                        <div class="profile">
                            <div class="user">
                                <div class="img">Sh</div>
                                <div class="details">
                                    <div class="name">Bash/Linux</div>
                                </div>
                            </div>
                            <div class="about">Shell scripting and system administration</div>
                        </div>
                    </div>
                </div>

                <div class="tooltip-container lang pos-r1-c7">
                    <a class="icon">
                        <div class="layer">
                            <span></span><span></span><span></span><span></span>
                            <span class="fab">Sq</span>
                        </div>
                    </a>
                    <div class="tooltip">
                        <div class="profile">
                            <div class="user">
                                <div class="img">Sq</div>
                                <div class="details">
                                    <div class="name">SQL</div>
                                    <div class="username">Query Language</div>
                                </div>
                            </div>
                            <div class="about">Database querying and management</div>
                        </div>
                    </div>
                </div>

                <!-- Deuxième ligne - Data Analysis Tools -->
                <div class="tooltip-container data pos-r2-c1">
                    <a class="icon">
                        <div class="layer">
                            <span></span><span></span><span></span><span></span>
                            <span class="fab">Np</span>
                        </div>
                    </a>
                    <div class="tooltip">
                        <div class="profile">
                            <div class="user">
                                <div class="img">Np</div>
                                <div class="details">
                                    <div class="name">NumPy</div>
                                    <div class="username">Numerical Computing</div>
                                </div>
                            </div>
                            <div class="about">Scientific computing and array operations</div>
                        </div>
                    </div>
                </div>

                <div class="tooltip-container data pos-r2-c2">
                    <a class="icon">
                        <div class="layer">
                            <span></span><span></span><span></span><span></span>
                            <span class="fab">Pd</span>
                        </div>
                    </a>
                    <div class="tooltip">
                        <div class="profile">
                            <div class="user">
                                <div class="img">Pd</div>
                                <div class="details">
                                    <div class="name">Pandas</div>
                                    <div class="username">Data Analysis</div>
                                </div>
                            </div>
                            <div class="about">Data manipulation and analysis</div>
                        </div>
                    </div>
                </div>

                <div class="tooltip-container data pos-r2-c3">
                    <a class="icon">
                        <div class="layer">
                            <span></span><span></span><span></span><span></span>
                            <span class="fab">Sm</span>
                        </div>
                    </a>
                    <div class="tooltip">
                        <div class="profile">
                            <div class="user">
                                <div class="img">Sm</div>
                                <div class="details">
                                    <div class="name">Statsmodels</div>
                                    <div class="username">Statistical Models</div>
                                </div>
                            </div>
                            <div class="about">Statistical modeling and econometrics</div>
                        </div>
                    </div>
                </div>

                <!-- Visualization Tools -->
                <div class="tooltip-container viz pos-r2-c4">
                    <a class="icon">
                        <div class="layer">
                            <span></span><span></span><span></span><span></span>
                            <span class="fab">Mp</span>
                        </div>
                    </a>
                    <div class="tooltip">
                        <div class="profile">
                            <div class="user">
                                <div class="img">Mp</div>
                                <div class="details">
                                    <div class="name">Matplotlib</div>
                                    <div class="username">Visualization Library</div>
                                </div>
                            </div>
                            <div class="about">Static, animated, and interactive visualizations</div>
                        </div>
                    </div>
                </div>

                <div class="tooltip-container viz pos-r2-c5">
                    <a class="icon">
                        <div class="layer">
                            <span></span><span></span><span></span><span></span>
                            <span class="fab">Bk</span>
                        </div>
                    </a>
                    <div class="tooltip">
                        <div class="profile">
                            <div class="user">
                                <div class="img">Bk</div>
                                <div class="details">
                                    <div class="name">Bokeh</div>
                                    <div class="username">Interactive Visualization</div>
                                </div>
                            </div>
                            <div class="about">Interactive visualization library for modern web browsers</div>
                        </div>
                    </div>
                </div>

                <div class="tooltip-container viz pos-r4-c7">
                    <a class="icon">
                        <div class="layer">
                            <span></span><span></span><span></span><span></span>
                            <span class="fab">Pb</span>
                        </div>
                    </a>
                    <div class="tooltip">
                        <div class="profile">
                            <div class="user">
                                <div class="img">Pb</div>
                                <div class="details">
                                    <div class="name">PowerBI</div>
                                    <div class="username">Business Intelligence</div>
                                </div>
                            </div>
                            <div class="about">Business analytics and data visualization</div>
                        </div>
                    </div>
                </div>

                <div class="tooltip-container viz pos-r4-c9">
                    <a class="icon">
                        <div class="layer">
                            <span></span><span></span><span></span><span></span>
                            <span class="fab">Tb</span>
                        </div>
                    </a>
                    <div class="tooltip">
                        <div class="profile">
                            <div class="user">
                                <div class="img">Tb</div>
                                <div class="details">
                                    <div class="name">Tableau</div>
                                    <div class="username">Data Visualization</div>
                                </div>
                            </div>
                            <div class="about">Interactive data visualization software</div>
                        </div>
                    </div>
                </div>
                <!-- Troisième ligne - ML & Deep Learning -->
                <div class="tooltip-container ml pos-r2-c6">
                    <a class="icon">
                        <div class="layer">
                            <span></span><span></span><span></span><span></span>
                            <span class="fab">Sk</span>
                        </div>
                    </a>
                    <div class="tooltip">
                        <div class="profile">
                            <div class="user">
                                <div class="img">Sk</div>
                                <div class="details">
                                    <div class="name">Scikit-learn</div>
                                    <div class="username">Machine Learning</div>
                                </div>
                            </div>
                            <div class="about">Machine learning library for classical algorithms</div>
                        </div>
                    </div>
                </div>

                <div class="tooltip-container ml pos-r2-c7">
                    <a class="icon">
                        <div class="layer">
                            <span></span><span></span><span></span><span></span>
                            <span class="fab">Tf</span>
                        </div>
                    </a>
                    <div class="tooltip">
                        <div class="profile">
                            <div class="user">
                                <div class="img">Tf</div>
                                <div class="details">
                                    <div class="name">TensorFlow</div>
                                    <div class="username">Deep Learning</div>
                                </div>
                            </div>
                            <div class="about">End-to-end deep learning framework</div>
                        </div>
                    </div>
                </div>

                <div class="tooltip-container ml pos-r2-c8">
                    <a class="icon">
                        <div class="layer">
                            <span></span><span></span><span></span><span></span>
                            <span class="fab">Pt</span>
                        </div>
                    </a>
                    <div class="tooltip">
                        <div class="profile">
                            <div class="user">
                                <div class="img">Pt</div>
                                <div class="details">
                                    <div class="name">PyTorch</div>
                                    <div class="username">Deep Learning</div>
                                </div>
                            </div>
                            <div class="about">Dynamic deep learning framework</div>
                        </div>
                    </div>
                </div>

                <div class="tooltip-container ml pos-r2-c9">
                    <a class="icon">
                        <div class="layer">
                            <span></span><span></span><span></span><span></span>
                            <span class="fab">Kr</span>
                        </div>
                    </a>
                    <div class="tooltip">
                        <div class="profile">
                            <div class="user">
                                <div class="img">Kr</div>
                                <div class="details">
                                    <div class="name">Keras</div>
                                    <div class="username">Deep Learning API</div>
                                </div>
                            </div>
                            <div class="about">High-level neural network API</div>
                        </div>
                    </div>
                </div>

                <!-- MLOps Tools -->
                <div class="tooltip-container mlops pos-r3-c1">
                    <a class="icon">
                        <div class="layer">
                            <span></span><span></span><span></span><span></span>
                            <span class="fab">Dk</span>
                        </div>
                    </a>
                    <div class="tooltip">
                        <div class="profile">
                            <div class="user">
                                <div class="img">Dk</div>
                                <div class="details">
                                    <div class="name">Docker</div>
                                    <div class="username">Containerization</div>
                                </div>
                            </div>
                            <div class="about">Container platform for applications</div>
                        </div>
                    </div>
                </div>

                <div class="tooltip-container mlops pos-r3-c2">
                    <a class="icon">
                        <div class="layer">
                            <span></span><span></span><span></span><span></span>
                            <span class="fab">K8</span>
                        </div>
                    </a>
                    <div class="tooltip">
                        <div class="profile">
                            <div class="user">
                                <div class="img">K8</div>
                                <div class="details">
                                    <div class="name">Kubernetes</div>
                                    <div class="username">Orchestration</div>
                                </div>
                            </div>
                            <div class="about">Container orchestration platform</div>
                        </div>
                    </div>
                </div>

                <div class="tooltip-container mlops pos-r3-c3">
                    <a class="icon">
                        <div class="layer">
                            <span></span><span></span><span></span><span></span>
                            <span class="fab">Af</span>
                        </div>
                    </a>
                    <div class="tooltip">
                        <div class="profile">
                            <div class="user">
                                <div class="img">Af</div>
                                <div class="details">
                                    <div class="name">Airflow</div>
                                    <div class="username">Workflow Management</div>
                                </div>
                            </div>
                            <div class="about">Platform for programmatically authoring, scheduling and monitoring workflows</div>
                        </div>
                    </div>
                </div>

                <div class="tooltip-container mlops pos-r3-c4">
                    <a class="icon">
                        <div class="layer">
                            <span></span><span></span><span></span><span></span>
                            <span class="fab">Jk</span>
                        </div>
                    </a>
                    <div class="tooltip">
                        <div class="profile">
                            <div class="user">
                                <div class="img">Jk</div>
                                <div class="details">
                                    <div class="name">Jenkins</div>
                                    <div class="username">CI/CD Tool</div>
                                </div>
                            </div>
                            <div class="about">Open-source automation server for building, testing, and deploying software</div>
                        </div>
                    </div>
                </div>

                <div class="tooltip-container mlops pos-r3-c5">
                    <a class="icon">
                        <div class="layer">
                            <span></span><span></span><span></span><span></span>
                            <span class="fab">As</span>
                        </div>
                    </a>
                    <div class="tooltip">
                        <div class="profile">
                            <div class="user">
                                <div class="img">As</div>
                                <div class="details">
                                    <div class="name">AWS</div>
                                    <div class="username">Cloud Platform</div>
                                </div>
                            </div>
                            <div class="about">Cloud computing platform offering compute power, database storage, ML services and other functionalities</div>
                        </div>
                    </div>
                </div>

                <!-- Monitoring & Testing -->
                <div class="tooltip-container monitor pos-r4-c1">
                    <a class="icon">
                        <div class="layer">
                            <span></span><span></span><span></span><span></span>
                            <span class="fab">Pr</span>
                        </div>
                    </a>
                    <div class="tooltip">
                        <div class="profile">
                            <div class="user">
                                <div class="img">Pr</div>
                                <div class="details">
                                    <div class="name">Prometheus</div>
                                    <div class="username">Monitoring</div>
                                </div>
                            </div>
                            <div class="about">Monitoring and alerting toolkit</div>
                        </div>
                    </div>
                </div>

                <div class="tooltip-container monitor pos-r4-c2">
                    <a class="icon">
                        <div class="layer">
                            <span></span><span></span><span></span><span></span>
                            <span class="fab">Gr</span>
                        </div>
                    </a>
                    <div class="tooltip">
                        <div class="profile">
                            <div class="user">
                                <div class="img">Gr</div>
                                <div class="details">
                                    <div class="name">Grafana</div>
                                    <div class="username">Visualization</div>
                                </div>
                            </div>
                            <div class="about">Analytics & monitoring platform</div>
                        </div>
                    </div>
                </div>

                <div class="tooltip-container mlops pos-r4-c3">
                    <a class="icon">
                        <div class="layer">
                            <span></span><span></span><span></span><span></span>
                            <span class="fab">Dc</span>
                        </div>
                    </a>
                    <div class="tooltip">
                        <div class="profile">
                            <div class="user">
                                <div class="img">Dc</div>
                                <div class="details">
                                    <div class="name">DVC</div>
                                    <div class="username">MLOps Tool</div>
                                </div>
                            </div>
                            <div class="about">Version control system for machine learning projects, managing data files and model versions</div>
                        </div>
                    </div>
                </div>

                <div class="tooltip-container test pos-r4-c4">
                    <a class="icon">
                        <div class="layer">
                            <span></span><span></span><span></span><span></span>
                            <span class="fab">Py</span>
                        </div>
                    </a>
                    <div class="tooltip">
                        <div class="profile">
                            <div class="user">
                                <div class="img">Py</div>
                                <div class="details">
                                    <div class="name">Pytest</div>
                                    <div class="username">Testing</div>
                                </div>
                            </div>
                            <div class="about">Python testing framework</div>
                        </div>
                    </div>
                </div>

                <div class="tooltip-container db pos-r4-c5">
                    <a class="icon">
                        <div class="layer">
                            <span></span><span></span><span></span><span></span>
                            <span class="fab">Md</span>
                        </div>
                    </a>
                    <div class="tooltip">
                        <div class="profile">
                            <div class="user">
                                <div class="img">Md</div>
                                <div class="details">
                                    <div class="name">MongoDB</div>
                                    <div class="username">NoSQL Database</div>
                                </div>
                            </div>
                            <div class="about">Document-oriented NoSQL database for building scalable and flexible modern applications</div>
                        </div>
                    </div>
                </div>

                <div class="tooltip-container mlops pos-r4-c8">
                    <a class="icon">
                        <div class="layer">
                            <span></span><span></span><span></span><span></span>
                            <span class="fab">Gt</span>
                        </div>
                    </a>
                    <div class="tooltip">
                        <div class="profile">
                            <div class="user">
                                <div class="img">Gt</div>
                                <div class="details">
                                    <div class="name">Git</div>
                                    <div class="username">Version Control</div>
                                </div>
                            </div>
                            <div class="about">Distributed version control system for tracking changes in source code during software development</div>
                        </div>
                    </div>
                </div>

                <div class="tooltip-container mlops pos-r3-c6">
                    <a class="icon">
                        <div class="layer">
                            <span></span><span></span><span></span><span></span>
                            <span class="fab">Ml</span>
                        </div>
                    </a>
                    <div class="tooltip">
                        <div class="profile">
                            <div class="user">
                                <div class="img">Ml</div>
                                <div class="details">
                                    <div class="name">MLflow</div>
                                    <div class="username">ML Lifecycle</div>
                                </div>
                            </div>
                            <div class="about">Platform for ML lifecycle management</div>
                        </div>
                    </div>
                </div>

                <div class="tooltip-container nlp pos-r3-c7">
                    <a class="icon">
                        <div class="layer">
                            <span></span><span></span><span></span><span></span>
                            <span class="fab">Bs</span>
                        </div>
                    </a>
                    <div class="tooltip">
                        <div class="profile">
                            <div class="user">
                                <div class="img">Bs</div>
                                <div class="details">
                                    <div class="name">BeautifulSoup</div>
                                    <div class="username">Web Scraping</div>
                                </div>
                            </div>
                            <div class="about">Python library for pulling data out of HTML and XML files, ideal for web scraping</div>
                        </div>
                    </div>
                </div>

                <div class="tooltip-container nlp pos-r3-c8">
                    <a class="icon">
                        <div class="layer">
                            <span></span><span></span><span></span><span></span>
                            <span class="fab">Nt</span>
                        </div>
                    </a>
                    <div class="tooltip">
                        <div class="profile">
                            <div class="user">
                                <div class="img">Nt</div>
                                <div class="details">
                                    <div class="name">NLTK</div>
                                    <div class="username">Natural Language Processing</div>
                                </div>
                            </div>
                            <div class="about">Natural Language Toolkit for text processing, classification, tokenization, stemming, and semantic reasoning</div>
                        </div>
                    </div>
                </div>

                <div class="tooltip-container nlp pos-r3-c9">
                    <a class="icon">
                        <div class="layer">
                            <span></span><span></span><span></span><span></span>
                            <span class="fab">Sc</span>
                        </div>
                    </a>
                    <div class="tooltip">
                        <div class="profile">
                            <div class="user">
                                <div class="img">Sc</div>
                                <div class="details">
                                    <div class="name">spaCy</div>
                                    <div class="username">Industrial-Strength NLP</div>
                                </div>
                            </div>
                            <div class="about">Modern NLP library with pre-trained models, support for deep learning integration, and optimized performance for production use</div>
                        </div>
                    </div>
                </div>

                <div class="tooltip-container mlops pos-r4-c6">
                    <a class="icon">
                        <div class="layer">
                            <span></span><span></span><span></span><span></span>
                            <span class="fab">Bn</span>
                        </div>
                    </a>
                    <div class="tooltip">
                        <div class="profile">
                            <div class="user">
                                <div class="img">Bn</div>
                                <div class="details">
                                    <div class="name">BentoML</div>
                                    <div class="username">Model Serving</div>
                                </div>
                            </div>
                            <div class="about">Framework for serving ML models</div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        targetElement.parentNode.replaceChild(skillsSection, targetElement);

    } catch (error) {
        console.error('Erreur lors du chargement des compétences:', error);
    }
});
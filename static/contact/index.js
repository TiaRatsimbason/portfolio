document.addEventListener('DOMContentLoaded', async () => {
    const targetElement = document.getElementById('contact-target');
    if (!targetElement) {
        console.error("L'élément cible pour le contact n'a pas été trouvé");
        return;
    }

    const contactSection = document.createElement('section');
    contactSection.className = 'contact-area';

    const contactContainer = document.createElement('div');
    contactContainer.className = 'contact-container';

    try {
        const styleLink = document.createElement('link');
        styleLink.rel = 'stylesheet';
        styleLink.href = '/static/contact/contact.css';
        document.head.appendChild(styleLink);

        contactContainer.innerHTML = `
            <div class="card">
                <ul>
                    <li class="iso-pro">
                        <span></span>
                        <span></span>
                        <span></span>
                        <a href="mailto:ratsimbason.tia@email.com">
                            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="svg">
                                <path d="M16 3v10c0 .567-.433 1-1 1h-1V4.925L8 9.233 2 4.925V14H1c-.567 0-1-.433-1-1V3c0-.283.108-.533.287-.712C.467 2.107.718 2 1 2h.333L8 6.833 14.667 2H15c.283 0 .533.108.713.288.179.179.287.429.287.712z" fill-rule="evenodd"/>
                            </svg>
                        </a>
                        <div class="text">Gmail</div>
                    </li>
                    <li class="iso-pro">
                        <span></span>
                        <span></span>
                        <span></span>
                        <a href="https://linkedin.com/in/tia-ratsimbason-42110887">
                            <svg class="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                            </svg>
                        </a>
                        <div class="text">LinkedIn</div>
                    </li>
                    <li class="iso-pro">
                        <span></span>
                        <span></span>
                        <span></span>
                        <a href="https://github.com/TiaRatsimbason">
                            <svg class="svg" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                            </svg>
                        </a>
                        <div class="text">GitHub</div>
                    </li>
                </ul>
            </div>
                
        `;
        contactSection.appendChild(contactContainer);
        targetElement.parentNode.replaceChild(contactSection, targetElement);
    } catch (error) {
        console.error('Erreur lors du chargement du contact:', error);
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const coolButton = document.querySelector('.cool-button');
    
    coolButton.addEventListener('mouseenter', function() {
        const textRetour = this.querySelector('.char.state-1');
        const textPortfolio = this.querySelector('.char.state-2');
        
        textRetour.style.animation = 'fadeOut 0.3s forwards';
        textPortfolio.style.opacity = '1';
        textPortfolio.style.animation = 'fadeIn 0.3s forwards';
    });
    
    coolButton.addEventListener('mouseleave', function() {
        const textRetour = this.querySelector('.char.state-1');
        const textPortfolio = this.querySelector('.char.state-2');
        
        textRetour.style.animation = 'fadeIn 0.3s forwards';
        textRetour.style.opacity = '1';
        textPortfolio.style.animation = 'fadeOut 0.3s forwards';
    });
});
from flask import render_template, request, redirect, url_for

def configure_routes(app):
    @app.route('/')
    def accueil():
        # Ne plus rediriger vers la version mobile allégée
        return render_template('index.html')
    
    @app.route('/mobile')
    def mobile():
        # Utiliser la version complète au lieu de la version allégée
        return render_template('index.html')
        
    @app.route('/slider')
    def slider():
        return render_template('slider.html')
from flask import render_template

def configure_routes(app):
    @app.route('/')
    def accueil():
        return render_template('index.html')
        
    @app.route('/slider')
    def slider():
        return render_template('slider.html')
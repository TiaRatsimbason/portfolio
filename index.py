from flask import Flask, render_template, send_from_directory
import os
from app.routes import configure_routes

# Une seule initialisation de Flask
app = Flask(__name__,
           static_folder='static',
           template_folder='templates')

# Configuration des routes existantes
configure_routes(app)

# Route racine explicite (au cas où elle ne serait pas dans configure_routes)
@app.route('/')
def index():
    return render_template('index.html')

# Gestionnaire pour les fichiers statiques
@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)

# Gestionnaire d'erreur 404
@app.errorhandler(404)
def page_not_found(e):
    return render_template('index.html'), 200
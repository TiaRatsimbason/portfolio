from flask import Flask
import os
import logging
from app.routes import configure_routes  # Importer les routes

app = Flask(__name__)
logging.basicConfig(level=logging.DEBUG)  # Ajout du logging

# Configuration pour les fichiers statiques
app.static_folder = 'static'

# Assurez-vous que ces dossiers existent
if not os.path.exists('templates'):
    os.makedirs('templates')
if not os.path.exists('static'):
    os.makedirs('static')

# Configurez les routes
configure_routes(app)

app = app  # Nécessaire pour l'environnement Vercel

if __name__ == '__main__':
    app.logger.debug("Démarrage de l'application")  # Ajout d'un log de démarrage
    app.run(debug=True, use_reloader=True)
    

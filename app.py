from flask import Flask
import os
import logging
import time
from routes_package.routes import configure_routes

app = Flask(__name__)
logging.basicConfig(level=logging.DEBUG)

# Configuration pour les fichiers statiques
app.static_folder = 'static'

# Génération d'un identifiant de version basé sur le timestamp actuel
app.config['STATIC_VERSION'] = int(time.time())

# Rendre la version disponible dans tous les templates
@app.context_processor
def inject_static_version():
    return dict(static_version=app.config['STATIC_VERSION'])

# Assurez-vous que ces dossiers existent
if not os.path.exists('templates'):
    os.makedirs('templates')
if not os.path.exists('static'):
    os.makedirs('static')

# Ajout de la fonction pour désactiver le cache
@app.after_request
def add_header(response):
    # Traitement spécifique pour les fichiers CSS
    if 'text/css' in response.headers.get('Content-Type', ''):
        # Strictement pas de cache pour CSS
        response.headers['Cache-Control'] = 'no-store, max-age=0'
    elif 'Cache-Control' not in response.headers:
        response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate'
    
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    return response

# Configurez les routes
configure_routes(app)

if __name__ == '__main__':
    app.logger.debug("Démarrage de l'application")
    app.run(host='0.0.0.0', port=5000, debug=True, use_reloader=True)
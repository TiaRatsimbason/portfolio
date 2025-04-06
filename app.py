from flask import Flask 
import os 
import logging 
from routes_package.routes import configure_routes # Importer les routes  

app = Flask(__name__) 
logging.basicConfig(level=logging.DEBUG)  # Ajout du logging  

# Configuration pour les fichiers statiques 
app.static_folder = 'static'  

# Assurez-vous que ces dossiers existent 
if not os.path.exists('templates'):     
    os.makedirs('templates') 
if not os.path.exists('static'):     
    os.makedirs('static')  

# Ajout de la fonction pour désactiver le cache
@app.after_request
def add_header(response):
    if 'Cache-Control' not in response.headers:
        response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate'
        response.headers['Pragma'] = 'no-cache'
        response.headers['Expires'] = '0'
    return response

# Configurez les routes 
configure_routes(app)  

if __name__ == '__main__':     
    app.logger.debug("Démarrage de l'application")  # Ajout d'un log de démarrage     
    app.run(host='0.0.0.0', port=5000, debug=True, use_reloader=True)
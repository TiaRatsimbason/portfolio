from flask import Flask
import os
from app.routes import configure_routes  # Importer les routes

app = Flask(__name__)

# Configuration pour les fichiers statiques
app.static_folder = 'static'

# Assurez-vous que ce dossier existe
if not os.path.exists('templates'):
    os.makedirs('templates')
if not os.path.exists('static'):
    os.makedirs('static')

# Configurez les routes
configure_routes(app)

if __name__ == '__main__':
    app.run(debug=True)

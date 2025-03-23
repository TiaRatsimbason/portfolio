from flask import Flask, render_template, send_from_directory
import os
from app.routes import configure_routes

app = Flask(__name__, 
           static_folder='static',
           template_folder='templates')

configure_routes(app)

# Nécessaire pour les fichiers statiques sur Vercel
@app.route('/<path:path>')
def static_file(path):
    if os.path.exists(os.path.join('static', path)):
        return send_from_directory('static', path)
    return app.send_static_file('index.html')

# Gestionnaire d'erreur 404
@app.errorhandler(404)
def page_not_found(e):
    return render_template('index.html'), 200

# Au début du fichier, après les imports
app = Flask(__name__, 
           static_folder='static',
           template_folder='templates')

@app.route('/<path:undefined_route>')
def catch_all(undefined_route):
    return f"Route demandée: /{undefined_route}", 200
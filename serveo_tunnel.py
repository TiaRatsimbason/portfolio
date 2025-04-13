#!/usr/bin/env python3
import os
import sys
import subprocess
import time
import threading

# Couleurs pour le terminal
GREEN = '\033[92m'
YELLOW = '\033[93m'
BLUE = '\033[94m'
RED = '\033[91m'
RESET = '\033[0m'

def banner(text):
    """Affiche une bannière dans le terminal"""
    print(f"\n{BLUE}{'=' * 60}")
    print(f" {text.center(58)}")
    print(f"{'=' * 60}{RESET}\n")

def check_ssh():
    """Vérifie si SSH est installé"""
    try:
        subprocess.run(["ssh", "-V"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        return True
    except:
        return False

def start_flask():
    """Démarre le serveur Flask en arrière-plan"""
    print(f"{YELLOW}Démarrage du serveur Flask...{RESET}")
    try:
        # Démarrer l'application Flask normale pour les tests de développement mobile
        flask_process = subprocess.Popen(
            [sys.executable, "app.py"], 
            stdout=subprocess.PIPE, 
            stderr=subprocess.PIPE
        )
        time.sleep(2)  # Attendre le démarrage du serveur
        print(f"{GREEN}✓ Serveur Flask démarré{RESET}")
        return flask_process
    except Exception as e:
        print(f"{RED}× Erreur lors du démarrage du serveur Flask: {e}{RESET}")
        return None

def start_tunnel():
    """Démarre le tunnel serveo"""
    print(f"{YELLOW}Création du tunnel vers internet via serveo...{RESET}")
    try:
        # Utiliser un nom de domaine personnalisé si possible
        tunnel_process = subprocess.Popen(
            ["ssh", "-R", "portfoliotia:80:localhost:5000", "serveo.net"],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True
        )
        
        # Lire la sortie pour capturer l'URL
        url = None
        for line in iter(tunnel_process.stdout.readline, ""):
            print(f"{BLUE}[Tunnel] {line.strip()}{RESET}")
            if "Forwarding HTTP traffic from" in line:
                url = line.split("Forwarding HTTP traffic from")[1].strip()
                break
            elif "https://" in line:
                for word in line.split():
                    if "https://" in word:
                        url = word.strip()
                        break
        
        if url:
            print(f"{GREEN}✓ Tunnel créé avec succès!{RESET}")
            print(f"\n{YELLOW}URL de votre portfolio:{RESET}")
            print(f"{GREEN}{url}{RESET}")
                
            print(f"\n{BLUE}Partagez cette URL pour accéder à votre portfolio depuis n'importe quel appareil{RESET}")
        
        # Continuer à afficher les logs du tunnel
        threading.Thread(target=stream_logs, args=(tunnel_process,), daemon=True).start()
        
        return tunnel_process
    except Exception as e:
        print(f"{RED}× Erreur lors de la création du tunnel: {e}{RESET}")
        return None

def stream_logs(process):
    """Affiche les logs d'un processus en temps réel"""
    for line in iter(process.stdout.readline, ""):
        if line:
            print(f"{BLUE}[Tunnel] {line.strip()}{RESET}")

def main():
    banner("CRÉATION D'UN TUNNEL INTERNET POUR VOTRE PORTFOLIO")
    banner("MODE DÉVELOPPEMENT MOBILE - VERSION COMPLÈTE")
    
    # Vérifier si SSH est installé
    if not check_ssh():
        print(f"{RED}× SSH n'est pas installé. Veuillez l'installer d'abord:{RESET}")
        print("  Sur Ubuntu/WSL: sudo apt install openssh-client")
        print("  Sur macOS: déjà installé par défaut")
        print("  Sur Windows: installez Git for Windows qui inclut SSH")
        return
    
    # Démarrer le serveur Flask
    flask_process = start_flask()
    if not flask_process:
        return
    
    # Démarrer le tunnel
    tunnel_process = start_tunnel()
    if not tunnel_process:
        flask_process.terminate()
        return
    
    print(f"\n{YELLOW}Les serveurs sont en cours d'exécution. Appuyez sur Ctrl+C pour arrêter.{RESET}")
    print(f"\n{GREEN}Vous pouvez maintenant développer et tester votre version mobile.{RESET}")
    print(f"{GREEN}Toutes les modifications seront immédiatement disponibles via l'URL du tunnel.{RESET}")
    
    try:
        # Attendre que l'utilisateur interrompe avec Ctrl+C
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print(f"\n{BLUE}Arrêt des serveurs...{RESET}")
        tunnel_process.terminate()
        flask_process.terminate()
        print(f"{GREEN}✓ Serveurs arrêtés{RESET}")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print(f"\n{BLUE}Opération annulée par l'utilisateur{RESET}")

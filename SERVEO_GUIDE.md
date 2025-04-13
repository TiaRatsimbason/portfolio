# Guide pour tester votre portfolio via Serveo

Ce guide vous explique comment utiliser le script `serveo_tunnel.py` pour créer un tunnel internet vers votre portfolio sans mot de passe, ce qui vous permettra d'y accéder depuis n'importe quel appareil.

## Prérequis

- SSH doit être installé sur votre système

Si ce n'est pas le cas, installez-le :

**Sur Ubuntu/WSL :**
```bash
sudo apt update
sudo apt install openssh-client
```

**Sur Windows :**
Installez [Git for Windows](https://gitforwindows.org/) qui inclut SSH, ou utilisez WSL.

## Instructions

1. Ouvrez un terminal dans le répertoire de votre projet
2. Rendez le script exécutable (uniquement pour Linux/WSL) :
   ```bash
   chmod +x serveo_tunnel.py
   ```
3. Exécutez le script :
   ```bash
   python serveo_tunnel.py
   ```
4. Le script va :
   - Vérifier si SSH est installé
   - Démarrer votre serveur Flask
   - Créer un tunnel SSH vers Internet via serveo.net
   - Afficher l'URL à laquelle vous pouvez accéder à votre portfolio

5. Utilisez l'URL affichée pour accéder à votre portfolio depuis n'importe quel appareil

## Avantages de cette approche

- **Aucun mot de passe requis**
- **Pas de limite de bande passante**
- **Pas besoin de configurer votre pare-feu ou réseau local**
- **Accès depuis n'importe où**, pas seulement depuis votre réseau local
- **Compatible avec toutes les plateformes** qui ont SSH

## Résolution des problèmes

### Si SSH n'est pas installé

```bash
# Sur Ubuntu/WSL
sudo apt update
sudo apt install openssh-client

# Sur macOS
# SSH est déjà installé par défaut

# Sur Windows
# Installez Git for Windows qui inclut SSH
```

### Si le serveur refuse la connexion

Serveo est un service gratuit qui peut parfois être surchargé. Si vous rencontrez des problèmes, essayez :

1. D'exécuter le script à nouveau
2. D'attendre quelques minutes et réessayer
3. D'utiliser un nom de domaine différent (vous pouvez modifier le script)

## Remarque

Le tunnel généré par Serveo sera accessible publiquement sur Internet tant que le script est en cours d'exécution. Arrêtez le script (avec Ctrl+C) lorsque vous avez terminé vos tests pour des raisons de sécurité.

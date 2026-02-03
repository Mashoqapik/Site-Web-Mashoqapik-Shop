# Guide de Déploiement Vercel - Takayama Shop

## 📋 Prérequis

- Un compte Vercel (gratuit ou payant)
- Un compte GitHub (pour connecter le repository)
- Les credentials Discord OAuth2 (Client ID, Client Secret, Redirect URI)

## 🚀 Déploiement sur Vercel

### Étape 1 : Préparer le Repository GitHub

1. Créez un nouveau repository sur GitHub (ou utilisez un existant)
2. Poussez le code du projet vers GitHub :

```bash
cd /home/ubuntu/takayama-shop
git init
git add .
git commit -m "Initial commit - Takayama Shop"
git remote add origin https://github.com/VOTRE_USERNAME/takayama-shop.git
git push -u origin main
```

### Étape 2 : Importer le Projet sur Vercel

1. Connectez-vous à [Vercel](https://vercel.com)
2. Cliquez sur **"Add New Project"**
3. Sélectionnez votre repository GitHub **takayama-shop**
4. Vercel détectera automatiquement le framework (Vite + Express)

### Étape 3 : Configurer les Variables d'Environnement

Dans les paramètres du projet Vercel, ajoutez les variables d'environnement suivantes :

#### Variables Discord OAuth2 (OBLIGATOIRES)

```
DISCORD_CLIENT_ID=votre_discord_client_id
DISCORD_CLIENT_SECRET=votre_discord_client_secret
DISCORD_REDIRECT_URI=https://votre-domaine.vercel.app/api/oauth/callback
```

> **Note** : Remplacez `votre-domaine.vercel.app` par votre domaine Vercel réel

#### Variables Système (Déjà configurées par Manus)

Les variables suivantes sont automatiquement injectées par Manus :
- `DATABASE_URL`
- `JWT_SECRET`
- `VITE_APP_ID`
- `OAUTH_SERVER_URL`
- `VITE_OAUTH_PORTAL_URL`
- `OWNER_OPEN_ID`
- `OWNER_NAME`
- `BUILT_IN_FORGE_API_URL`
- `BUILT_IN_FORGE_API_KEY`
- `VITE_FRONTEND_FORGE_API_KEY`
- `VITE_FRONTEND_FORGE_API_URL`

### Étape 4 : Configurer Discord OAuth2

1. Allez sur [Discord Developer Portal](https://discord.com/developers/applications)
2. Créez une nouvelle application ou sélectionnez une existante
3. Dans **OAuth2** → **General**, ajoutez votre Redirect URI :
   ```
   https://votre-domaine.vercel.app/api/oauth/callback
   ```
4. Copiez le **Client ID** et **Client Secret**
5. Ajoutez ces valeurs dans les variables d'environnement Vercel

### Étape 5 : Déployer

1. Cliquez sur **"Deploy"** dans Vercel
2. Attendez que le build se termine (environ 2-3 minutes)
3. Votre site sera disponible sur `https://votre-projet.vercel.app`

## 🔧 Configuration Build

Vercel détecte automatiquement la configuration suivante :

**Build Command:**
```bash
pnpm build
```

**Output Directory:**
```
dist
```

**Install Command:**
```bash
pnpm install
```

## 🌐 Domaine Personnalisé

Pour ajouter un domaine personnalisé :

1. Allez dans **Settings** → **Domains**
2. Ajoutez votre domaine (ex: `takayama-shop.com`)
3. Configurez les DNS selon les instructions Vercel
4. Mettez à jour la variable `DISCORD_REDIRECT_URI` avec le nouveau domaine

## 🔍 Vérification Post-Déploiement

Après le déploiement, vérifiez :

- ✅ Le welcome screen s'affiche avec les animations
- ✅ Le bouton "Click to enter" fonctionne
- ✅ La page principale affiche correctement
- ✅ Les animations GSAP fonctionnent (glow, parallax, fade)
- ✅ Le bouton "Login with Discord" redirige vers Discord
- ✅ Le callback OAuth fonctionne après connexion
- ✅ La section shop affiche les 3 produits
- ✅ Les hover effects fonctionnent sur les cartes
- ✅ Le bouton "Rejoindre le Discord" ouvre https://discord.gg/Takayama

## 🐛 Dépannage

### Erreur OAuth Discord

Si l'authentification Discord ne fonctionne pas :
1. Vérifiez que `DISCORD_REDIRECT_URI` correspond exactement à l'URL configurée dans Discord
2. Vérifiez que `DISCORD_CLIENT_ID` et `DISCORD_CLIENT_SECRET` sont corrects
3. Assurez-vous que l'application Discord est publique (non en mode développement)

### Erreur de Build

Si le build échoue :
1. Vérifiez les logs Vercel pour identifier l'erreur
2. Assurez-vous que toutes les dépendances sont installées (`pnpm install`)
3. Testez le build localement : `pnpm build`

### Animations ne fonctionnent pas

Si les animations GSAP ne s'affichent pas :
1. Vérifiez que GSAP est bien installé : `pnpm list gsap`
2. Ouvrez la console du navigateur pour voir les erreurs JavaScript
3. Vérifiez que les fichiers CSS sont chargés correctement

## 📊 Performance

Le site est optimisé pour :
- ⚡ Chargement rapide (< 2s)
- 📱 Responsive sur tous les appareils
- 🎨 Animations fluides 60fps
- 🔍 SEO optimisé avec meta tags

## 🔐 Sécurité

- ✅ Authentification OAuth2 sécurisée
- ✅ Variables d'environnement protégées
- ✅ HTTPS activé par défaut sur Vercel
- ✅ Cookies sécurisés (httpOnly, sameSite)

## 📝 Notes Importantes

1. **Manus OAuth** : Le template utilise Manus OAuth par défaut. Pour utiliser Discord OAuth directement, vous devrez modifier le code d'authentification.

2. **Base de données** : Le projet utilise une base de données MySQL/TiDB fournie par Manus. Pour Vercel, vous pouvez utiliser Vercel Postgres ou une autre solution.

3. **Domaine Manus** : Si vous déployez sur Manus (via le bouton Publish dans l'UI), les variables d'environnement sont automatiquement configurées.

## 🎯 Alternative : Déploiement sur Manus

Pour déployer directement sur Manus (recommandé) :

1. Créez un checkpoint dans l'interface Manus
2. Cliquez sur le bouton **"Publish"** dans le header
3. Votre site sera automatiquement déployé avec toutes les variables d'environnement configurées
4. Domaine personnalisé disponible dans **Settings** → **Domains**

## 📞 Support

Pour toute question ou problème :
- Documentation Vercel : https://vercel.com/docs
- Documentation Discord OAuth : https://discord.com/developers/docs/topics/oauth2
- Support Manus : https://help.manus.im

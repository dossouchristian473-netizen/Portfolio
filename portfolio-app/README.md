# Portfolio de Dossou Christian

Le nouveau site se trouve dans portfolio-app/. Les anciens fichiers restent conservés à la racine.

## Propriété et hébergement
- Code : ce dépôt GitHub.
- Hébergement : projet Vercel dossou-christian-portfolio, Root Directory portfolio-app.
- Données et photos : stockage Vercel Blob privé christian-portfolio-content.
- Administration : /admin sur la même adresse que le portfolio, mot de passe personnel.
Aucun abonnement ChatGPT ni appel à OpenAI n'est nécessaire au fonctionnement.

## Modifier le site
Ouvrez /admin, connectez-vous puis utilisez « Modifier mon portfolio » en bas de page. Choisissez une photo ou ajoutez vos projets puis enregistrez. Changez votre mot de passe dans la section de sécurité. Ne communiquez jamais votre mot de passe.

## Configuration serveur
BLOB_STORE_ID : identifiant du stockage connecté ; Vercel utilise l'identité OIDC du projet.
SESSION_SECRET : clé aléatoire de 32 caractères minimum pour les cookies chiffrés.
ADMIN_INITIAL_PASSWORD : mot de passe initial (20 caractères minimum). Après le premier changement, le mot de passe haché du stockage privé prend le relais.
Ne stockez jamais ces secrets dans GitHub.
Si vous perdez le mot de passe : ouvrez Vercel Storage, supprimez uniquement private/admin.json, définissez un nouveau ADMIN_INITIAL_PASSWORD et redéployez. Les données et photos restent intactes.
Une sauvegarde du contenu précédent est conservée dans private/previous-content.json. Exportez régulièrement vos données depuis Vercel Storage.

## Développement et transfert
cd portfolio-app
npm install
npm run dev
npm run build
Le code est un projet Next.js standard. Pour changer d'hébergement, transférez les fichiers Blob et remplacez app/storage.ts, puis configurez les variables serveur.

# Dossou Christian — Portfolio sur Vercel

Version publique Next.js. Les anciens fichiers restent intacts à la racine.

Vercel : Root Directory `portfolio-app`, Framework Next.js. Configurer `PORTFOLIO_SOURCE_TOKEN` côté serveur, jamais NEXT_PUBLIC.

Le lien « Mon espace privé » ouvre le portfolio d’origine. Connectez-vous avec le compte propriétaire pour modifier vos textes et importer vos images. Les changements enregistrés y sont lus par la version publique.

Le site public n’a aucun endpoint de modification ni d’import. Cette version dépend du site d’origine pour ses contenus : ne pas le supprimer. Si son accès de service change, mettre à jour PORTFOLIO_SOURCE_TOKEN.

Développement : npm install, npm run dev. Vérification : npm run build.

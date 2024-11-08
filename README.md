# Ma première API Rest
Cette API est un exemple de blog basique avec des posts, des catégories et des utilisateurs

> La sécurité est fait au travers d'une authentification JWT + des DTOS

## Technologies utilisées

Pour créer ce projet en NodeJS, nous avons utilisé :

* 🐲 Fastify
* 🏔️ Prisma
* 🐸 Swagger
* 💿 MySQL

## Get started

Pour lancer ce projet, la première étape est de copier le fichier `.env.example` et de remplacer les valeurs par les vôtres.

Ensuite, il faudra lancer les commandes :
```
npm install
npm run db:dev:migrate
npm run dev
```

(Pensez bien à lancer votre base de données en amont !)

> 🎉 Et voilà, votre API est lancée !
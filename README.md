<p align="center">
  <h3 align="center">Enquete.dev</h3>

  <p align="center">
    Trouvez les réponses à vos enquêtes sur le métier de développeur
    <br />
    <a href="https://enquete.dev">Site</a>
    ·
    <a href="https://github.com/khylias/enquete-dev/issues">Ajouter une question</a>
     ·
    <a href="https://github.com/khylias/enquete-dev/issues">Signaler un bug</a>
  </p>
</p>

## Table des matières

- [Table des matières](#table-des-matières)
- [Concept](#concept)
- [La Technique](#la-technique)
- [Les limites](#les-limites)
- [Conclusion](#conclusion)
- [A propos du projet](#a-propos-du-projet)
  - [Fait avec](#fait-avec)
- [Getting Started](#getting-started)
  - [Pré-requis](#pré-requis)
  - [Installation](#installation)
- [Contribution](#contribution)
- [License](#license)
- [Maintenance](#maintenance)

# See you next time 👋

## Concept
Enquete.dev se veut être une FAQ participative et open-source sur les métiers du développement informatique de manière générale. Fort du constat que beaucoup de personnes se réorientent professionnellement vers ce domaine et des nombreuses questions récurrentes dans la communauté, j'ai imaginé cette FAQ.

La particularité de cette FAQ réside dans ses aspects techniques (qui mèneront à son annulation) autour d'une authentification avec Github, le déploiement automatisé et un accès au code source permanent.
Un visiteur de la FAQ a la possibilité de poser une nouvelle question ou de répondre à une question existante. Pour cela, il a uniquement besoin de se connecter avec son compte Github. Le Projet étant déclaré une OAuth Apps chez Github, il a la possibilité d'intéragir avec le compte de l'utilisateur.

Une fois connecté, répondre ou poser une question reviendra pour l'utilisateur à ouvrir une Pull Request sur le dépôt principal avec sa participation formaté dans un fichier markdown. Ce fichier sera construit en fonction du type de contenu, question ou réponse, pour ajouter les attributs et autres tags nécessaires.
La Pull Request créée, je suis en mesure d'administrer les participations des utilisateurs par la revue des PRs et de les accepter. À validation, la branche ` master` du projet se met à jour et lance automatiquement un nouveau déploiement chez l'hébergeur et 2 minutes plus tard, le contenu est en production 🎉

Le tout étant totalement Open-source et publique: le code actuel en production, les PRs validées/en attente/refusées.

En somme, un beau projet collaboratif, très peu couteux financièrement et en ressources techs.

## La technique

La webapp repose sur [Nuxt 2](https://nuxtjs.org/) et son package [Nuxt/content](https://content.nuxtjs.org/). Content permet au build de l'application de traiter des fichiers Markdown afin d'en générer des pages HTML et ainsi avoir la totalité du contenu en fichiers statiques, s'approchant du principe de JAMstack.
Le projet est totalement publique et est disponible sur [Github](https://github.com/khylias/enquete-dev), ce qui permet à chacun d'avoir une vue d'ensemble des avancements du projets: contributions techniques, participations écrites, etc...

Avec des fichiers uniquement statiques, un provider de type Netlify ou Vercel est parfait pour lé déploiement à moindre frais ainsi que pour son déploiement automatisé à chaque mise à jour de la branche `master` du répertoire Github.

Point cruciale du projet, la connexion à Github par OAuth afin de pouvoir agir sur le dépôt depuis une interface externe. Une fois authentifié, avec l'aide de l'API REST de Github, l'app pourra au nom de l'utilisateur créer un fork du projet, une branche enfant, commiter sur cette branche et poser une Pull Request au dépôt originel.

Mais voilà...

## Les limites

Le point le plus important se révèle est le plus complexe et le plus bloquant pour la suite du projet, l'authentification OAuth à Github.

### Nuxt Auth et le SGG
Le projet se basant sur Nuxt, je me suis naturellement tourné vers le package [Nuxt/auth](https://auth.nuxtjs.org/) et ses implémentations de providers OAuth comme Discord, Google ou Github. Coté développement, tout se passe bien. Premier test en prod KO ❌, l'authentification Github tombe sur une 404 de chez Netlify.
En production, l'app tourne en statique et non sur un serveur node, normal. Mais le plugin et Github ont besoin d'une route de callback afin de récupérer par la suite l'access_token.
Soit, mon url n'existe pas ? Je vais la créer avec un template dans la section `pages` avec pour nom Callback. L'OAuth Github arrive bien sur l'instance Nuxt 🎉

### Nuxt Auth + Github CORS
Après l'étape précédente, Github nous communique un code temporaire que nous devons renvoyer avec les clientId et clientSecret afin de récupérer l'access_token qui nous servira pour tout le flow de l'application.
Et là, c'est le son de la police ! La CORS-policy de Github qui renvoit une erreur ne nous permettant par depuis notre url d'origine de récupérer ce token. (en plus d'exposer notre clientSecret dans une requête publique)

### Netlify-identity-widget
J'utilise Netlify pour le déploiement et il se trouve qu'ils ont release un outils d'authentification calibré pour leurs environnements, [Netlify Identity](https://docs.netlify.com/visitor-access/identity/). À première vue, ça pourrait coller à mon besoin. Seul bémol à voir venir, les limites posés par le plugin et les plans de tarifications qui grimpent en flèche (sait-on jamais si le projet prends de l'ampleur 😁)
Première implémentation, cela semble fonctionner, je suis bien authentifié.

Les inconvénients... L'utilisateur donne autorisation à son compte Github à l'App NetlifyIdentity et non ma propre OAuth App. Ce n'est pas dans les valeurs du projet que de partager vos données avec un tier 😥
NetlifyIdentity ne dispose pas des autorisations suffisantes afin de faire tout le workflow décrite dans la rubrique [Technique](#la-technique). Et surtout, la modal implementé par le package se partage en 2 sections: la connexion identifiant/password avec votre compte Netlify et la connexion avec Github. Le premier m'est inutile et surtout impossible de le retirer.

Trop d'inconvénients pour cette solution.

### Netlify GoTrue
Il se trouve que Netlify-identity-widget repose un package d'authentification, [Netlify-gotrue](https://github.com/netlify/gotrue). La modal ne me convient pas ? C'est parti pour coder l'authentification à la main avec ce package.
Tout le processus se fait bien à partir d'un bouton simple de connexion, qui redirige vers Github, qui revient avec l'authentification.
Seul problème, le token est à nouveau fourni pour un scope trop restreint et n'est pas modifiable.


## Conclusion

Je pourrai palier aux problèmes d'authentification en SSG avec une api externe maison, mais cela revient à avoir 2 projets et surtout une part du code qui n'est pas publique. L'aspect statique du projet est primordiale et faisant partie intégrante du défi technique que je me suis imposé. Malgré toutes mes tentatives, à l'heure actuelle, le projet n'est pas viable pour fonctionner en statique tout en ayant une authentification OAuth avec Github.

Ce qui met un terme à ce projet. Forcément un peu déçu, mais je suis content d'y avoir bûcher pendant presque 1 an (et surtout quand j'ai le temps). Cela m'a permis d'en apprendre plus sur Nuxt, le SSG/SSR de manière générale, l'API Github et surtout tout le coté sécurité de nos chères apps web que nous utilisons tous les jours.



# A propos du projet

### Fait avec
* [Vue](https://vuejs.org/)


## Getting Started

### Pré-requis

* npm
```sh
npm install npm@latest -g
```

### Installation

1. Clonez le dépôt
```sh
git clone https://github.com/khylias/enquete-dev.git
```
2. Installez les dépendances
```sh
npm install
```
3. Lancez le serveur de dev 
```sh
npm run serve
```

<!-- CONTRIBUTING -->
## Contribution

Ce sont les contributions qui font de la communauté open source est endroit si extraordinaire pour apprendre, inspirer et créer. Toutes les contributions que vous apportez sont **pleinement appréciées**.

1. Récupérer le projet
2. Créez votre branche de feature (`git checkout -b feature/AmazingFeature`)
3. Commitez vos modifications (`git commit -m 'Add some AmazingFeature'`)
4. Poussez votre branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request



<!-- LICENSE -->
## License

Distribué sous la licence du MIT. Voir `LICENSE` pour plus d'informations.

<!-- CONTACT -->
## Maintenance

Vincent Kraus - [@Khylias](https://twitter.com/khylias)

Dépôt Github: [https://github.com/khylias/enquete-dev](https://github.com/khylias/enquete-dev)

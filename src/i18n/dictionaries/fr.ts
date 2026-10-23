import type { Dictionary } from "../types";

export const fr: Dictionary = {
  meta: {
    title: "Blinkin — Journal vidéo familial en clips de 30 secondes",
    description:
      "Filmez vos moments en famille en clips de 30 secondes, rangez-les dans un calendrier et créez un film en musique du mois ou de l’année. Gratuit sur Android. Sans cloud ni pub.",
  },
  nav: {
    privacy: "Confidentialité",
    getApp: "Obtenir l’app",
    language: "Langue",
  },
  storeButton: "Disponible sur Google Play",
  hero: {
    badge: "Gratuit sur Android",
    titleStart: "Votre vie en moments de ",
    titleAccent: "30 secondes",
    titleEnd: ".",
    text: "Blinkin est un petit journal vidéo pour votre famille. Filmez un court clip dès qu’un moment compte, gardez-le à sa date et transformez un mois ou une année entière en film — sans que rien ne quitte votre téléphone.",
    privacyLink: "Comment nous protégeons votre vie privée →",
  },
  mockup: {
    month: "Octobre 2026",
    moments: "12 moments",
    createFilm: "Créer un film",
  },
  features: [
    {
      title: "30 secondes, jamais plus",
      text: "Appuyez pour filmer et saisissez l’instant. Un minuteur garde chaque clip court, pour un journal facile à revoir.",
    },
    {
      title: "Un calendrier de moments",
      text: "Chaque clip trouve sa place à sa date. Parcourez jours, mois et années et regardez-les d’un simple geste.",
    },
    {
      title: "Une année devient un film",
      text: "Choisissez un mois, une année ou vos jours préférés, ajoutez de la musique, et Blinkin les assemble en un seul film.",
    },
    {
      title: "Privé par nature",
      text: "Pas de compte, pas de cloud, pas de pub, pas de pistage. Vos vidéos vivent sur votre téléphone et nulle part ailleurs.",
    },
  ],
  howItWorks: {
    title: "Comment ça marche",
    steps: [
      { title: "Filmer", text: "Ouvrez l’app — elle démarre directement sur la caméra. Un appui pour lancer, un autre pour arrêter." },
      { title: "Collectionner", text: "Jour après jour, les clips remplissent votre calendrier et forment une archive paisible de votre vie de famille." },
      { title: "Revivre", text: "Créez un film du mois ou de l’année, puis enregistrez-le dans votre galerie ou partagez-le." },
    ],
  },
  faq: {
    title: "Questions et réponses",
    items: [
      { question: "Blinkin est-il gratuit ?", answer: "Oui. Blinkin est gratuit à télécharger et à utiliser sur Android, et il n’y a aucune publicité." },
      {
        question: "Mes vidéos sont-elles envoyées quelque part ?",
        answer:
          "Non. Les clips sont filmés, conservés et montés en films directement sur votre téléphone. Pas de compte, pas de cloud : rien n’est envoyé ni à nous ni à personne.",
      },
      {
        question: "Pourquoi les clips sont-ils limités à 30 secondes ?",
        answer:
          "Les clips courts se filment vite et se revoient facilement. Un mois ou une année de moments de 30 secondes devient un film qu’on a vraiment envie de regarder.",
      },
      {
        question: "Puis-je ajouter de la musique à mon film ?",
        answer:
          "Oui. Choisissez n’importe quel fichier audio de votre téléphone, sélectionnez le passage de la chanson et décidez de garder ou non le son d’origine de vos clips.",
      },
      {
        question: "Comment garder ou partager un film ?",
        answer: "Enregistrez le film terminé dans la galerie de votre téléphone ou envoyez-le via n’importe quelle app avec le menu de partage standard.",
      },
      { question: "Existe-t-il une version iPhone ?", answer: "Pas encore. Blinkin sort d’abord sur Android." },
    ],
  },
  privacyBand: {
    title: "Rien ne quitte votre téléphone. Jamais.",
    text: "Tournage, stockage et montage se font sur l’appareil. Pas de serveurs, pas d’inscription, pas d’analyses — juste vos moments, dans votre poche.",
    link: "Lire la politique de confidentialité",
  },
  footer: {
    tagline: "Pensé pour les familles, gardé sur votre téléphone.",
    privacy: "Politique de confidentialité",
    contact: "Contact",
  },
  privacy: {
    metaTitle: "Politique de confidentialité",
    metaDescription: "Comment Blinkin traite vos vidéos et vos données : tout reste sur votre appareil.",
    title: "Politique de confidentialité",
    lastUpdated: "Dernière mise à jour",
    translationNote: "Ceci est une traduction. En cas de divergence, la version anglaise prévaut.",
    summaryTitle: "En bref",
    summaryText:
      "Blinkin ne collecte, ne stocke et ne partage aucune donnée personnelle. Vos vidéos sont filmées, conservées et montées uniquement sur votre téléphone. Nous n’avons ni serveurs, ni comptes, ni outils d’analyse, ni publicité.",
    sectionsBefore: [
      {
        title: "Qui sommes-nous",
        paragraphs: [
          "Blinkin (« l’application », « nous ») est une application de journal vidéo pour Android. Cette politique explique ce qu’il advient de vos informations lorsque vous l’utilisez.",
        ],
      },
      {
        title: "Données collectées",
        paragraphs: [
          "Aucune. L’application ne collecte ni informations personnelles, ni statistiques d’utilisation, ni rapports de plantage, ni identifiants d’appareil, ni localisation. Elle ne contient ni publicité ni outil d’analyse, et n’envoie aucune donnée sur internet.",
        ],
      },
      {
        title: "Vos vidéos",
        paragraphs: [
          "Les clips que vous filmez sont enregistrés dans l’espace de stockage privé de l’application sur votre appareil, avec une petite image d’aperçu, la date et la durée de chaque clip. Ces informations ne quittent jamais votre téléphone et ne sont accessibles ni à nous ni aux autres applications.",
          "Les films sont assemblés sur l’appareil. Un film terminé ne quitte l’application que si vous choisissez de l’enregistrer dans votre galerie ou de le partager via le menu de partage standard d’Android — il va alors exactement là où vous l’envoyez.",
          "Si vous ajoutez de la musique à un film, le fichier audio choisi est copié dans le stockage temporaire de l’application pendant le montage, puis supprimé une fois terminé.",
        ],
      },
    ],
    permissions: {
      title: "Autorisations",
      rows: [
        { name: "Caméra", purpose: "Pour filmer vos clips de 30 secondes." },
        { name: "Micro", purpose: "Pour enregistrer le son avec vos clips." },
        {
          name: "Photos et vidéos / stockage",
          purpose: "Uniquement lorsque vous enregistrez un film terminé dans votre galerie. Blinkin ne lit jamais votre galerie.",
        },
        { name: "Vibreur", purpose: "Pour un léger retour haptique quand vous filmez ou touchez un bouton." },
      ],
      note: "Vous pouvez retirer une autorisation à tout moment dans les réglages de votre téléphone.",
    },
    sectionsAfter: [
      {
        title: "Sauvegardes et suppression des données",
        paragraphs: [
          "Vos vidéos sont exclues des sauvegardes automatiques dans le cloud : elles ne se retrouvent donc jamais sur un serveur. Cela signifie aussi que désinstaller l’application supprime définitivement tous les clips. Enregistrez dans votre galerie les films que vous voulez garder avant de désinstaller.",
          "Vous pouvez supprimer n’importe quel clip dans l’application à tout moment. Les clips supprimés sont effacés immédiatement de votre appareil.",
        ],
      },
      {
        title: "Tiers",
        paragraphs: [
          "L’application n’utilise aucun service tiers qui recevrait vos données. Lorsque vous téléchargez ou mettez à jour l’application, Google Play traite des informations conformément à la politique de confidentialité de Google.",
        ],
      },
      {
        title: "Enfants",
        paragraphs: [
          "Blinkin est conçu pour les adultes qui souhaitent garder des moments en famille. Il ne s’adresse pas aux enfants. Les vidéos que vous filmez de votre famille restent sur votre appareil et ne sont jamais collectées par nous.",
        ],
      },
      {
        title: "Modifications de cette politique",
        paragraphs: [
          "Si cette politique change, nous mettrons à jour cette page et la date ci-dessus. Comme l’application ne collecte aucune donnée, une modification ne peut concerner que son fonctionnement sur votre appareil.",
        ],
      },
    ],
    contact: {
      title: "Contact",
      textBefore: "Une question sur la confidentialité ? Écrivez à ",
      textAfter: ".",
    },
  },
};

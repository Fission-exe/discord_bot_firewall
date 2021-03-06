# Bot discord

## But
Lors du Coronavirus 2019, création d'un Bot discord rassemblant les 3 000 étudiants de mon [université / école d'ingé publique](https://utt.fr).
Nécessité de gérer les rôles des membres sur le discord, via une connexion extérieure. Ce bot dispose d'une interface web où les étudiants et profs se connectent via OAuth2 et se voient affectés les droits de lecture et d'écriture correspondant.

Egalement, gestion (création/suppression) des rôles et channels correspondant aux cours des étudiants, ainsi que création de salons vocaux à la volée (par une commande) et suppression quand plus personne n'est dedans.

Ce bot permet également d'exporter en hors ligne tout le contenu d'un channel en html, via [https://github.com/Tyrrrz/DiscordChatExporter](https://github.com/Tyrrrz/DiscordChatExporter) qui génère le html et wget/zip génèrent la version offline.

## Fonctionnalités

* Connexion par le [site Etu](https://etu.utt.fr) via OAuth2 puis on indique son id discord (utilisateur#discriminant)
* Attribue le rôle enseignant / étudiant
* Renomme les gens Prénom NOM (+ " - Branche NIVEAU" pour les étudiants)
* Pour les étudiants : attribution des UEs + rôle selon la branche
* Création des rôles inexistants, signalement de la création sur un channel (si le rôle n'existe pas, il est créé et l'utilisateur recommence la manip)
* Envoie un message automatique aux nouveaux qui rejoignent le serveur en leur disant d'aller sur le site
* Sur le site, une petite notice qui explique aux gens comment installer le logiciel
* Génération dynamique de channels vocaux et texte. L'utilisateur se place sur un channel vocal précis, et il est transporté dans un channel vocal créé (utile pour créer des salles de cours à la volée). Les channels texte seront supprimés quand la denrière personne aura quitté le vocal.
* Commandes :
    * `PREFIX addUE @role <categoryID> texte | vocal | lesDeux` qui crée un chan texte et vocal avec les permissions qui vont bien et dans la catégorie indiquée, la commande ne peut être exécutée que depuis un channel précis
    * `PREFIX delUE #channelTexteUE vocal | tout` qui supprime les deux channels d'une UE, ainsi que son rôle, la commande ne peut être exécutée que depuis un channel précis.
    * `PREFIX getNb @ROLE` qui affiche le nombre de personnes dans le role correspondant.
    * `PREFIX getRoles NombrePersonne` qui affiche la liste des rôle ne contenant que le nombre de personnes demandé
    * `PREFIX getZeroOne` qui affiche la liste des rôle ne contenant que 0 ou 1 personne.
    * `PREFIX assignLireEcrireBasiques channelID|categoryID @role oui|non|null` Permet d'assigner/supprimer/réinitialiser les permissions basiques de lecture écriture sur tous les channels d'une catégorie pour un rôle spécifique. Utile quand les permissions des channels ne sont pas synchro avec la catégorie, pour l'assignation de rôle de modération.
    * `PREFIX getUrl` Affiche les url du serveur web du bot, le lien d'invitation discord
    * `PREFIX export` Exporte tout le channel dans lequel la commande est tapée, dans un html lisible offline. Tout ceux ayant un rôle >= Enseignant peuvent taper cette commande n'importe où.
    * `PREFIX joinVocal` Pour les étudiants, crée ou rejoint le channel vocal de l'UE correspondant au channel texte, auquel seuls les étudiants de l'UE ont accès. Pour les enseignants, crée un amphi que tout le monde peut rejoindre. Si vous rajoutez `@NOM_UE` à la fin de la commande, crée un amphi visible seulement par vous, les étudiants de l'UE et les personnes de votre choix. Les channels créés par cette commandes sont effacés lorsque plus personne n'est dans le vocal créé.
    * `PREFIX listDynVoc`. Affiche tous les channels textes dans lesquels des vocaux ont été lancés, ainsi que leur catégorie. Utile pour savoir quand lancer une mise à jour du bot.
    * `PREFIX kickall` Expulse tous les membres du serveur. Commande réservée aux administrateurs. Expulse toute personne qui tape la commande sans être admin.
    * `PREFIX pin messageID`. Permet d'ajouter un message à la liste des messages pin (sans donner la permission `MANAGE_MESSAGES`).
    * `PREFIX unpin messageID`. Permet de supprimer un message de la liste des messages pin (sans donner la permission `MANAGE_MESSAGES`).
    * `PREFIX author` Affiche des informations sur l'auteur
    
## Installation

* Via [docker](https://hub.docker.com/repository/docker/ungdev/discord_bot_firewall)
* Manuellement
    * ``git clone https://github.com/larueli/discord_bot_firewall``
    * ``cd discord_bot_firewall``
    * Télécharger [l'outil d'export](https://github.com/Tyrrrz/DiscordChatExporter)
    * ``cp .env.dist .env`` et éditez-le
    * ``npm install``
    * ``node bin/www``

# Auteur

Je suis [Ivann LARUELLE](https://www.linkedin.com/in/ilaruelle/), étudiant-ingénieur en Réseaux et Télécommunications à l'[Université de Technologie de Troyes](https://www.utt.fr/), école publique d'ingénieurs.

N'hésitez pas à me contacter pour me signaler tout bug ou remarque. Je suis joignable à [ivann.laruelle@gmail.com](mailto:ivann.laruelle@gmail.com).

L'auteur du design/graphisme de la page web de connexion est un autre contributeur anonyme.
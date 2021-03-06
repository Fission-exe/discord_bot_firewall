const capitalize = require("capitalize");

module.exports.etuToDiscord = async function (
  membreSiteEtu,
  /** string */ discordUsername,
  /** 'module:"discord.js".Guild */ guild
) {
  /** On récupère son compte discord dans le serveur */
  const username = discordUsername.split("#")[0];
  const discriminant = discordUsername.split("#")[1];
  let membreDiscord = (await guild.members.fetch()).find(
    (user) =>
      user.user.username === username &&
      user.user.discriminator === discriminant
  );
  /** Si on l"a trouvé */
  if (membreDiscord) {
    let roles = (await guild.roles.fetch()).cache;
    /** Liste des id de rôles à attribuer */
    let rolesAAttribuer = [];
    /** On définit son pseudo */
    let pseudo =
      capitalize.words(
        membreSiteEtu/** string */ .firstName
          .toString()
      ) +
      " " +
      membreSiteEtu/** string */ .lastName
        .toString()
        .toUpperCase();
    if (/** bool */ membreSiteEtu.isStudent) {
      /** On ajoute le rôle étudiant */
      rolesAAttribuer.push(process.env.ROLE_ETUDIANT_ID);
      /** On définit un pseudo */
      pseudo +=
        " - " + /** string */ membreSiteEtu.branch + membreSiteEtu.level;
      /** On définit la liste des noms de rôles à attribuer (nom uvs + nom de branche) */
      let tableauChainesToRoles = /** Array<String> */ membreSiteEtu.uvs;
      tableauChainesToRoles.push(membreSiteEtu.branch);

      /** Pour tous les noms de rôle on récupère l'id du rôle et on l'ajoute à la liste des id de rôles à attribuer */
      for (let chaine of tableauChainesToRoles) {
        if (chaine === "") chaine = "vide";
        let role = roles.find(
          (role) => role.name.toUpperCase() === chaine.toString().toUpperCase()
        );
        if (role) rolesAAttribuer.push(role.id);
        else {
          /** Si le rôle n'existe pas, on le crée et on alerte sur le chan texte dédié au bot. */
          await guild.channels
            .resolve(process.env.CHANNEL_ADMIN_ID)
            .send(
              "Le rôle " +
                chaine +
                " va être créé pour l'utilisateur " +
                membreDiscord.user.tag +
                " " +
                pseudo
            );
          let roleCree = await guild.roles
            .create({
              data: { name: chaine.toString().toUpperCase() },
            })
            .catch(console.error);
          rolesAAttribuer.push(roleCree.id);
        }
      }
    } else rolesAAttribuer.push(process.env.ROLE_ENSEIGNANT_ID);
    /** Si pas étudiant, le seul rôle est le rôle prof */
    /** On applique le pseudo sur le compte */
    if (pseudo.length > 32) {
      await guild.channels
        .resolve(process.env.CHANNEL_ADMIN_ID)
        .send(
          " :warning: Le pseudo " +
            pseudo +
            " de l'utilisateur " +
            membreDiscord.user.tag +
            " est trop long. Vérifiez son pseudo."
        );
      pseudo = pseudo.slice(0, 32);
    }
    membreDiscord.setNickname(pseudo).catch(console.error);
    /** On applique les rôles */
    membreDiscord.roles.set(rolesAAttribuer).catch(console.error);
    /** On affiche un message */
    return "Vos rôles ont été affectés. Si d'ici quelques heures rien ne change dans votre compte, merci de nous contacter.<br><br><b>Vous pouvez maintenant fermer cette fenêtre et retourner sur Discord.</b>";
  } else
  /** SI utilisateur non trouvé dans le serveur, message */
    return "Utilisateur discord non trouvé dans le serveur. Avez-vous bien rejoint le serveur Discord ? <a href='/'>Revenir au départ</a>";
};

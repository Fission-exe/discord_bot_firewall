let router = require("express").Router();
let utils = require("../utils");
let assignFromWeb = require("../assignFromWeb");
const axios = require("axios");
let httpBuildQuery = require("http-build-query");

module.exports = function (/** module:"discord.js".Client" */ client) {
  router.get("/", function (req, res) {
    /** On vérifie qu'on a toutes les infos du formulaire */
    if (req.query.site_etu_token && req.query.discordUsername) {
      if (req.query.checkRGPD !== "on")
        res.send(
          "Vous n'avez pas coché la case de consentement RGPD. Vos données n'ont pas été traitées. <a href='/'>Revenir au départ et recommencer !</a>"
        );
      else {
        let donnees = {
          access_token: req.query.site_etu_token,
        };

        /** On récupère les données de l'utilisateur sur le site etu */
        axios
          .get(
            utils.baseUrl +
              "/api/public/user/account?" +
              httpBuildQuery(donnees)
          )
          .then(async function (response) {
            /** L'utilisateur du site etu dans membreSiteEtu */
            let membreSiteEtu = response.data.data;
            /** Si on arrive à savoir si l'user est étu ou pas */
            if (typeof membreSiteEtu.isStudent !== "undefined") {
              let guild = client.guilds.cache.get(process.env.SERVER_ID);
              res.send(
                await assignFromWeb.etuToDiscord(
                  membreSiteEtu,
                  req.query.discordUsername,
                  guild
                )
              );
            } else res.send(utils.texteBug);
            /** Si le token n'a pas pu être validé (tentative de hacking, ...), affiche un message */
          })
          .catch(function (error) {
            console.log(error.message);
            res.send(utils.texteBug);
          });
      }
    } else {
      /** Si tous les champs n'ont pas pu être trouvés, affiche un message */
      res.send(
        "Le formulaire est incomplet. <a href='/'>Revenir au départ</a>"
      );
    }
  });

  return router;
};

module.exports = async function (
  /** module:"discord.js".Message */ msg,
  /** Array<String> */ parametres
) {
  if (parametres.length < 3)
    msg
      .reply(" :warning: Vous devez spécifier l'ID du message à pin.")
      .catch(console.error);
  else {
    let message = await msg.channel.messages.fetch(parametres[2]);
    if (!message)
      msg
        .reply(
          " :warning: Votre message n'a pas pu être trouvé dans ce channel. Vous devez spécifier l'ID du message."
        )
        .catch(console.error);
    else message.pin().catch(console.error);
  }
};

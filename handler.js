const venom = require('venom-bot');

(async () => {
  venom
  .create({
    session: 'Suporte Som',
    multidevice: true 
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

  const start = (client) => {
    const commandToActiveBot = 'SomPVNI';
    const people = {}
    client.onMessage((message) => {
      if (message.body === commandToActiveBot) {
        people.name = message.notifyName
        people.number = message.sender.id
        
        client.sendText(message.sender.id, 'Olá escreva em apenas um texto o que aconteceu: \n ' + 
          ' Exemplo: O cabo do baixo não está funcionando. \n' + 
          ' Após enviar você receberá uma mensagem dizendo que a sua solicitacão foi registrada com sucesso!')
          .catch((err) => {
            console.error(err);
          });

      }

      if( message.body !== commandToActiveBot && message.notifyName === people.name && message.from === people.number ) {
        client.sendText(message.from, 
          'Obrigado por reportar, sua mensagem será encaminhada aos responsáveis. \n'
          + `Caso tenha interesse em enviar um novo report digite: ${commandToActiveBot}`)
          .catch((err) => {
            console.error(err);
          });
        const groupId = '120363123407117234@g.us'
        client.sendText(groupId, `Novo report:\n[${formatFrom(people.number)}] - ${people.name}: \n ${message.body}`)
          .catch((err) => {
            console.error(err);
          });
        delete people.name;
        delete people.number;
      }
    });
  }

  const formatFrom = (from) => {
    return from.split('@')[0].slice(2)
  }

})();

module.exports = {
  name: 'clear',
  description: 'Borra mensajes en el canal',
  async execute(message, args) {
    if (!message.member.permissions.has('ManageMessages'))
      return message.reply('No tienes permisos para usar este comando.');

    const amount = parseInt(args[0]);
    if (!amount || amount < 1 || amount > 100) 
      return message.reply('Debes escribir un número entre 1 y 100.');

    try {
      await message.channel.bulkDelete(amount, true);
      message.channel.send(`Se han borrado ${amount} mensajes.`)
        .then(msg => setTimeout(() => msg.delete(), 5000));
    } catch (error) {
      message.channel.send('No pude borrar los mensajes.');
    }
  }
};

const { MessageAttachment } = require("discord.js");
const Discord = require("discord.js");

var Jimp = require('jimp'); //Gereken Modül: jimp

exports.run = async (client, message, args) => {
    var user = message.mentions.users.first() || message.author;
    if (!message.guild) user = message.author;
    message.react("<:okeee:981900426590957598>"); 
    message.channel.send(`Fotoğraf işleniyor, lütfen bekleyin...`).then(m => m.delete({timeout: 2000})); //Dcs Ekibi

Jimp.read('https://cdn.discordapp.com/attachments/617672562281021459/617793751527718923/adamol_icin.jpg', (err, image) => {
    image.resize(301, 168)
    //image.greyscale()
    //image.gaussian(3)
    Jimp.read(user.avatarURL({ format: 'png',}), (err, avatar) => { //Dcs Ekibi
        avatar.resize(100, 100)
        image.composite(avatar, 70, 10).write(`./img/rip/${client.user.id}-${user.id}.png`);
        setTimeout(function() {
          message.channel.send(new MessageAttachment(`./img/rip/${client.user.id}-${user.id}.png`));
        }, 1000);
    });

});
}
exports.conf = {
 aliases: []
};
//Dcs Ekibi
exports.help = {
 name: 'adamol'
};
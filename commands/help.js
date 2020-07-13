const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Lists the available METATRON bot commands.',
    async execute(msg, args) {
      var embedResponse = {
        color: 0x461F23,
        title: 'METATRON Commands',
        fields: [
            {
                name: '>+help',
                value: "Lists the available METATRON bot commands.",
                inline: true
            },
            {
                name: '>+latest',
                value: 'Retrieves a summary of the most recent Vast Error update.',
                inline: true
            },
        ]
      };

      msg.channel.send({ embed: embedResponse });
    },
  };
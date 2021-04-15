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
            },
			{
              name: '>+hemo _[HEXCODE]_',
              value: "Returns a detailed hemospectrum analysis of a given hex code."
            },
            {
                name: '>+latest _[ve|tt]_',
                value: 'Retrieves a summary of the most recent update to a given story; by default, returns the most recent Vast Error update.',
            },
			{
                name: '>+verandom',
                value: 'Retrieves a random Vast Error page.',
            },
        ]
      };

      msg.channel.send({ embed: embedResponse });
    },
  };
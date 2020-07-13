const axios = require('axios');
const Discord = require('discord.js');

module.exports = {
    name: 'latest',
    description: 'Retrieves latest Vast Error update.',
    async execute(msg, args) {
      // Grabbing latest page data from DCRC API
      var latest = await axios.get(`https://www.deconreconstruction.com/api/vasterror/pages/latest`);
      latest = latest.data;

      // Defining length, date, and bookends
      const date = new Date(latest[0].date);
      const length = latest.length;
      const first = latest[0].pageNumber;
      const last = latest[latest.length - 1].pageNumber;
      const panelExp = /https\:\/\/cdn\.deconreconstruction\.com\/vasterror\/panels\/[0-9_]+\.gif/g
      var panel = latest[0].body.match(panelExp);
      if (panel.length >= 1) {
        panel = panel[0];
      } else {
        panel = "";
      }

      // Defining embed output
      var embedResponse = {
        color: 0x6B8400,
        title: `${date.toLocaleDateString()} Update — ${first != last ? 'Pgs. ' + first + "-" + last : 'Pg. ' + first} (${length} ${length > 1 ? 'pages' : 'page'})`,
        url: `https://www.deconreconstruction.com/vasterror/${first}`,
        author: {
          name: 'Vast Error | Deconreconstruction',
          icon_url: 'https://www.deconreconstruction.com/public/img/favicon.png',
          url: `https://www.deconreconstruction.com/vasterror/${first}`
        },
        image: {
          url: panel,
        },
      };

      msg.channel.send({ embed: embedResponse });
    },
  };
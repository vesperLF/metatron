const axios = require('axios');
const Discord = require('discord.js');

module.exports = {
    name: 'verandom',
    description: 'Retrieves a random Vast Error page.',
    async execute(msg, args) {
      // Grabbing latest page data from DCRC API
      var count = await axios.get(`https://api.deconreconstruction.com/pages/count?slug_contains=vast-error`);
      count = count.data;
	  
	  var num = Math.floor(Math.random() * (count - 1) + 1)
	  
	  
	  var page = await axios.get(`https://api.deconreconstruction.com/pages?slug_contains=vast-error&pageNumber=${num}`);
	  page = page.data[0]
	  //page = page[0]
	  
      // Defining length, date, and bookends
      const date = new Date(page.published_at);
      const panelExp = /https\:\/\/cdn\.deconreconstruction\.com\/vasterror\/panels\/[0-9_]+\.(gif|png)/g
      var panel = page.bodyStd.match(panelExp);
	  if (panel.length > 0)
	  {
		  panel = panel[0]
	  } else {
		  panel = ''
	  }


      // Defining embed output
      var embedResponse = {
        color: 0x6B8400,
        title: `(${date.toLocaleDateString()}) — ${page.command}`,
        url: `https://www.deconreconstruction.com/vasterror/${num}`,
        author: {
          name: 'Vast Error | Deconreconstruction',
          icon_url: 'https://www.deconreconstruction.com/public/img/favicon.png',
          url: `https://www.deconreconstruction.com/vasterror/${num}`
        },
        image: {
          url: panel,
        },
      };

      msg.channel.send({ embed: embedResponse });
    },
  };
const axios = require('axios');

module.exports = {
    name: 'latest',
    description: 'Retrieves a summary of the most recent Vast Error update.',
    async execute(msg, args) {
      // Grabbing latest page data from DCRC API
      /*var pages = await axios.get(`https://api.deconreconstruction.com/pages?slug_contains=vast-error&_sort=pageNumber:desc`);
      pages = pages.data;*/
	  
	  var story = 'vast-error'
	  var loc = 'vasterror'
	  const imgEx = /http.*\.(png|gif)/g
	  
	  if (args[0] === 'tt' || args[0] === 'thaumatrope' || args[0] === 'syzygy') {
		story = 'thaumatrope'
		loc = 'thaumatrope/syzygy'
	  }
	  
	  const { data:latest } = await axios.get(`https://api.deconreconstruction.com/pages/latest/all?slug_contains=${story}`)

      // Defining length, date, and bookends
      const date = new Date(latest[0].published_at);
      const length = latest.length;
      const first = latest[0].pageNumber;
      const last = latest[latest.length - 1].pageNumber;
	  var panelExp = /https\:\/\/cdn\.deconreconstruction\.com\/vasterror\/panels\/[0-9_]+\.(gif|png)/g
	  if (story == 'thaumatrope') {
		panelExp = /https\:\/\/cdn\.deconreconstruction\.com\/thaumatrope\/syzygy\/panels\/[0-9_]+\.(gif|png)/g
	  }
      var panel
	  panel = latest[0].bodyStd.match(panelExp);
      if (panel != null && panel.length > 0) {
        panel = panel[0];
      } else {
        panel = "";
      }

      // Defining embed output
      var embedResponse = {
        color: 0x6B8400,
        title: `${date.toLocaleDateString()} Update — ${first != last ? 'Pgs. ' + first + "-" + last : 'Pg. ' + first} (${length} ${length > 1 ? 'pages' : 'page'})`,
	  url: `https://www.deconreconstruction.com/${loc}/${first}`,
        author: {
          name: 'Vast Error | Deconreconstruction',
          icon_url: 'https://www.deconreconstruction.com/public/img/favicon.png',
          url: `https://www.deconreconstruction.com/$loc}/${first}`
        },
        image: {
          url: panel,
        },
      };

      msg.channel.send({ embed: embedResponse });
    },
  };
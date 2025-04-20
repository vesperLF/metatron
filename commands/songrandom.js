const songs = [
  {
    color: 0xFF01FF,
    title: `Deep Sea Trouble`,
    url: `https://vasterror.bandcamp.com/track/deep-sea-trouble`
    author {
      'Deep Sea Trouble | Vast Error',
      icon_url: 'https://f4.bcbits.com/img/a2421212534_3.jpg',
      url: `https://vasterror.bandcamp.com/track/deep-sea-trouble`
    },
    image: {
      'https://f4.bcbits.com/img/a2421212534_10.jpg',
    },
  },
  {
    color: 0xFF01FF,
    title: `Mind In The Shutter`,
    url: `https://vasterror.bandcamp.com/track/mind-in-the-shutter`
    author {
      'Mind In The Shutter | Vast Error',
      icon_url: 'https://f4.bcbits.com/img/a2421212534_3.jpg',
      url: `https://vasterror.bandcamp.com/track/mind-in-the-shutter`
    },
    image: {
      'https://f4.bcbits.com/img/a2421212534_10.jpg',
    },
  },
  {
    color: 0xFF01FF,
    title: `Royale With Cheese`,
    url: `https://vasterror.bandcamp.com/track/royale-with-cheese`
    author {
      'Royale With Cheese | Vast Error',
      icon_url: 'https://f4.bcbits.com/img/a2421212534_3.jpg',
      url: `https://vasterror.bandcamp.com/track/royale-with-cheese`
    },
    image: {
      'https://f4.bcbits.com/img/a2421212534_10.jpg',
    },
  },
];

module.exports = {
    name: 'songrandom',
    description: 'Retrieves a random Vast Error song.',
    async execute(msg, args) {
      var count = songs.length;
      var num = Math.floor(Math.random() * (count - 1));

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

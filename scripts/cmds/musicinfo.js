const axios = require('axios');
 
module.exports = {
  config: {
    name: "musicinfo",
    aliases: [],
    version: "1.0",
    author: "SIDDIK",
    countDown: 10,
    role: 0,
    shortDescription: "get itunes data",
    longDescription: "search and get itunes info",
    category: "study",
    guide: "{pn} {{<name>}}"
  },
 
  onStart: async function ({ message, args }) {
    const name = args.join(" ");
    if (!name)
      return message.reply(`Invalid name`);
    else {
      const BASE_URL = `https://api.popcat.xyz/itunes?q=${name}`;
      try {
        let res = await axios.get(BASE_URL);
 
        let name = res.data.name;
        let artist = res.data.artist;
        let album = res.data.album;
        let release_date = res.data.release_date;
        let price = res.data.price;
        let length = res.data.length;
        let genre = res.data.genre;
        let url = res.data.url;
        let img = res.data.thumbnail;
 
        const form = {
          body: `===「 Music Info 」===`
            + `\n\nName: ${name}`
            + `\n\nArtist: ${artist}`
            + `\n\nAlbum: ${album}`
            + `\n\nRelease date: ${release_date}`
            + `\n\nprice: ${price}`
            + `\n\nlength: ${length}`
            + `\n\nGenre: ${genre}`
            + `\n\nUrl: ${url}`
        };
        if (img)
          form.attachment = await global.utils.getStreamFromURL(img);
        message.reply(form);
      } catch (e) {
        message.reply(`Not Found`);
      }
    }
  }
};

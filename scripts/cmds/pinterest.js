const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "pinterest",
    aliases: ["pin"],
    version: "1.0.2",
    author: "SIDDIK",
    role: 0,
    countDown: 50,
    shortDescription: {
      en: "Search for images on Pinterest"
    },
    longDescription: {
      en: ""
    },
    category: "image",
    guide: {
      en: " {prefix} Pinterest <nom de l'image recherché> - <nombre d' image>"
    }
  },

  onStart: async function ({ api, event, args, usersData }) {
    try {
      const userID = event.senderID;

      const keySearch = args.join(" ");
      if (!keySearch.includes("-")) {
        return api.sendMessage(`╰‣ 𝐒𝐞𝐚𝐫𝐜𝐡𝐢𝐧𝐠 𝐈𝐦𝐚𝐠𝐞 𝐏𝐥𝐞𝐚𝐬𝐞 𝐖𝐚𝐢𝐭 🔍 
:${this.config.guide.en}`, event.threadID, event.messageID);
      }
      const keySearchs = keySearch.substr(0, keySearch.indexOf('-')).trim();
      const numberSearch = parseInt(keySearch.split("-").pop().trim()) || 6;

      const res = await axios.get(`https://celestial-dainsleif-v2.onrender.com/pinterest?pinte=${encodeURIComponent(keySearchs)}`);
      const data = res.data;

      if (!data || !Array.isArray(data) || data.length === 0) {
        return api.sendMessage(`❌𝗔𝘂𝗰𝘂𝗻𝗲 𝗶𝗺𝗮𝗴𝗲 𝗮 𝗲́𝘁𝗲́ 𝘁𝗿𝗼𝘂𝘃𝗲́𝗲..🍀"${keySearchs}"𝘃𝗲𝘂𝗶𝗹𝗹𝗲𝘇 𝗿𝗲𝗰𝗵𝗲𝗿𝗰𝗵𝗲𝘇 𝗮𝘂𝘁𝗿𝗲 𝗰𝗵𝗼𝘀𝗲...📌`, event.threadID, event.messageID);
      }

      const imgData = [];

      for (let i = 0; i < Math.min(numberSearch, data.length); i++) {
        const imageUrl = data[i].image;

        try {
          const imgResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
          const imgPath = path.join(__dirname, 'cache', `${i + 1}.jpg`);
          await fs.outputFile(imgPath, imgResponse.data);
          imgData.push(fs.createReadStream(imgPath));
        } catch (error) {
          console.error(error);
          // Handle image fetching errors (skip the problematic image)
        }
      }

      await api.sendMessage({
        attachment: imgData,
        body: `╰‣ 𝐇𝐞𝐫𝐞'𝐬 𝐘𝐨𝐮𝐫 𝐒𝐞𝐚𝐫𝐜𝐡𝐞𝐝 𝐈𝐦𝐚𝐠𝐞 \n\n╰‣ 𝐓𝐨𝐭𝐚𝐥𝐥 𝐈𝐦𝐚𝐠𝐞 𝐂𝐨𝐮𝐧𝐭..➪[ ${imgData.length} ]\n\n╰‣ 𝐈𝐦𝐚𝐠𝐞 𝐈𝐧𝐟𝐨..➪"${keySearchs}"\n\n━━[𝐒𝐊_𝐒𝐈𝐃𝐃𝐈𝐊_⓿❼]━━➣`
      }, event.threadID, event.messageID);

      await fs.remove(path.join(__dirname, 'cache'));
    } catch (error) {
      console.error(error);
      return api.sendMessage(`❌𝑼𝒏𝒆 𝒆𝒓𝒓𝒆𝒖𝒓 𝒔'𝒆𝒔𝒕 𝒑𝒓𝒐𝒅𝒖𝒊𝒕𝒆. 𝑽𝒆𝒖𝒊𝒍𝒍𝒆𝒛 𝒓𝒆́𝒆𝒔𝒔𝒂𝒚𝒆𝒛 𝒑𝒍𝒖𝒔 𝒕𝒂𝒓𝒅. 𝑴𝒆𝒓𝒄𝒊🍀`, event.threadID, event.messageID);
    }
  }
};

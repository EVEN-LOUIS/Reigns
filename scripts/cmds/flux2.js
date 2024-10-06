const axios = require("axios");

async function generateImage(prompt, model) {
  try {
    const response = await axios({
      method: "get",
      url: `https://milanbhandari.onrender.com/flux`,
      params: {
        inputs: prompt,
        model,
      },
      responseType: 'stream'
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  config: {
    name: "flux2",
    aliases: ["Flux2"],
    version: "1.3",
    author: "SK-SIDDIK-KHAN",
    longDescription: {
      en: "Generate images using the Flux API with selectable models."
    },
    category: "gen",
    guide: {
      en: "{pn} <prompt> --model <number>"
    },
  },

  onStart: async function ({ message, args, event }) {
    const prompt = args.join(" ");
    message.reaction("🕑", event.messageID);

    if (!prompt) {
      return message.reply("🔰ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ ᴘʀᴏᴍᴘᴛ🔰");
    }

    const modelMatch = prompt.match(/--model (\d+)/);
    const model = modelMatch ? modelMatch[1] : '1'; // Default to model 1 if not specified

    try {
      const mj = await generateImage(prompt, model);
      message.reply({ attachment: mj });
      message.reaction("✅", event.messageID);
    } catch (error) {
      console.error(error);
      message.reaction("❌", event.messageID);
      return message.reply("Failed to generate image.");
    }
  },
      }

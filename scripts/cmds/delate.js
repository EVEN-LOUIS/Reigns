module.exports = {
  config: {
    name: "delate",
    aliases: ["del"],
    author: "SK-SIDDIK-KHAN",
    role: 2,
    category: "system"
  },
 
  onStart: async function ({ api, event, args }) {
    const fs = require('fs');
    const path = require('path');
 
    const fileName = args[0];
 
    if (!fileName) {
      api.sendMessage("Please provide a file name to delete.", event.threadID);
      return;
    }
 
    const filePath = path.join(__dirname, fileName);
 
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        api.sendMessage(`𝙵𝚄𝙲𝙺 𝚈𝙾𝚄  𝚈𝙾𝚄 𝙰𝚁𝙴 𝚃𝚈𝙿𝙴 𝚆𝚁𝙾𝙽𝙶${fileName}.𝙵𝙸𝙻𝙴 𝙽𝙰𝙼𝙴`, event.threadID);
        return;
      }
      api.sendMessage(`𝙲𝙼𝙳 𝙷𝙰𝚂 𝙱𝙴𝙴𝙽 𝙳𝙴𝙻𝙰𝚃𝙴 ➪ ( ${fileName} ) 𝚂𝚄𝙲𝙲𝙴𝚂𝚂𝙵𝚄𝙻𝙻𝚈`, event.threadID);
    });
  }
};
 

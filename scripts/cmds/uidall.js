const { GoatWrapper } = require("fca-liane-utils");
module.exports = {
  config: {
    name: 'Uidall',
    author: 'SIDDIK',
    version: '1.0.0',
    role: 2,
    category: 'user',
    guide: { 
      en: '{pn}'
    },
    longDescription: {
      en: 'Get All Group Members UID'
    },
    inbox: true
  },
  onStart: async function ({ api, event, args }) {
    const threadID = event.threadID;
    const { participantIDs, userInfo } = await api.getThreadInfo(threadID);
    participantIDs.sort();
    const page = parseInt(args[0]) || 1;
    const participantsPerPage = 30;
    const startIdx = (page - 1) * participantsPerPage;
    const endIdx = startIdx + participantsPerPage;
    const pageParticipants = participantIDs.slice(startIdx, endIdx);
    let logMessage = `╰➤ Members (Page ${page}):\n`;
    pageParticipants.forEach((participantID, index) => {
      const user = userInfo.find((u) => u.id === participantID);
      logMessage += `\n${index + 1}.${user ? user.name : 'N/A'}: ${participantID}\n`;
    });
 
    api.sendMessage(logMessage, event.threadID);
  }
 
};
const wrapper = new GoatWrapper(module.exports); wrapper.applyNoPrefix({ allowPrefix: true });

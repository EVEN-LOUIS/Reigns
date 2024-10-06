const { GoatWrapper } = require("fca-liane-utils");
module.exports = {
	config: {
		name: "font",
		version: "1.0",
		author: "SIDDIK", // Time to wait before executing command again (seconds)
		role: 0,
		category: "text",
		guide: {
			vi: "Not Available",
			en: "fonts + (Message You Want To Get)"
		} 
	},
 
	onStart: async function ({ api, args, event }) {
	var say = args.join(" ")
	if (!say) api.sendMessage("Please enter a message", event.threadID, event.messageID)
	else api.sendMessage(`${say}`, event.threadID, event.messageID);
	}
 
};
const wrapper = new GoatWrapper(module.exports); wrapper.applyNoPrefix({ allowPrefix: true }); 

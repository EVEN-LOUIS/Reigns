module.exports = {
	config: {
		name: "off",
		version: "1.0",
		author: "SIDDIK",
		countDown: 45,
		role: 2,
		shortDescription: "Turn off bot",
		longDescription: "Turn off bot",
		category: "owner",
		guide: "{p}{n}"
	},
	onStart: async function ({event, api}) {
		api.sendMessage("📴Successfully Turned Off Archives System ✅",event.threadID, () =>process.exit(0))}
};

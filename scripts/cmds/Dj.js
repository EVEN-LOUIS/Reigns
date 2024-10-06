module.exports.config = {
	name: "dj",
        version: "1.0.1",
        role: 0,
	author: "SIDDIK",
	description: "",
        category: "media",
	usages: "dj",
	countDowns: 5,
	dependencies: {
		"request":  ""
	}
};
 
module.exports.onStart = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies}) => {
 
const axios = require('axios');
 
const request = require('request');
 
const fs = require('fs-extra');
 
   var siddikkhan =["•Dj Create By Siddik 〽️•"];
 
  var siddik = siddikkhan[Math.floor(Math.random() * siddikkhan.length)];
 
  var link = [
 
  "https://drive.google.com/uc?id=1C4XLaxrHJwcwT-uEMdzZb4Y-oQ98nS0p",
   
   "https://drive.google.com/uc?id=1B9VwVFRw-d2r__HTyGxfin3r6QFdGN9K",
   
   "https://drive.google.com/uc?id=1B9gArnCkpo1801TjiSAuvlVtAdIQP57k",
   
   "https://drive.google.com/uc?id=1C0iPpXrTWvBOqkKDEEwSo9i7u_9AVyg8",
   
   "https://drive.google.com/uc?id=1BDIcusE7B9jELmr6lvciFP-puWfy3WXs",
   
   "https://drive.google.com/uc?id=1C04Pul6GTyzfOQlRLmDk8eGK9z-q3BmA",
   
   "https://drive.google.com/uc?id=1BNH2gUTtD5zBaTnMDY08pQ4CIGq3Lriw",
   
   "https://drive.google.com/uc?id=1BUYSSL8poh9icrlp3YOTV5IiYrn7iHAW",
   
   "https://drive.google.com/uc?id=1BwqorvYxglPa6vptXlLXpI92g3LZBG9C",
   
   "https://drive.google.com/uc?id=1BbVCsUECiAcZBG95CYuobYpg-wTNtrTL",
   
   "https://drive.google.com/uc?id=1BSnn0ku6C0DYdlFtnErqKDOuAWhdqmBJ",
   
   "https://drive.google.com/uc?id=1BYSqt8wKUkZnULVq_W-5O2jC4O-mfLSA",
 
 ];
     var callback = () => api.sendMessage({body:`「 ${siddik} 」`,attachment: fs.createReadStream(__dirname + "/Siddik/SIDDIK.mp3")}, event.threadID, () => fs.unlinkSync(__dirname + "/Siddik/SIDDIK.mp3"));    
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/Siddik/SIDDIK.mp3")).on("close",() => callback());
   };
 

const prompts = require('prompts');
const enterSettingsQuestions = require("./upload/questions");
const settings = require("./settings");
const getFiles = require("./upload/files");
const runAsync = async () => {
    try{
        
        const askQuestions = async() => {
            const response = await prompts(enterSettingsQuestions.questions);
            settings.options.apiHost = response.apiHost;
            settings.options.clientId = response.clientId; 
            settings.options.clientSecret = response.clientSecret;
            settings.save(); 

            return response;
        };
        settings.load();
        
        if(!settings.exists() || !settings.valid()){
            await askQuestions(); 
        }
        
        const client = require("./upload/oauthClient");
        console.log("Login:");
        await client.authorize();
        console.log("Authorized.")
        const fileCollectiton = getFiles();
        console.log("Upload files:");
        await client.uploadJs(fileCollectiton);
        console.log("Done.")
    }catch(err){
        console.error(err);
    }
};

module.exports = runAsync
const settings = require("./cmds/settings");
const prompts = require('prompts');
 
const service = {
    lifeCycle: {

    },

    documentTypes: {
        upload: async () => {
            const uploadDocumentTypesAsync = require("./cmds/documentTypes");
            await uploadDocumentTypesAsync();
        }
    },
    scripts: {
        upload: async () => {
            const uploadAsync = require("./cmds/uploadScripts");
            await uploadAsync(); 
        }
    }
};

async function confirmOptionsAsync(){
    if(settings.exists()){
        settings.load(); 
    }else {
        if(!settings.valid()){
            await settings.askQuestionsAsync(); 
        } 
    }

    const confirmQuestions = await prompts({
        type: 'confirm',
        name: "continue",
        message: `Use: "${settings.options.apiHost}", continue?` 
    }); 

    if(!confirmQuestions.continue){
        console.log("Exiting");
        return false;
    }    
    return true;
}

async function everythingAsync(){
    await service.documentTypes.upload(); 
    await service.scripts.upload(); 
}

/* to-do - commmand line to for other options.
*/
(async function(){
    //to-do check if document types are needed in current upload session 
    //await service.documentTypes.upload(); 
    //to-do chek if scripts are needed in current upload session 
    //await service.scripts.upload(); 
    if(await confirmOptionsAsync()){

        await everythingAsync();
    }
    
     
}());

module.exports = service;
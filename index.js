const service = {
    scripts: {
        upload: async () => {
            const upload = require("./cmds/uploadScripts");
            await upload(); 
        }
    }
};

/* to-do - commmand line to for other options.
*/
(async function(){
    const uploadDocumentType = async () => {
        const uploadDocumentTypes = require("./cmds/documentTypes");
        await uploadDocumentTypes();
    };
    const uploadScripts = async () => {
        const upload = require("./cmds/uploadScripts");
        await upload(); 
    };

    await uploadDocumentType();
    await uploadScripts();
    
}());

module.exports = service;
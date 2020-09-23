const runAsync = async () => {
    try{
        const client = require("./upload/oauthClient");
        console.log("Login:");
        await client.authorize();
        console.log("Authorized.")
        console.log("Create/Edit Document Type:");
        await client.putDocumentTypes();
        console.log("Done.")
    }catch(err){
        console.error(err);
        throw err;
    }
};

module.exports = runAsync
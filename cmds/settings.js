const fs = require('fs');
const prompts = require('prompts');
// const stagingKey = ".staging";
// const productionKey = ".production"; 
const parseArgs = require('minimist')(process.argv.slice(2))
//console.log(parseArgs);
const internal = {
    config : parseArgs.config || "staging" 
};

const options = {
    apiHost: "",
    clientId: "",
    clientSecret: ""
};

function getConfigPath(){
    const configFilePath = `./upload-config.${internal.config}.json`;

    return configFilePath;
}
function exists(){
    const path = getConfigPath(); 
    const exists = fs.existsSync(path);

    if(!exists){
        console.warn(`${path} does not exist`);
    }
    return exists;
}

function valid(){
    return options.apiHost && options.clientId && options.clientSecret; 
}

function load(){
    if(exists()){
        const read = fs.readFileSync(getConfigPath());
        const data = read.toString();
        const json = JSON.parse(data,'utf8');
        options.apiHost = json.apiHost;
        options.clientId = json.clientId;
        options.clientSecret = json.clientSecret;
    }

    return options; 
}
function save(){
    fs.writeFileSync(getConfigPath(), JSON.stringify(options, undefined, 4));
    //fs.writeFile(getConfigPath(), JSON.stringify(options, undefined, 4), saved);
}

function saved(err){
    if (err) {
        console.log('There has been an error saving your configuration data.');
        console.log(err.message);
        return;
    }
    console.log('Configuration saved successfully.');
}
async function askQuestions(){
    const enterSettingsQuestions = require("./upload/questions");
    const response = await prompts(enterSettingsQuestions.questions);
    options.apiHost = response.apiHost;
    options.clientId = response.clientId; 
    options.clientSecret = response.clientSecret;
    save(); 

    return response;
}

module.exports = {
    options,
    exists,
    valid,
    load,
    save,
    askQuestionsAsync: askQuestions 
}


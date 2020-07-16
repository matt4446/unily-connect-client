const fs = require('fs');

const stagingKey = ".staging";
const productionKey = ".production"; 
const internal = {
    staging: true
};

const options = {
    apiHost: "",
    clientId: "",
    clientSecret: ""
};

function getConfigPath(){
    const configFilePath = `./upload-config${internal.staging ? stagingKey : productionKey}.json`;

    return configFilePath;
}
function exists(){
    return fs.existsSync(getConfigPath());
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

module.exports = {
    options: options,
    exists: exists,
    valid: valid,
    load: load,
    save: save 
}
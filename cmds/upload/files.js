const fs = require('fs');
const path = require("path");
let file = undefined; 

function read(){
    const distFolder = "./dist";
    const files = fs.readdirSync(distFolder);
    const package = mainApp();
    
    const versionFiles = {
        "path" : `packages/${package.name}/__version.js`,
        "content": `/*** Uploaded On: ${new Date().toUTCString()}
${addVersion(package)}
***/`
    }; 
    const most = files.map((file, index) => {
        const fileContent = fs.readFileSync(`${distFolder}/${file}`, 'utf8');
        const content = fileContent.toString();
        return {
            "path" : `packages/${package.name}/${file}`,
            "content" : content //`function blank(){}`//content
        }
    });
    most.push(versionFiles)
    return most; 
}
function addVersion(package){
    const version = {
        
        package: `${package.name}`, 
    }; 

    add("version");
    add("author"); 
    add("license");
    add("repository");
    add("url");
    add("bugs"); 

    return JSON.stringify(version, null, 3); 

    function add(key){
        if(package[key]){
            version[key] = package[key]; 
        }
    }
}

function mainApp(){
    if(file){
        return file; 
    }

    const location  = "./package.json";
        
    if(fs.existsSync(location)){
        file = JSON.parse(fs.readFileSync(location, "utf8").toString()); 
    }
    return file;
}

module.exports = read;
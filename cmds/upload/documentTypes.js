const fs = require('fs');
//const path = require("path");

function read(){
    const folder = "./documentTypes";
    if(!fs.existsSync(folder)){
        return [];
    }

    const files = fs.readdirSync(folder);
    
    const documentTypes = files.sort(function(a,b){
        return a < b ? -1 : 1
    }).map((file, index) => {
        const fileContent = fs.readFileSync(`${folder}/${file}`, 'utf8');
        const content = JSON.parse(fileContent.toString());
        return content; 
    });
    return documentTypes; 
}

module.exports = read;
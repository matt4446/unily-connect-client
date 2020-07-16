function mainApp(){
    if(file){
        return file; 
    }

    let dir = __dirname.split(path.sep);

    while(dir.length && !file)
    { 
        const hunt = dir.join(path.sep);
        const location  = path.join(hunt, "package.json");
        
        if(fs.existsSync(location)){
            file = JSON.parse(fs.readFileSync(location, "utf8").toString()); 
        }
        dir.length--; 
    }
    return file;
}
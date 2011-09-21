var nodefs = require('node-fs'),
fs  = require('fs'),
path = require('path'),
prettyjson = require('./prettyjson');


exports.file = function(source)
{
    nodefs.mkdirSync(path.dirname(source), 0755, true);
    
    var config = {}, timeout;
    
    
    try
    {
        config = JSON.parse(fs.readFileSync(source, 'utf8'));
    }
    catch(e)
    {
    }
    
    function value(key, value)
    {
        var chain = key.split(':'), prop, current = config, prev = config;
        
        while(chain.length)
        {
            prop = chain.shift();
            prev = current;
            
            if(!current[prop] && chain.length > 0) current[prop] = {};
            
            current = current[prop];
        }
        
        if(arguments.length == 1) return current;
        
        saveLater();
        
        return prev[prop] = value;
    }
    
    function saveNow()
    {
        fs.writeFileSync(source, prettyjson(JSON.stringify(config)));
        console.log(source);
    }
    
    function saveLater()
    {
        clearTimeout(timeout);
        timeout = setTimeout(saveNow, 500);
    }
    
    return {
        get: value,
        set: value
    }
};
exports.decode = function(string)
{
    return JSON.parse(string);
}

exports.encode = function(config)
{
    return JSON.stringify(config, null, 2);
}
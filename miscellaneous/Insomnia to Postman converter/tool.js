var har2postman = require('har2postman');
var fs = require('fs')

var includeTests = true;

stringifiedHarFile = fs.readFileSync("files/input.har")
result = har2postman.createPostmanCollection(stringifiedHarFile, includeTests);
fs.writeFileSync("files/output.json", result)
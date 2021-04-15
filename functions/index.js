"use strict";
exports.__esModule = true;
exports.fetchDesserts = void 0;
var datastore_1 = require("@google-cloud/datastore");
var datastore = new datastore_1.Datastore({
    projectId: 'fsd-ml',
    keyFilename: 'credentials.json'
});
var kindName = 'Dessert';
function fetchDesserts(req, res) {
    var query = datastore.createQuery(kindName);
    var desserts;
    datastore.runQuery(query)
        .then(function (results) {
        desserts = results[0];
        console.log(desserts);
        return res.status(200).send(desserts);
    })["catch"](function (error) {
        console.error('ERROR: ', error);
        return res.status(200).send(error);
    });
}
exports.fetchDesserts = fetchDesserts;
;

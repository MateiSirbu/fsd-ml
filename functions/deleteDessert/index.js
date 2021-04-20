"use strict";
exports.__esModule = true;
exports.deleteDessert = void 0;
var datastore_1 = require("@google-cloud/datastore");
var datastore = new datastore_1.Datastore({
    projectId: 'fsd-ml',
    keyFilename: 'credentials.json'
});
var kindName = 'Dessert';
function deleteDessert(req, res) {
    res.set('Access-Control-Allow-Origin', "*");
    res.set('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
    res.set('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        return res.status(200).send('CORS: OPTIONS request');
    }
    else if (req.method === 'DELETE') {
        var key = datastore.key([kindName, req.body.id]);
        datastore["delete"](key)
            .then(function (results) {
            return res.status(200).send(results);
        })["catch"](function (error) {
            console.error('ERROR: ', error);
            return res.status(500).send(error);
        });
    }
}
exports.deleteDessert = deleteDessert;
;

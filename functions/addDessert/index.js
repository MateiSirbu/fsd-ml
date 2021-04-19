"use strict";
exports.__esModule = true;
exports.addDessert = void 0;
var datastore_1 = require("@google-cloud/datastore");
var datastore = new datastore_1.Datastore({
    projectId: 'fsd-ml',
    keyFilename: 'credentials.json'
});
var kindName = 'Dessert';
function addDessert(req, res) {
    res.set('Access-Control-Allow-Origin', "*");
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Authorization');
    var newDessert = {
        calcium: req.body.calcium,
        calories: req.body.calories,
        carbs: req.body.carbs,
        dessert: req.body.dessert,
        fat: req.body.fat,
        iron: req.body.iron,
        protein: req.body.protein,
        sodium: req.body.sodium
    };
    var entity = {
        key: datastore.key(kindName),
        data: newDessert
    };
    datastore.insert(entity)
        .then(function (results) {
        return res.status(200).send(results);
    })["catch"](function (error) {
        console.error('ERROR: ', error);
        return res.status(500).send(error);
    });
}
exports.addDessert = addDessert;
;

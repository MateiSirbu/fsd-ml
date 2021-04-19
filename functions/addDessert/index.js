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
    res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
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
    console.log(newDessert);
    /*const entity = {
      key: datastore.key(kindName),
      data: newDessert
    }
    datastore.insert(entity)
      .then(results => {
        return res.status(200).send(results);
      })
      .catch(error => {
        console.error('ERROR: ', error);
        return res.status(500).send(error);
      });*/
    return res.status(200).send(newDessert);
}
exports.addDessert = addDessert;
;

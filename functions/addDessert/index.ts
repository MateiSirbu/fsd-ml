import { Datastore } from "@google-cloud/datastore";

const datastore = new Datastore({
  projectId: 'fsd-ml',
  keyFilename: 'credentials.json'
});

const kindName = 'Dessert';

export function addDessert(req, res) {
  res.set('Access-Control-Allow-Origin', "*")
  res.set('Access-Control-Allow-Methods', 'POST')
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  const newDessert = {
    calcium: req.body.calcium,
    calories: req.body.calories,
    carbs: req.body.carbs,
    dessert: req.body.dessert,
    fat: req.body.fat,
    iron: req.body.iron,
    protein: req.body.protein,
    sodium: req.body.sodium
  }
  console.log(newDessert)
  const entity = {
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
    });
};
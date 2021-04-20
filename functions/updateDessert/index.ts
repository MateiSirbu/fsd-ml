import { Datastore } from "@google-cloud/datastore";

const datastore = new Datastore({
  projectId: 'fsd-ml',
  keyFilename: 'credentials.json'
});

const kindName = 'Dessert';

export async function updateDessert(req, res) {
  res.set('Access-Control-Allow-Origin', "*")
  res.set('Access-Control-Allow-Methods', 'PUT, OPTIONS')
  res.set('Access-Control-Allow-Headers', '*')
  if (req.method === 'OPTIONS') {
    return res.status(200).send('CORS: OPTIONS request');
  }
  else if (req.method === 'PUT') {
    const transaction = datastore.transaction()
    const key = datastore.key([kindName, req.body.id])
    const [dessert] = await transaction.get(key)
    dessert.calcium = req.body.calcium
    dessert.calories = req.body.calories
    dessert.carbs = req.body.carbs
    dessert.dessert = req.body.dessert
    dessert.fat = req.body.fat
    dessert.iron = req.body.iron
    dessert.protein = req.body.protein
    dessert.sodium = req.body.sodium
    console.log(dessert)
    const entity = {
      key: key,
      data: dessert
    }
    transaction.save(entity)
    transaction.commit()
      .then(results => {
        return res.status(200).send(results);
      })
      .catch(error => {
        console.error('ERROR: ', error);
        return res.status(500).send(error);
      });
  }
};
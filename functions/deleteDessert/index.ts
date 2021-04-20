import { Datastore } from "@google-cloud/datastore";

const datastore = new Datastore({
  projectId: 'fsd-ml',
  keyFilename: 'credentials.json'
});

const kindName = 'Dessert';

export function deleteDessert(req, res) {
  res.set('Access-Control-Allow-Origin', "*")
  res.set('Access-Control-Allow-Methods', 'DELETE, OPTIONS')
  res.set('Access-Control-Allow-Headers', '*')
  if (req.method === 'OPTIONS') {
    return res.status(200).send('CORS: OPTIONS request');
  }
  else if (req.method === 'DELETE') {
    let key = datastore.key([kindName, req.body.id])
    datastore.delete(key)
      .then(results => {
        return res.status(200).send(results);
      })
      .catch(error => {
        console.error('ERROR: ', error);
        return res.status(500).send(error);
      });
  }
};
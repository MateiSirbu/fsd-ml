import { Datastore } from "@google-cloud/datastore";

const datastore = new Datastore({
  projectId: 'fsd-ml',
  keyFilename: 'credentials.json'
});

const kindName = 'Dessert';

export function fetchDesserts(req, res) {
  res.set('Access-Control-Allow-Origin', "*")
  res.set('Access-Control-Allow-Methods', 'GET')
  res.set('Access-Control-Allow-Headers', 'Authorization')
  const query = datastore.createQuery(kindName)
  let desserts: any
  datastore.runQuery(query)
    .then(results => {
      desserts = results[0];
      console.log(desserts)
      return res.status(200).send(desserts);
    })
    .catch(error => {
      console.error('ERROR: ', error);
      return res.status(200).send(error);
    });
};
var ObjectID = require('mongodb').ObjectID;

module.exports = (app, db) => {

  app.post('/allowance', (req, res) => {
    db.collection('allowance').update(req.body, {upsert:true})
  });

  app.get('/allowance/:address', (req, res) => {
    let query = { address: req.params.address }
    db.collection('allowance').find(query).toArray((err, result) => {
      if (err) throw err;
      if (result.length == 0) {
        res.send({ tokenA: 0, tokenB: 0 })
      } else {
        res.send(result[0])
      }
    })
  });

};

module.exports = (db, contracts) => {
  var module = {}

  module.set_allowance = async (req, res) => {
    await db.collection('allowance').update({ address: req.body.address }, req.body, {upsert:true})
    db.collection('allowance').find().toArray((err, result) => {
      if (err) throw err
    })
    res.send({ stam: 'staaaaaaam'})
  }

  module.get_allowance = async (req, res) => {
    let query = { address: req.params.address }
    db.collection('allowance').find(query).toArray((err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        console.log('no entry')
        res.send({ tokenA: 0, tokenB: 0 })
      } else {
        res.send(result[0])
      }
    })
  }

  return module
  
}
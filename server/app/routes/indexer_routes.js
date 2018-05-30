
module.exports = (app, db, contracts) => {
  
  var indexer_controller = require('../controllers/indexer_controller')(db, contracts)
  app.post('/addintent', indexer_controller.add_intent)
  app.get('/findintent', indexer_controller.find_intent)
}
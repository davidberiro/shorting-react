
module.exports = (app, db, contracts) => {

  var token_controller = require('../controllers/token_controller')(db, contracts)
  app.get('/token/:type/:amount/:address', token_controller.send_tokens)
  app.get('/balance/:type/:address', token_controller.get_balance)

}
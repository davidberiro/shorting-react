
module.exports = (app, db, contracts) => {

  var oracle_controller = require('../controllers/oracle_controller')(db, contracts)
  app.get('/setprice/:tokentype/:rate', oracle_controller.set_price)
  app.get('/getprice/:tokentype', oracle_controller.get_price)

}

module.exports = (app, db, contracts) => {

  var order_controller = require('../controllers/order_controller')(db, contracts)
  app.post('/getorder', order_controller.get_order)
  app.post('/provideorder', order_controller.provide_order)
}
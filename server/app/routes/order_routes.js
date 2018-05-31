
module.exports = (app, contracts) => {

  var order_controller = require('../controllers/order_controller')(contracts)
  app.post('/getorder', order_controller.get_order)
  app.post('/provideorder', order_controller.provide_order)
}
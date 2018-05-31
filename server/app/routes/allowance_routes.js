
module.exports = (app, contracts) => {

  var allowance_controller = require('../controllers/allowance_controller')(contracts)
  app.post('/allowance', allowance_controller.set_allowance);
  app.get('/allowance/:address', allowance_controller.get_allowance);

};

const allowanceRoutes = require('./allowance_routes');

module.exports = function(app, db) {
    allowanceRoutes(app, db);
    //other routes can go here too
}
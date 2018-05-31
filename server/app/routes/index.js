
const allowanceRoutes = require('./allowance_routes');
const tokenRoutes = require('./token_routes')
const oracleRoutes = require('./oracle_routes')

module.exports = function(app, contracts) {
    allowanceRoutes(app, contracts);
    tokenRoutes(app, contracts);
    oracleRoutes(app, contracts);
}
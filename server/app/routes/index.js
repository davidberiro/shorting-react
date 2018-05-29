
const allowanceRoutes = require('./allowance_routes');
const tokenRoutes = require('./token_routes')
const oracleRoutes = require('./oracle_routes')

module.exports = function(app, db, contracts) {
    allowanceRoutes(app, db, contracts);
    tokenRoutes(app, db, contracts);
    oracleRoutes(app, db, contracts);
}
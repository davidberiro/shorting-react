
module.exports = (db, contracts) => {
  var module = {}

  let tokenA = contracts.tokenA
  let tokenB = contracts.tokenB
  let ownerMsg = contracts.ownerMsg
  let tokenOracle = contracts.tokenOracle

  module.set_price = async (req, res) => {
    const type = req.params.tokentype
    // in case we add another token type? otherwise since A is base token only can change B
    let token = type == 'B' ? tokenB : tokenB
    let rate = req.params.rate
    let response = await tokenOracle.setRate(token.address, rate, ownerMsg)
    res.send({ "receipt" : response })
  }

  module.get_price = async (req, res) => {
    let token = req.params.tokentype == 'B' ? tokenB : tokenA
    let response = await tokenOracle.convert(tokenA.address, token.address, Math.pow(10,18), ownerMsg)/parseFloat(Math.pow(10,18))
    res.send({ "rate" : response})
  }

  return module

}
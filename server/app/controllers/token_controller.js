
module.exports = (contracts) => {
  var module = {}
  
  let tokenA = contracts.tokenA
  let tokenB = contracts.tokenB
  let ownerMsg = contracts.ownerMsg

  module.send_tokens = async (req, res) => {
    const type = req.params.type
    const amount = req.params.amount
    const address = req.params.address
    let token = (type == "A") ? tokenA : tokenB
    let transaction = await token.create(address, amount, ownerMsg)
    res.send({ "transaction": transaction })
  }

  module.get_balance = async (req, res) => {
    const type = req.params.type
    const address = req.params.address
    let token = (type == "A") ? tokenA : tokenB
    let amount = await token.balanceOf(address)
    res.send({"amount" : amount})
  }

  return module
}
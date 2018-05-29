module.exports = (app, db, contracts) => {
  let tokenA = contracts.tokenA
  let tokenB = contracts.tokenB
  let ownerMsg = contracts.ownerMsg

  // send tokens to address
  app.get('/token/:type/:amount/:address', async (req, res) => {
    const type = req.params.type
    const amount = req.params.amount
    const address = req.params.address
    let token = (type == "A") ? tokenA : tokenB
    let transaction = await token.create(address, amount, ownerMsg)
    res.send({ "transaction": transaction })
  })

  // send token balance of token type to address
  app.get('/balance/:type/:address', async (req, res) => {
    const type = req.params.type
    const address = req.params.address
    let token = (type == "A") ? tokenA : tokenB
    let amount = await token.balanceOf(address)
    res.send({"amount" : amount})
  })

}
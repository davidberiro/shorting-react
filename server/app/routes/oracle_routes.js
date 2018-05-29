module.exports = (app, db, contracts) => {
  let tokenA = contracts.tokenA
  let tokenB = contracts.tokenB
  let ownerMsg = contracts.ownerMsg
  let tokenOracle = contracts.tokenOracle

  // set the price of 1 token A to be worth {rate} token {type} (e.g 1 token a is 2 token b)
  app.get('/setprice/:tokentype/:rate', async (req, res) => {
    const type = req.params.tokentype
    // in case we add another token type? otherwise since A is base token only can change B
    let token = type == 'B' ? tokenB : tokenB
    let rate = req.params.rate
    let response = await tokenOracle.setRate(token.address, rate, ownerMsg)
    res.send({ "receipt" : response })
  })

  app.get('/getprice/:tokentype', async (req, res) => {
    let token = req.params.tokentype == 'B' ? tokenB : tokenA
    let response = await tokenOracle.convert(tokenA.address, token.address, Math.pow(10,18), ownerMsg)/parseFloat(Math.pow(10,18))
    res.send({ "rate" : response})
  })


}
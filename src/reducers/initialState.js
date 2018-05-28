export default {
  app: {
    initialized: false,
    showWalletLockedModal: false,
  },
  web3: {
    user: '',
    provider: '',
    network: 0,
  },
  tokens: {
    tokenA: 0,
    tokenB: 0,
    updateTokens: true,
    updateTokenRates: true,
    updateTokenAllowance: true,
    tokenRates: {
      tokenA: 1,
      tokenB: 1,
    },
    tokenAllowance: {
      tokenA: 0,
      tokenB: 0,
    },
  }
}

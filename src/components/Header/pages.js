const exchangeMenu = [
  {
    name: 'Basic',
    path: '/exchange/basic',
  },
  {
    name: 'Advanced (Comming Soon)',
    path: '/exchange/trade',
    disabled: true,
  },
  {
    name: 'Rebalance (Comming Soon)',
    path: '/exchange/rebalance',
    disabled: true,
  },
]

const pages = [
  {
    key: 0,
    name: 'Home',
    img: '/images/header-logo.png',
    path: '/',
  },
  {
    key: 1,
    name: 'My Shorts',
    path: '/smart-funds',
  },
  {
    key: 2,
    name: 'Exchange',
    path: '/exchange/basic',
    // dropdown: true,
    options: exchangeMenu,
  },
  {
    key: 3,
    name: 'Tokens',
    path: '/tokens',
  },
]

export default pages

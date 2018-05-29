const exchangeMenu = [
  {
    name: 'Offer Short',
    path: '/offershort',
  },
  {
    name: 'Buy Short Position',
    path: '/buyshort',
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
    path: '/my-shorts',
  },
  {
    key: 2,
    name: 'Exchange',
    path: '/exchange/basic',
    dropdown: true,
    options: exchangeMenu,
  },
  {
    key: 3,
    name: 'Tokens',
    path: '/tokens',
  },
  {
    key: 4,
    name: '',
    path: '',
  },
  {
    key: 5,
    name: '',
    path: '',
  },
]

export default pages

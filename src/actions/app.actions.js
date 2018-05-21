import { app as appTypes } from './types'

const initializeApp = ({ user, isMetaMask, network }) => ({
  type: appTypes.initializeApp,
  payload: { user, isMetaMask, network },
})

const toggleWalletLockedModal = on => ({
  type: appTypes.toggleWalletLockedModal,
  payload: { on },
})

export { initializeApp, toggleWalletLockedModal }

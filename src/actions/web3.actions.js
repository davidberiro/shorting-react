import { web3 as web3Types } from './types'
import { toggleWalletLockedModal } from './'

const setUserAddress = user => dispatch => {
  dispatch(toggleWalletLockedModal(false))
  dispatch({
    type: web3Types.setUserAddress,
    payload: { user },
  })
}

export { setUserAddress }

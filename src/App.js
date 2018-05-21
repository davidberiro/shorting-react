import React, { Component } from 'react'
import getWeb3 from './web3/getWeb3'
import { Provider } from 'react-redux'
import store from './store'
import { getAccount } from './web3/web3Utils'
import { Layout, Modal } from 'antd'
import './index.css'
import Router from './Router'


import { initializeApp } from './actions'

import { DEFAULT_NETWORK_ID, DEFAULT_NETWORK_NAME } from './consts'


class App extends Component {
  constructor(props) {
    super(props)

  }

  async componentWillMount() {
    const web3 = await getWeb3()
    const user = await getAccount(web3)
    const network = web3.version.network

    store.dispatch(initializeApp({
      user,
      isMetaMask: web3.currentProvider && web3.currentProvider.isMetaMask,
      network,
    }))

    if (network !== DEFAULT_NETWORK_ID) {
      this.showNetworkMismatchModal()
      console.log('wrong network')
    } 

    

  }

  showNetworkMismatchModal() {
    Modal.error({
      title: 'Network Mismatch',
      content: `Please change your network to ${DEFAULT_NETWORK_NAME} in MetaMask.`,
      closable: false,
      maskClosable: false,
    })
  }

  render() {
    return (
      <Provider store={store}>
        <Layout style={{ height: '100%', overflowX: 'hidden' }}>
          {/* <h1>Hellodave </h1> */}
          <Router />
        </Layout>
      </Provider>
    );
  }
}

export default App

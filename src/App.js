import React, { Component } from 'react'
import getWeb3 from './web3/getWeb3'
import { Provider } from 'react-redux'
import store from './store'
import { getAccount } from './web3/web3Utils'
import { Layout, Modal } from 'antd'
import './index.css'
import './App.css'
import Header from './components/Header'
import Router from './Router'
import Footer from './components/Footer'

import { initializeApp } from './actions'
import { DEFAULT_NETWORK_ID, DEFAULT_NETWORK_NAME } from './consts'


class App extends Component {

  async componentWillMount() {
    const web3 = await getWeb3()
    const user = await getAccount(web3)
    const network = web3.version.network

    store.dispatch(initializeApp({
      user,
      isMetaMask: web3.currentProvider && web3.currentProvider.isMetaMask,
      network,
    }))

    if (network !== DEFAULT_NETWORK_ID) this.showNetworkMismatchModal()

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
          <Header />
          <Router />
          <Footer />
        </Layout>
      </Provider>
    );
  }
}

export default App

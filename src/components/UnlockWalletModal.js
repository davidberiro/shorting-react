import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Modal } from 'antd'
import ModelViewer from 'metamask-logo'
import getWeb3 from '../web3/getWeb3'

const ModalText = styled.p`
  padding: 20px;
  text-size: 16px;
`

class UnlockWalletModal extends Component {
  componentDidMount() {
    // To render with fixed dimensions:
    var viewer = ModelViewer({
      // Dictates whether width & height are px or multiplied
      pxNotRatio: true,
      width: 190,
      height: 152,
      // pxNotRatio: false,
      // width: 0.9,
      // height: 0.9,

      // To make the face follow the mouse.
      followMouse: true,

      // head should slowly drift (overrides lookAt)
      slowDrift: false,
    })
    setTimeout(() => {
      const container = document.getElementById('metamask-logo')
      container.appendChild(viewer.container)
    }, 1)
    this.timer = setInterval(this.checkForUnlock, 300)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  checkForUnlock = () =>
    getWeb3()
      .then(
        web3 =>
          new Promise((resolve, reject) =>
            web3.eth.getAccounts(
              (error, accounts) => (error ? reject(error) : resolve(accounts))
            )
          )
      )
      .then(accounts => {
        const user = accounts[0]
        if (user) {
          // location.reload();
          this.props.setUserAddress(user)
        }
      })

  render() {
    return (
      <Modal
        visible={true}
        title={<div style={{ textAlign: 'center' }}>Unlock Your Wallet</div>}
        bodyStyle={{ textAlign: 'center' }}
        footer={null}
        closable={false}
      >
        <div id="metamask-logo" />
        <ModalText>
          {`Unlock your MetaMask to use CoTrader. If you don't have MetaMask
          installed you can download it with the link below.`}
        </ModalText>
        <a
          href="https://metamask.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/images/metamask-download.png" width={200} alt="metamask" />
        </a>
      </Modal>
    )
  }
}

UnlockWalletModal.propTypes = {
  setUserAddress: PropTypes.func.isRequired,
}

export default UnlockWalletModal

import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Layout as AntdLayout } from 'antd'
import styled from 'styled-components'
import { setUserAddress } from '../actions'
import UnlockWalletModal from './UnlockWalletModal'
import breakpoints from '../utils/breakpoints'

const Wrapper = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  margin-left: 42px;
  margin-right: 42px;

  @media (max-width: ${breakpoints.md}) {
    margin-left: 8px;
    margin-right: 8px;
  }

  @media (max-width: ${breakpoints.lg}) {
    margin-left: 16px;
    margin-right: 16px;
  }
`

const Layout = ({ children, locked, setUserAddress }) => (
  <div>
    <AntdLayout>
      <Wrapper>{children}</Wrapper>
    </AntdLayout>
    {locked && <UnlockWalletModal setUserAddress={setUserAddress} />}
  </div>
)

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  locked: PropTypes.bool.isRequired,
  setUserAddress: PropTypes.func.isRequired,
}

const mapStateToProps = ({ app, web3 }) => ({
  locked: app.showWalletLockedModal,
})

export default connect(mapStateToProps, {
  setUserAddress,
})(Layout)

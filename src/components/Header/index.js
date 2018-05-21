import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import _ from 'lodash'

import { Layout, Menu, Col, Row } from 'antd'
import MenuItem from './MenuItem'
import MobileNavDropDown from './MobileNavDropDown'
import pages from './pages'

import { ETHERSCAN_URL } from '../../consts'

const { Header: AntdHeader } = Layout

class Header extends Component {
  
  handleMenuItemClick = ({ key }) => {
    const { address } = this.props

    if (key === 'address') {
      window.open(`${ETHERSCAN_URL}/address/${address}`)
      return
    }

    this.props.pushRoute(pages[key].path)
  }

  render() {

    const { address } = this.props

    return (
      <AntdHeader
        className="header"
        style={{ padding: 0, backgroundColor: '#fff' }}
      >
        <Row>
          <Col xs={2} sm={2} md={0} />
          <Col
            style={{
              paddingLeft: 40,
              paddingRight: 40,
              justifyContent: 'center',
              display: 'flex',
            }}
            xs={20}
            sm={20}
            md={5}
            lg={5}
            xl={5}
            xxl={4}
          >
            <a href="/">
              <img
                src={'/images/header-logo.png'}
                height="26"
                alt="CoTrader"
                style={{ marginRight: 16 }}
              />
            </a>
          </Col>
          
          <Col xs={2} sm={2} md={0}>
            <div style={{ float: 'right', paddingRight: 20 }}>
              <MobileNavDropDown
                {...this.props}
                handleMenuItemClick={this.handleMenuItemClick}
              />
            </div>
          </Col>

          <Col xs={0} sm={0} md={19} lg={19} xl={19} xxl={20}>
            <Menu
              theme="light"
              mode="horizontal"
              style={{ lineHeight: '64px', padding: '0 50px', float: 'right' }}
              onClick={this.handleMenuItemClick}
            >
              {pages.slice(1).map(MenuItem)}
              {address ? (
                <Menu.Item key={'address'}>
                  <span
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      backgroundColor: '#ff7a7f',
                      marginRight: 12,
                      display: 'inline-block',
                      position: 'relative',
                      top: 13,
                      color: 'white',
                      textAlign: 'center',
                    }}
                  >
                    <span
                      style={{
                        position: 'relative',
                        top: -15,
                        fontFamily: 'Archivo',
                        fontSize: 10,
                        fontWeight: 500,
                        fontStyle: 'normal',
                        fontStretch: 'normal',
                        lineHeight: 1.1,
                        letterSpacing: 0.3,
                      }}
                    >
                      CT
                    </span>
                  </span>
                  {address.substr(0, 10)}...
                </Menu.Item>
              ) : null}
            </Menu>
          </Col>
        
        </Row>
      </AntdHeader>
    )
  }
}

Header.propTypes = {
  path: PropTypes.string,
  pushRoute: PropTypes.func.isRequired,
  address: PropTypes.string,
}

const mapStateToProps = ({ router, web3: { user } }) => ({
  path: _.get(router, ['location', 'pathname'], ''),
  address: user,
})

export default connect(mapStateToProps, {
  pushRoute: push,
})(Header)

import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// import _ from 'lodash'
import { Layout, Divider } from 'antd'

const { Footer: AntdFooter } = Layout



class Footer extends Component {
  render() {
    return (
      <AntdFooter style={{ textAlign: 'center' }}>
        <Divider />
        <a href="https://google.com/">AirShort</a>
        <Divider type="vertical" />
        <a href="https://google.com">White Paper</a>
        <Divider type="vertical" />
        <span>AirShort © 2018</span>
      </AntdFooter>

    )
  }
}

export default Footer
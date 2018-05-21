import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Menu, Dropdown, Button, Icon } from 'antd'
import pages from './pages'

export default class MobileNavDropDown extends Component {
  static propTypes = {
    handleMenuItemClick: PropTypes.func.isRequired,
  }

  render() {
    return (
      <Dropdown
        overlay={
          <Menu onClick={this.props.handleMenuItemClick}>
            {pages
              .slice(1)
              .map(page => <Menu.Item key={page.key}>{page.name}</Menu.Item>)}
          </Menu>
        }
      >
        <Button style={{ marginLeft: 8 }}>
          <Icon type="bars" />
          {/* Menu <Icon type="down" /> */}
        </Button>
      </Dropdown>
    )
  }
}

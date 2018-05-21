import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Dropdown, Icon } from 'antd'

const MenuItem = ({ name, dropdown, options, key, img }) => (
  <Menu.Item key={key}>
    {dropdown ? (
      <Dropdown
        overlay={
          <Menu>
            {options.map(({ name, path, disabled }) => (
              <Menu.Item
                key={path}
                onClick={() => this.props.pushRoute(path)}
                disabled={disabled}
              >
                <span>{name.toUpperCase()}</span>
              </Menu.Item>
            ))}
          </Menu>
        }
      >
        <a className="ant-dropdown-link">
          {name} <Icon type="down" />
        </a>
      </Dropdown>
    ) : (
      <span style={{ fontFamily: 'Maven Pro', fontWeight: 600, fontSize: 13 }}>
        {img ? (
          <img src={img} height="26" alt="CoTrader" />
        ) : (
          name.toUpperCase()
        )}
      </span>
    )}
  </Menu.Item>
)

MenuItem.propTypes = {
  name: PropTypes.string,
  dropdown: PropTypes.bool,
  options: PropTypes.array,
  key: PropTypes.number,
  img: PropTypes.string,
}

export default MenuItem

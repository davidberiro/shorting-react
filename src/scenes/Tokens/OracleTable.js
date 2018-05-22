import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'

const OracleTable = ({ tokens }) => {
  return (
    <Table
      columns={[
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Value',
          dataIndex: 'value',
          key: 'value',
        },
      ]}
      dataSource={tokens.map(({ name, address, value }) => ({
        key: address,
        name,
        address,
        value: value.toString(),
      }))}
    />
  )
}

OracleTable.propTypes = {
  tokens: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      address: PropTypes.string,
      step: PropTypes.number,
    })
  ),
}

export default OracleTable

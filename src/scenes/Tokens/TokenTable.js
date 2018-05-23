import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import axios from 'axios'
import store from '../../store'
import { updateTokenCount } from '../../actions'
import { connect } from 'react-redux'
import { DEFAULT_API_URL } from '../../consts'

const columns = [{
  title: 'Token'  ,
  dataIndex: 'token',
}, {
  title: 'Amount',
  dataIndex: 'amount',
}]

class TokenTable extends Component {

  fetchTokenAmount = async () => {
    try {
      let address = this.props.address
      let res1 = await axios.get(`${DEFAULT_API_URL}/balance/A/${address}`)
      let res2 = await axios.get(`${DEFAULT_API_URL}/balance/B/${address}`)
      let tokenA = res1.data.amount
      let tokenB = res2.data.amount
      // console.log(res1)

      store.dispatch(updateTokenCount({
        tokenA,
        tokenB,
      }))

    } catch (err) {
      console.log(err)
    }
  }
  
  componentDidMount() {
    // console.log(this.props)
  }

  render() {
    console.log(this.props)
    if (this.props.updateTokens) {
      console.log('fetching tokens')
      this.fetchTokenAmount()
    }

    return (
      <Table columns={columns}
      dataSource={[
        { token: 'token A', amount: this.props.tokenA },
        { token: 'token B', amount: this.props.tokenB }
      ]}
      />      
    )
  }

}

const mapStateToProps = ({ tokens, web3: { user } }) => ({ ...tokens, address: user })

export default connect(mapStateToProps)(TokenTable)

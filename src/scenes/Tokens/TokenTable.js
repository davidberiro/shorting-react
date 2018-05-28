import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import axios from 'axios'
import store from '../../store'
import { updateTokenCount, setTokenPrices, setTokenAllowance } from '../../actions'
import { connect } from 'react-redux'
import { DEFAULT_API_URL, DECIMALS } from '../../consts'

const columns = [{
  title: 'Token'  ,
  dataIndex: 'token',
}, {
  title: 'Amount',
  dataIndex: 'amount',
}, {
  title: 'Amount (In Token A)',
  dataIndex: 'baseAmount',
}, {
  title: 'Exchange Rate',
  dataIndex: 'rate',
}, {
  title: 'Contract Allowance',
  dataIndex: 'allowance',
}]

class TokenTable extends Component {

  updateAllowance = async () => {
    try {
      let address = this.props.address
      let res = await axios.get(`${DEFAULT_API_URL}/allowance/${address}`)
      let [tokenA, tokenB] = [res.data.tokenA, res.data.tokenB]
      store.dispatch(setTokenAllowance({
        tokenA,
        tokenB
      }))
    } catch (err) {
      console.log(err)
    }
  }

  updateTokenRates = async () => {
    try {
      let res1 = await axios.get(`${DEFAULT_API_URL}/getprice/A`)
      let res2 = await axios.get(`${DEFAULT_API_URL}/getprice/B`)
      let tokenA = res1.data.rate
      let tokenB = res2.data.rate      
      store.dispatch(setTokenPrices({
        tokenA,
        tokenB
      }))
    } catch (err) {
      console.log(err)
    }
      
  }

  fetchTokenAmount = async () => {
    try {
      let address = this.props.address
      let res1 = await axios.get(`${DEFAULT_API_URL}/balance/A/${address}`)
      let res2 = await axios.get(`${DEFAULT_API_URL}/balance/B/${address}`)
      let tokenA = res1.data.amount
      let tokenB = res2.data.amount

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
    if (this.props.updateTokens) this.fetchTokenAmount()

    if (this.props.updateTokenRates) this.updateTokenRates()

    if (this.props.updateTokenAllowance) this.updateAllowance()

    // console.log(this.props.tokenAllowance)

    var data = [{
      token: 'Token A',
      amount: this.props.tokenA / DECIMALS,
      baseAmount: this.props.tokenRates.tokenA * this.props.tokenA / DECIMALS,
      rate: this.props.tokenRates.tokenA,
      allowance: this.props.tokenAllowance.tokenA / DECIMALS,
    }, {
      token: 'Token B',
      amount: this.props.tokenB / DECIMALS,
      baseAmount: this.props.tokenRates.tokenB * this.props.tokenB / DECIMALS,
      rate: this.props.tokenRates.tokenB,
      allowance: this.props.tokenAllowance.tokenB / DECIMALS,
    }]

    return (
      <Table columns={columns}
      dataSource={data}
      />      
    )
  }

}

const mapStateToProps = ({ tokens, web3: { user } }) => ({ ...tokens, address: user })

export default connect(mapStateToProps)(TokenTable)

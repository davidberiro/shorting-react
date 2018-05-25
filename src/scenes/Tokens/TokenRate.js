import React, { Component } from 'react'
import { Form, Input, Select, Button, Modal } from 'antd';
import { connect } from 'react-redux'
import { DEFAULT_API_URL } from '../../consts'
import axios from 'axios'
import store from '../../store'
import { updateTokenPrices } from '../../actions'
const FormItem = Form.Item;
const Option = Select.Option;

class AmountInput extends Component {
  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {
      number: value.number || 0,
      currency: value.currency || 'rmb',
    };
  }
  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState(value);
    }
  }
  handleNumberChange = (e) => {
    let number = parseFloat(e.target.value || 0, 10);
    if (isNaN(number)) {
      return;
    }
    number = e.target.value;
    if (!('value' in this.props)) {
      this.setState({ number });
    }
    this.triggerChange({ number });
  }
  handleCurrencyChange = (currency) => {
    if (!('value' in this.props)) {
      this.setState({ currency });
    }
    this.triggerChange({ currency });
  }
  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  }
  render() {
    const { size } = this.props;
    const state = this.state;
    return (
      <span>
        <Input
          type="text"
          size={size}
          value={state.number}
          onChange={this.handleNumberChange}
          style={{ width: '60%', marginRight: '3%' }}
        />
        <Select
          value={state.currency}
          size={size}
          style={{ width: '37%' }}
          onChange={this.handleCurrencyChange}
        >
          {/* <Option value="A">Token A</Option> */}
          <Option value="B">Token B</Option>
        </Select>
      </span>
    );
  }
}

class TokenRate extends Component {
  handleSubmit = async (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let type = values.Amount.currency
        let amount = parseFloat(values.Amount.number) * Math.pow(10, 18)
        try {
          let res = await axios.get(`${DEFAULT_API_URL}/setprice/${type}/${amount}/`)
          store.dispatch(updateTokenPrices())
        } catch (err) {
           console.log(err)
           Modal.error({
            title: 'Api Error',
            content: `Please make sure the server is running on ${DEFAULT_API_URL}`,
            closable: false,
          })
        }
      }
    });
  }
  checkPrice = (rule, value, callback) => {
    try {
      if (parseFloat(value.number) >= 0) {
        callback();
        return;
      } else {
        callback('Amount must be greater than zero!');
      }
    } catch (err) {
      callback('Input must be number')
    }    
    
    // if (!(value.number < 0)) {
    //   callback();
    //   return;
    // }
    // callback('Amount must greater than zero!');
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem label="Set Rate">
          {getFieldDecorator('Amount', {
            initialValue: { number: 1, currency: 'B' },
            rules: [{ validator: this.checkPrice }],
          })(<AmountInput />)}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">Set</Button>
        </FormItem>
      </Form>
    );
  }
}

const totalForm = Form.create()(TokenRate)

const mapStateToProps = ({ web3: { user } }) => ({
  address: user
})

export default connect(mapStateToProps, {

})
(totalForm)
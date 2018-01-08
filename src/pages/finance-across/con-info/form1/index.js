import React, {
	Component
} from 'react'
  import {
  Form, Select, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon,DatePicker, message
} from 'antd';
import reqwest from 'reqwest';
import moment from 'moment';
import {
	api,
} from '../../../../common/api_server'
import {
	param,
}from '../../../../common/param'
import {
	url,
}from '../../../../common/url_api'

require('../../../../common/encrpt-ed25519')
var ContractUtils=require('../../../../common/contract-utils')
var JsonUtils =require('../../../../common/json-utils')

const FormItem = Form.Item;
const Option = Select.Option;

class Demo extends React.Component {
	constructor(props) {
		super()
		this.state={
			keyList:[]
		}
	}
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
			// this.props.form.resetFields();
      const values = {
        ...fieldsValue,
      };
      console.log('Received values of form: ', values);
	    this.props.onSearch(values)
			// var pubkey = values.user;
	    // var num = values.transferNum;
			// var contractProductId = "CP0001-20170923195745-381825"
			// var jsonContract='';
			// var par=param({
			// 	 "contractProductId": contractProductId,
			// })
			// reqwest(
			//  api(url.transferQuerySingle,par)
			// ).then((res) => {
			// 	console.log(res);
			// 	var data = res.result;
			// 	var preSignData = data.contractData;
			// 	jsonContract = preSignData.contract;
			// 	console.log(jsonContract);
			// 	jsonContract = JSON.parse(jsonContract);
			// 	var fullfiledContract = ContractUtils.field_fullfil(jsonContract, "Contract_Signature");
			// 	var currentUserPubkey = preSignData.currentUserPubkey;
			// 	var currentUserPrikey = preSignData.currentUserPrikey;
			// 	console.log("--------------cpub---------------------");
			// 	console.log(currentUserPrikey);
			// 	console.log(currentUserPubkey);
			// 	// var transferTimestamp = Date.parse(new Date(date));
			// 	fullfiledContract.ContractBody.ContractSignatures = null;
			// 	fullfiledContract.ContractBody.ContractOwners = null;
			// 	fullfiledContract.ContractBody.MetaAttribute.TransferTo = pubkey;
			// 	fullfiledContract.ContractBody.MetaAttribute.TransferDate = date+"";
			// 	fullfiledContract.ContractBody.MetaAttribute.TransferAmount = num+"";
			// 	fullfiledContract = ContractUtils.addOwners(fullfiledContract, currentUserPubkey);
			// 	ContractUtils.sign(fullfiledContract, currentUserPubkey, currentUserPrikey);
			// 	ContractUtils.hash(fullfiledContract);
			// 	 var par=param({})
			// 	 var datas={
			// 		 "jsonContract": JSON.stringify(fullfiledContract),
			// 	 }
			// 	 reqwest(
			// 		 api(url.transferSetting,par,datas)
			// 	 ).then((req) => {
			// 		 console.log(req)
			// 	 });
			// });
    });
  }
  render() {
	let {keyList,} = this.state
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const config = {
      rules: [{ type: 'object', required: true, message: 'Please select time!' }],
    };
    const rangeConfig = {
      rules: [{ type: 'array', required: true, message: 'Please select time!' }],
    };

		var keys=[];
    this.state.keyList.forEach(function(item,index){
        keys.push(
          <Option key={index+'user'} value={item.pubkey}>{item.name}</Option>
        )
    })
    return (
      <Form onSubmit={this.handleSubmit.bind(this)} style={{"marginTop":"30px"}}>
        <FormItem
          {...formItemLayout}
          label="收款人"
          hasFeedback
        >
          {getFieldDecorator('user', {
            rules: [
              { required: true, message: '请选择收款人!' },
            ],
          })(
            <Select placeholder="请选择收款人" style={{"width":"70%"}}>
            	{keys}
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="转账金额"
        >
          {getFieldDecorator('transferNum')(
            <InputNumber min={1} style={{"width":"50%"}}/>
          )}
          <span className="ant-form-text"> 元</span>
        </FormItem>
        <FormItem
          wrapperCol={{
            xs: { span: 16, offset: 8 },
            sm: { span: 16, offset: 8 },
          }}
        >
					<Button type="primary" onClick={this.handleReset} style={{ marginRight: "20px" }}>清空</Button>
          <Button type="primary" htmlType="submit">确定</Button>
        </FormItem>
      </Form>
    );
  }
	handleReset = () => {
		this.props.form.resetFields();
	}
  componentDidMount() {
		var par=param({})
		reqwest(
			api(url.userList,par)
		).then((req) => {
			console.log(req)
			this.setState({
				keyList:req.result.data,
			})
			console.log(this.state)
		});
	}
}

const WrappedDemo = Form.create()(Demo);
export default WrappedDemo

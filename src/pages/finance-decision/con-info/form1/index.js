import './index.less'
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
	handleReset = () => {
		this.props.form.resetFields();
		this.render();
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
        xs: { span: 20, offset: 2 },
        sm: { span: 20, offset: 2  },
      },
      wrapperCol: {
        xs: { span: 23  },
        sm: { span: 23  },
      },
    };
    const formItemLayout1 = {
      labelCol: {
        xs: { span: 20 },
        sm: { span: 20 },
      },
      wrapperCol: {
        xs: { span: 23 },
        sm: { span: 23 },
      },
    };
		const config=[
			{ required: true, message: '请选择' },
		]
    return (
      <Form onSubmit={this.handleSubmit.bind(this)} style={{"marginTop":"30px"}}>
				<p>1.住所在本市的人</p>
        <FormItem
          {...formItemLayout}
          label="是北京市户籍人员么？"
        >
          {getFieldDecorator('condition1', {
            rules: config
          })(
    				<Switch checkedChildren="是" unCheckedChildren="否" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="是驻京部队现役军人和现役武警么？"
        >
          {getFieldDecorator('condition2', {
            rules: config
          })(
    				<Switch checkedChildren="是" unCheckedChildren="否" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="是有效身份证件并在京居住一年以上的港澳台居民、华侨及外籍人员么？"
        >
          {getFieldDecorator('condition3', {
            rules: config
          })(
    				<Switch checkedChildren="是" unCheckedChildren="否" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="是持有有效《北京市工作居住证》的非本市户籍人员么？"
        >
          {getFieldDecorator('condition4', {
            rules: config
          })(
    				<Switch checkedChildren="是" unCheckedChildren="否" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="是持有北京市有效暂住证且连续五年(含)以上在本市缴纳社会保险和个人所得税的非北京市户籍人员么？"
        >
          {getFieldDecorator('condition5', {
            rules: config
          })(
    				<Switch checkedChildren="是" unCheckedChildren="否" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout1}
          label="2.是否在本人名下有北京市登记的小客车？"
        >
          {getFieldDecorator('condition6', {
            rules: config
          })(
    				<Switch checkedChildren="是" unCheckedChildren="否" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout1}
          label="3.是否持有有效的机动车驾驶证？"
        >
          {getFieldDecorator('condition7', {
            rules: config
          })(
    				<Switch checkedChildren="是" unCheckedChildren="否" />
          )}
        </FormItem>
        <FormItem
          wrapperCol={{
            xs: { span: 16, offset: 7 },
            sm: { span: 16, offset: 7 },
          }}
        >
					<Button type="primary" onClick={this.handleReset} style={{ marginRight: "20px" }}>清空</Button>
          <Button type="primary" htmlType="submit">提交</Button>
        </FormItem>
      </Form>
    );
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

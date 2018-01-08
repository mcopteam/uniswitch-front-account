import './index.less'
import React, {
	Component
} from 'react'
import {
  connect
} from 'react-redux'
import {  Form, Select, InputNumber,
  Slider, Button, Upload, Icon, message } from 'antd';
import { hashHistory } from 'react-router'
import reqwest from 'reqwest';
import {
	api,
} from '../../../../common/api_server'
import {
	param,
}from '../../../../common/param'
import {
	url,
}from '../../../../common/url_api'
import { actionBlockchainOption } from  '../../../../actions/blockchain-preserve'
const FormItem = Form.Item;
const Option = Select.Option;

class Demo extends React.Component {
  handleSubmit = (e) => {
  console.log(this.props.preInfo);
  var preInfo=this.props.preInfo;
  e.preventDefault();
  this.props.form.validateFields((err, values) => {
  	if(!err) {
  		console.log('Received values of form: ', values);
      this.props.form.resetFields()
  		var par = param({
        "assest": values.number,
        "blockChainId": values.storeContract,
        "user":preInfo.id,
  			"pubkey":preInfo.relate,
  		})
  		reqwest(
  			api(url.assetCreate,par)
  		).then((res) => {
  			console.log(res)
  			if(res.code == 0) {
  				message.success(res.msg);
  			} else {
  				message.error(res.msg);
  			}
        this.props.onOk()
  		});
  	}
  });
  }
  componentDidMount(){
    this.props.fetchData();
  }
  render() {
		let { blockchainOption,}=this.props
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };
    const formItemLayoutlittle = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    const config = {
      rules: [{ type: 'number', required: true, message: '请输入转账金额!' }],
    };
    var keys=[];
    blockchainOption.forEach(function (item,index) {
      keys.push(
        <Option key={item.id} value={item.id+''}>{item.value}</Option>
      )
    })
    return (
      <Form onSubmit={this.handleSubmit} style={{"marginTop":"20px"}}>
        <FormItem
          {...formItemLayoutlittle}
          label="创建金额"
        >
          {getFieldDecorator('number',config)(
            <InputNumber />
          )}
          <span className="ant-form-text"> 元</span>
        </FormItem>
           <FormItem
            {...formItemLayout}
            label="区块链名称"
            hasFeedback
          >
            {getFieldDecorator('storeContract', {
              rules: [
                { required: true, message: '请选择区块链名称!' },
              ],
            })(
              <Select placeholder="请选择区块链名称">
					      {keys}
              </Select>
            )}
          </FormItem>
        <FormItem
          wrapperCol={{
            xs: { span: 16, offset: 10 },
            sm: { span: 16, offset: 10 },
          }}
        >
          <Button type="primary" htmlType="submit">确定</Button>
        </FormItem>
      </Form>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    ...state.blockchainOption,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => {
      actionBlockchainOption(dispatch);
    },
  }
}
const WrappedDemo = Form.create()(Demo);
export default connect(mapStateToProps, mapDispatchToProps)(WrappedDemo)

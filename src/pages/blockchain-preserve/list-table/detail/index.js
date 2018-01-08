import React from 'react';
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Checkbox, message, Tooltip, Cascader, Select } from 'antd';
import { hashHistory } from 'react-router'
import { actionBlockchainEdit } from  '../../../../actions/blockchain-preserve'
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class NormalLoginForm extends React.Component {
  constructor(props) {
		super()
      this.state = {
      };
  }
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if(!err) {
				console.log('Received values of form: ', values);
        let id=this.props.conInfo.id;
				this.props.fetchData(values,id)
				this.props.onOk();
    		this.props.form.resetFields();
			}
		});
	}
	render() {
		let {conInfo} = this.props
		console.log(conInfo);
		const {
			getFieldDecorator
		} = this.props.form;
		 const formItemLayout = {
	      labelCol: {
	        xs: { span: 24 },
	        sm: { span: 6 },
	      },
	      wrapperCol: {
	        xs: { span: 24 },
	        sm: { span: 14 },
	      },
	    };
        const tailFormItemLayout = {
	      wrapperCol: {
	        xs: {
	          span: 24,
	          offset: 0,
	        },
	        sm: {
	          span: 14,
	          offset: 6,
	        },
	      },
	    };
		return(
  		<Form onSubmit={this.handleSubmit}>
	        <FormItem
	          {...formItemLayout}
	          label="区块链类型"
	          hasFeedback
	        >
	          <div className="input-wrap">
	            {getFieldDecorator('type', {
	                rules: [{ required: true, message: '请输入区块链类型'}],
									initialValue:conInfo.type,
	              })(
	              <Input name='type' key='type'/>
	            )}
	          </div>
	        </FormItem>
	        <FormItem
	          {...formItemLayout}
	          label="区块链名称"
	          hasFeedback
	        >
	          <div className="input-wrap">
	            {getFieldDecorator('name', {
	                rules: [{ required: true, message: '请输入区块链名称'}],
									initialValue:conInfo.name,
	              })(
	              <Input name='name' key='name'/>
	            )}
	          </div>
	        </FormItem>
	        <FormItem
	          {...formItemLayout}
	          label="区块链描述"
	          hasFeedback>
	          <div className="input-wrap">
	            {getFieldDecorator('description', {
	                rules: [{ required: true, message: '请输入区块链描述'}],
									initialValue:conInfo.description,
	              })(
	                <TextArea name='description' key='description'/>
	            )}
	          </div>
	        </FormItem>
	        <FormItem
	          {...formItemLayout}
	          label="区块链链接"
	          hasFeedback>
	          <div className="input-wrap">
	            {getFieldDecorator('ip', {
	                rules: [{ required: true, message: '请输入区块链链接'}],
									initialValue:conInfo.ip,
	              })(
	                <Input name='ip' key='ip'/>
	            )}
	          </div>
	        </FormItem>
	        <FormItem
	          {...formItemLayout}
	          label="区块链Port"
	          hasFeedback>
	          <div className="input-wrap">
	            {getFieldDecorator('port', {
	                rules: [{ required: true, message: '请输入区块链Port'}],
									initialValue:conInfo.port,
	              })(
	                <Input name='port' key='port'/>
	            )}
	          </div>
	        </FormItem>
	         <FormItem
	          {...formItemLayout}
	          label="是否存储合约"
	          hasFeedback
	        >
	          {getFieldDecorator('storeContract', {
	            rules: [
	              { required: true, message: '请选择存储合约!' },
	            ],
							initialValue:conInfo.storeContract,
	          })(
	            <Select placeholder="请选择存储合约">
	              <Option value="1">是</Option>
	              <Option value="0">否</Option>
	            </Select>
	          )}
	        </FormItem>
	         <FormItem
	          {...formItemLayout}
	          label="是否生效"
	          hasFeedback
	        >
	          {getFieldDecorator('valid', {
	            rules: [
	              { required: true, message: '请选择是否生效!' },
	            ],
							initialValue:conInfo.valid,
	          })(
	            <Select placeholder="请选择是否生效">
	              <Option value="1">是</Option>
	              <Option value="0">否</Option>
	            </Select>
	          )}
	        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" style={{marginLeft:"33%"}}>更新</Button>
        </FormItem>
      </Form>
		);
	}
}
const mapStateToProps = (state) => {
  return {
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (info,id) => {
      actionBlockchainEdit(dispatch, info,id);
    },
  }
}
const DetailForm = Form.create()(NormalLoginForm);
export default connect(mapStateToProps, mapDispatchToProps)(DetailForm)

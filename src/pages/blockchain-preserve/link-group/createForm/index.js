import './index.less'
import React, { Component } from 'react'
import { Form, Modal, Button,Input, Icon, message, Select } from 'antd';
import { actionBlockchainCreate } from  '../../../../actions/blockchain-preserve'
import { connect } from 'react-redux'
const FormItem = Form.Item;
const { TextArea } = Input;

const Option = Select.Option;
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
        this.props.form.resetFields()
        this.props.submitCreate(values);
				this.props.onOk();
			}
		});
	}
	render() {
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
                rules: [{ required: true, type: 'string', min: 1, message: '请输入区块链类型'}],
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
                rules: [{ required: true, type: 'string', min: 1, message: '请输入区块链名称'}],
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
                rules: [{ required: true, type: 'string', min: 1, message: '请输入区块链描述'}],
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
                rules: [{ required: true, type: 'string', min: 1, message: '请输入区块链链接'}],
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
                rules: [{ required: true, type: 'string', min: 1, message: '请输入区块链Port'}],
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
          })(
            <Select placeholder="请选择是否生效">
              <Option value="1">是</Option>
              <Option value="0">否</Option>
            </Select>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" style={{marginLeft:"33%"}}>创建</Button>
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
    submitCreate: (info) => {
      actionBlockchainCreate(dispatch, info);
    },
  }
}

const CreateForm = Form.create()(NormalLoginForm);
export default connect(mapStateToProps, mapDispatchToProps)(CreateForm)

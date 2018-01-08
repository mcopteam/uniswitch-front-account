import './index.less'
import React, { Component } from 'react'
import { Form, Modal, Button,Input, Icon, message } from 'antd';
import { actionLimitBtnCreate } from  '../../../../actions/limit-btn'
import { connect } from 'react-redux'
const FormItem = Form.Item;
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
          label="按钮标识"
          hasFeedback
        >
          <div className="input-wrap">
            {getFieldDecorator('key', {
                rules: [{ required: true, type: 'string', min: 1, message: '请输入按钮标识'}],
              })(
              <Input name='key' key='key'/>
            )}
          </div>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="按钮名称"
          hasFeedback
        >
          <div className="input-wrap">
            {getFieldDecorator('name', {
                rules: [{ required: true, type: 'string', min: 1, message: '请输入按钮名称'}],
              })(
              <Input name='name' key='name'/>
            )}
          </div>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="按钮全名"
          hasFeedback>
          <div className="input-wrap">
            {getFieldDecorator('fullName', {
                rules: [{ required: true, type: 'string', min: 1, message: '请输入按钮全名'}],
              })(
                <Input name='fullName' key='fullName'/>
            )}
          </div>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="按钮链接"
          hasFeedback>
          <div className="input-wrap">
            {getFieldDecorator('link', {
                rules: [{ required: true, type: 'string', min: 1, message: '请输入按钮链接'}],
              })(
                <Input name='link' key='link'/>
            )}
          </div>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="父按钮ID"
          hasFeedback>
          <div className="input-wrap">
            {getFieldDecorator('parentId', {
                rules: [{ required: true, type: 'string', min: 1, message: '请输入父按钮ID'}],
              })(
                <Input name='parentId' key='parentId'/>
            )}
          </div>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="顺序编号"
          hasFeedback>
          <div className="input-wrap">
            {getFieldDecorator('orderNum', {
                rules: [{ required: true, type: 'string', min: 1, message: '请输入按钮顺序编号'}],
              })(
                <Input name='orderNum' key='orderNum'/>
            )}
          </div>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="按钮说明"
          hasFeedback>
          <div className="input-wrap">
            {getFieldDecorator('note', {
                rules: [{ required: true, type: 'string', min: 1, message: '请输入按钮说明'}],
              })(
                <TextArea name='note' key='note'/>
            )}
          </div>
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
      actionLimitBtnCreate(dispatch, info);
    },
  }
}

const CreateForm = Form.create()(NormalLoginForm);
export default connect(mapStateToProps, mapDispatchToProps)(CreateForm)

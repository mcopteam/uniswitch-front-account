import './index.less'
import React, { Component } from 'react'
import { Form, Modal, Button,Input, Icon, message, Select } from 'antd';
import { metadataCategoryCreate } from  '../../../../actions/metadata-category'
import { connect } from 'react-redux'
const FormItem = Form.Item;
const { TextArea } = Input;

const {Option} = Select
class NormalLoginForm extends React.Component {
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if(!err) {
        values={
          ...values,
          category_id:0,
        }
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
          label="父级分类"
          hasFeedback
        >
          <div className="input-wrap">
            {getFieldDecorator('categoryId')(
                <Select>
                </Select>
            )}
          </div>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="分类名称"
          hasFeedback
        >
          <div className="input-wrap">
            {getFieldDecorator('categoryName', {
                rules: [{ required: true, type: 'string', min: 1, message: '请输入分类名称'}],
              })(
              <Input name='name' key='name'/>
            )}
          </div>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="分类描述"
          hasFeedback>
          <div className="input-wrap">
            {getFieldDecorator('categoryDesc')(
                <TextArea name='note' key='note'/>
            )}
          </div>
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" style={{marginLeft:"33%"}}>添加</Button>
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
      metadataCategoryCreate(dispatch, info);
    },
  }
}

const CreateForm = Form.create()(NormalLoginForm);
export default connect(mapStateToProps, mapDispatchToProps)(CreateForm)

import React from 'react';
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Checkbox, message, Tooltip, Cascader, Select } from 'antd';
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
import { metadataCategoryEdit } from  '../../../../actions/metadata-category'
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
				console.log(this.props.preInfo.id);
				let id=this.props.preInfo.id;
				let search=this.props.search;
				let pag=this.props.pag;

				this.props.form.resetFields();
				this.props.fetchData(values,id,{},{})
				this.props.onOk();
			}
		});
	}
	render() {
		let {preInfo} = this.props
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
          label="分类ID"
          hasFeedback
        >
          {getFieldDecorator('categoryId', {
            rules: [
              { required: true, message: '请输入分类名称!' },
            ],
						initialValue:preInfo.categoryId,
          })(
						<Input readOnly />
          )}
        </FormItem>
         <FormItem
          {...formItemLayout}
          label="分类名称"
          hasFeedback
        >
          {getFieldDecorator('categoryName', {
            rules: [
              { required: true, message: '请输入分类名称!' },
            ],
						initialValue:preInfo.categoryName,
          })(
						<Input />
          )}
        </FormItem>
         <FormItem
          {...formItemLayout}
          label="分类描述"
          hasFeedback
        >
          {getFieldDecorator('categoryDesc', {
						initialValue:preInfo.categoryDesc,
          })(
						<TextArea />
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
    fetchData: (search,id,searchParams,pag) => {
      metadataCategoryEdit(dispatch, search,id,searchParams,pag);
    },
  }
}
const DetailForm = Form.create()(NormalLoginForm);
export default connect(mapStateToProps, mapDispatchToProps)(DetailForm)

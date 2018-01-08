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
import { actionPreEdit } from  '../../../../actions/preList'
import { actionLimitRoleSearchCopy } from  '../../../../actions/limit-role'
const FormItem = Form.Item;
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
				console.log(this.props.preInfo.id);
				let id=this.props.preInfo.id;
				let search=this.props.search;
				let pag=this.props.pag;

				this.props.fetchData(values,id,search,pag)
				this.props.onOk();
			}
		});
	}
	componentDidMount(){
		this.props.fetchRole();
	}
	render() {
		let {preInfo,roleList} = this.props
		console.log(preInfo);
		console.log(roleList);
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
    var keys=[];
		roleList.forEach(function (item,index) {
			keys.push(
				<Option key={item.createTime} value={item.id}>{item.name}</Option>
			)
		})
		return(
  		<Form onSubmit={this.handleSubmit}>
         <FormItem
          {...formItemLayout}
          label="角色"
          hasFeedback
        >
          {getFieldDecorator('role', {
            rules: [
              { required: true, message: '请选择用户角色!' },
            ],
						initialValue:preInfo.roleId,
          })(
            <Select placeholder="请选择用户角色">
							{keys}
            </Select>
          )}
        </FormItem>
         <FormItem
          {...formItemLayout}
          label="是否生效"
          hasFeedback
        >
          {getFieldDecorator('validFlag', {
            rules: [
              { required: true, message: '请选择是否生效!' },
            ],
						initialValue:preInfo.validFlagName,
          })(
            <Select placeholder="请选择用户角色">
              <Option value="1" >有效</Option>
              <Option value="0" >无效</Option>
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
    ...state.limitRole,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (search,id,searchParams,pag) => {
      actionPreEdit(dispatch, search,id,searchParams,pag);
    },
		fetchRole(){
			actionLimitRoleSearchCopy(dispatch)
		}
  }
}
const DetailForm = Form.create()(NormalLoginForm);
export default connect(mapStateToProps, mapDispatchToProps)(DetailForm)

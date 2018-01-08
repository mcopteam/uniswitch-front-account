import React, {Component}from 'react';
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Checkbox, message, Modal } from 'antd';
import { hashHistory } from 'react-router'
import reqwest from 'reqwest';
import { api } from '../../../common/api_server'
import { param }from '../../../common/param'
import { url }from '../../../common/url_api'
import { actionRoleCreate } from  '../../../actions/limit-role'
import {
	button_list,
}from '../../../common/button_list'
const FormItem = Form.Item;
const { TextArea } = Input;
class Edit extends Component {
  constructor(props) {
		super()
      this.state = {
        visible: false,
      };
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
	render() {
		let {
      show,
      roleInfo,
    } = this.props
    let {getFieldDecorator} = this.props.form
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
		return(
      <div>
        <Button type="primary" onClick={this.showModal}>{button_list.add_roleName}</Button>
    		<Modal
          className="role-info-model"
          title="添加角色"
          visible={this.state.visible}
          okText="保存"
          onOk={this.submitEdit.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        >
          <Form>
              <FormItem
                {...formItemLayout}
                label="角色名称"
                hasFeedback
              >
                <div className="input-wrap">
                  {getFieldDecorator('name', {
                      rules: [{ required: true, type: 'string', min: 1, message: '请输入角色名称'}],
                      // initialValue: roleInfo.roleName,
                    })(
                    <Input name='roleName' key='roleName'/>
                  )}
                </div>
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="角色描述"
                hasFeedback>
                <div className="input-wrap">
                  {getFieldDecorator('note', {
                      rules: [{ required: true, type: 'string', min: 1, message: '请输入角色描述'}],
                      // initialValue: roleInfo.roleDetail
                    })(
                      <TextArea name='roleDetail' key='roleDetail'/>
                  )}
                </div>
              </FormItem>
              </Form>
          </Modal>
        </div>
		);
  }
    //点击取消
  handleCancel() {

    this.setState({
      visible: false,
    });
    this.props.form.resetFields()
  }
  // 点击确定
  submitEdit(e){
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        this.props.createRole(values)
        this.handleCancel()
      }
    })
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.limitRole,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    createRole: (info) => {
      actionRoleCreate(dispatch, info);
    },
  }
}


const EditModal = Form.create()(Edit);
export default connect(mapStateToProps, mapDispatchToProps)(EditModal)

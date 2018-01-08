import React, {Component}from 'react';
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Checkbox, message, Modal } from 'antd';
import { hashHistory } from 'react-router'
import reqwest from 'reqwest';
import { api } from '../../../common/api_server'
import { param }from '../../../common/param'
import { url }from '../../../common/url_api'
import { actionBtnEdit } from  '../../../actions/limit-btn'
const FormItem = Form.Item;
const { TextArea } = Input;

class Edit extends Component {
  constructor(props) {
		super()
      this.state = {

      };
  }
	render() {
		let {
      show,
      menuInfo,
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
  		<Modal className="menu-info-model" title="按钮资源编辑" visible={show}
        okText="保存"
        onOk={this.submitEdit.bind(this)}   onCancel={this.handleCancel.bind(this)}
          >
        <Form>
          <FormItem
              {...formItemLayout}
              label="按钮ID"
              hasFeedback
            >
              <div className="input-wrap">
                {getFieldDecorator('id', {
                    rules: [{ required: true, message: '请输入按钮ID'}],
                    initialValue: menuInfo.id,
                  })(
                  <Input name='id' key='id'/>
                )}
              </div>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="按钮标识"
              hasFeedback
            >
              <div className="input-wrap">
                {getFieldDecorator('key', {
                    rules: [{ required: true, message: '请输入按钮标识'}],
                    initialValue: menuInfo.key,
                  })(
                  <Input name='key' key='key'/>
                )}
              </div>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="按钮名称"
              hasFeedback>
              <div className="input-wrap">
                {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入按钮名称'}],
                    initialValue: menuInfo.name
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
                    rules: [{ required: true, message: '请输入按钮全名'}],
                    initialValue: menuInfo.fullName
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
                    rules: [{ required: true, message: '请输入按钮链接'}],
                    initialValue: menuInfo.link
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
                    rules: [{ required: true, message: '请输入父按钮ID'}],
                    initialValue: menuInfo.parentId
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
                    rules: [{ required: true, message: '请输入按钮顺序编号'}],
                    initialValue: menuInfo.orderNum
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
                    rules: [{ required: true, message: '请输入按钮说明'}],
                    initialValue: menuInfo.note
                  })(
                    <TextArea name='note' key='note'/>
                )}
              </div>
            </FormItem>
          </Form>
        </Modal>
		);
  }
    //点击取消
  handleCancel() {
    this.props.form.resetFields()
    this.props.onCancel()
  }
  // 点击确定
  submitEdit(e){
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let search=this.props.search;
        let pag=this.props.pag;
        this.props.form.resetFields()
        this.props.submitEdit(values, search, pag)
        this.props.onOk()
      }
    })
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.limitMenu,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    submitEdit: (info, search, pag) => {
      actionBtnEdit(dispatch, info, search, pag);
    },
  }
}


const EditModal = Form.create()(Edit);
export default connect(mapStateToProps, mapDispatchToProps)(EditModal)

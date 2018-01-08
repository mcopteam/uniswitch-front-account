import React, {
	Component
} from 'react'
import { Link} from 'react-router'
import { Form, Icon, Input, Table, Button, message, Modal, } from 'antd';
import { hashHistory } from 'react-router'
import reqwest from 'reqwest';
import {
	api,
} from '../../../../../common/api_server'
import {
	param,
}from '../../../../../common/param'
import {
	url,
}from '../../../../../common/url_api'
const confirm = Modal.confirm;
const FormItem = Form.Item;

class OffForm extends React.Component {
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if(!err) {
				console.log(values);
			  confirm({
			    title: '您确定要注销此账户?',
			    content: '注销后将删除账户所有信息',
			    okText: '确定',
			    okType: 'danger',
			    cancelText: '取消',
			    onOk() {
			      console.log('OK');
						var par=param({
							"password":values.password,
						})
						reqwest(
							api(url.persetOff,par)
						).then((req) => {
							console.log(req)
							if (req.code == 0) {
								message.success(req.msg);
								hashHistory.push('/portal')
							}else{
								message.error(req.msg);
							}
						});
			    },
			    onCancel() {
			      console.log('Cancel');
			    },
			  });
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
				<FormItem>
					{getFieldDecorator('password', {
						rules: [{ required: true, message: '请输入您的密码!' }],
					})(
						<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
					)}
				</FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" style={{marginLeft:"33%"}}>确定</Button>
        </FormItem>
      </Form>
		)
	}
}
const OffFormCon = Form.create()(OffForm);
export default class Off extends Component{
	constructor(props) {
		super(props)
		this.state = {
			offVisible:false,
		}
	}
	showDeleteConfirm = () =>{
	    this.setState({
	      offVisible: true,
	    });
	}
//	注销按钮
	handleOk = (e) => {
	    this.setState({
	      offVisible: false,
	    });
	}
//	注销按钮
	handleCancel = (e) =>{
	    this.setState({
	      offVisible: false,
	    });
	}
	render() {
		return(
			<div>
		    <Button onClick={this.showDeleteConfirm} type="primary" style={{marginLeft:"45%",marginTop:"20px"}}>
		      注销
		    </Button>
        <Modal
					footer={null}
          title="请输入用户密码"
          visible={this.state.offVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确定"
          cancelText="取消"
        >
					<OffFormCon/>
        </Modal>
			</div>
		)
	}
}

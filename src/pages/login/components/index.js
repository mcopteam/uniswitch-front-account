import React from 'react';
import './index.less';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { hashHistory } from 'react-router'
import reqwest from 'reqwest';
import {port,} from '../../../common/port'

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {

	delay(){
		var t=setTimeout(function(){
			hashHistory.push('/main/welcome')
		},2000)
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if(!err) {
				console.log('Received values of form: ', values);
					var par={
						"username": values['username'],
						"password": values['password'],
					}
				reqwest({
					url: port+'login?'+reqwest.toQueryString(par),
					// url: 'http://localhost:8081/login?'+reqwest.toQueryString(par),
					// url: 'http://172.17.7.166:8081/login?'+reqwest.toQueryString(par),
						// url: 'http://localhost:8081/login',
						method: 'post',
						// contentType:'application/x-www-form-urlencoded',
						// headers: {
					  //   	'token': sessionStorage.token,
					  //   },
						// data:{
						//
						// 		"username": values['username'],
						// 		"password": values['password'],
						// },
						type: 'json',
					}).then((res) => {
					console.log(res)
					if(res.code == 0) {
						sessionStorage.role = res.result.role;
						sessionStorage.name = res.result.name;
						sessionStorage.pubkey = res.result.pubkey;
						sessionStorage.prikey = res.result.prikey;
						sessionStorage.token = res.result.token;
						sessionStorage.id = res.result.id;
						hashHistory.push('/main/welcome')
						// this.delay()
					} else {
						message.error(res.msg);
					}
				});
			}
		});
	}
	goRegister(){
		hashHistory.push('/register')
	}
	render() {
		const {
			getFieldDecorator
		} = this.props.form;
		return(
			<div className='con'>
				<h2 className='title'>可信数据交换平台</h2>
				<Form onSubmit={this.handleSubmit} className="login-form">
			        <FormItem>
			          {getFieldDecorator('username', {
			            rules: [{ required: true, message: '请输入您的用户名!' }],
			          })(
			            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
			          )}
			        </FormItem>
			        <FormItem>
			          {getFieldDecorator('password', {
			            rules: [{ required: true, message: '请输入您的密码!' }],
			          })(
			            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
			          )}
			        </FormItem>
			        <FormItem>
			          {getFieldDecorator('remember', {
			            valuePropName: 'checked',
			            initialValue: true,
			          })(
			            <Checkbox>记住我</Checkbox>
			          )}
			          <Button type="primary" htmlType="submit" className="login-form-button">
			            登录
			          </Button>
			          <a onClick={this.goRegister}>现在注册!</a>
			        </FormItem>
			      </Form>
			</div>
		);
	}
}

// <a className="login-form-forgot">忘记密码</a>
const LoginForm = Form.create()(NormalLoginForm);

export default LoginForm;

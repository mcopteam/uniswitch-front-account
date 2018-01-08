import React, {
	Component
} from 'react'
import { Link} from 'react-router'
import { Table, Button, message, } from 'antd';
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
const {
	Columns,
} = Table;
class KeyList extends Component {
	constructor(props) {
		super()
		this.state={
			data:[],
		    pagination: false,
		}
		this.columns = [
			{
				title: '账号名称',
				dataIndex: 'createUserName',
				key: 'createUserName',
			},{
			  title: '账号状态',
			  dataIndex: 'status',
			  key: 'status',
			},
			{
				title: '账号公钥',
				dataIndex: 'publicKey',
				key: 'publicKey',

			}, {
			  title: '账号私钥',
			  dataIndex: 'privateKey',
			  key: 'privateKey',
			},
			{
		    title: '操作',
		    key: 'operation',
		    fixed: 'right',
		    width: 150,
				render: (record, index, e) => (
					<span>
				      <a  onClick={this.handleRelate.bind(this, record,index)}>关联</a>
				      <span className="ant-divider" />
				      <a  onClick={this.handleCencelRelate.bind(this, record,index)}>取消关联</a>
				      <span className="ant-divider" />
				      <a  style={{"disable":""}} onClick={this.handelDelete.bind(this, record,index)}>删除</a>
				    </span>
				),
		  },
		]
	}

//	关联按钮
	handleRelate(record, index) {
		let _this=this;
		console.log(index);
		var par=param({
			"id": index.id
		})
		reqwest(
			api(url.persetRelateKey,par)
		).then((req) => {
			console.log(req)
			if (req.code == 0) {
				message.success(req.msg);
				_this.getData()
			}else{
				message.error(req.msg);
			}
		});
	}
	//	取消关联按钮
		handleCencelRelate(record, index) {
			let _this=this;
			console.log(index);
			var par=param({
				"id": index.id
			})
			reqwest(
				api(url.persetCencelRelateKey,par)
			).then((req) => {
				console.log(req)
				if (req.code == 0) {
					message.success(req.msg);
					_this.getData()
				}else{
					message.error(req.msg);
				}
			});
		}
	//	删除按钮
	handelDelete(record, index) {
		let _this=this;
		console.log(index);
		var par=param({
			"id": index.id
		})
		reqwest(
			api(url.persetDeleteKey,par)
		).then((req) => {
			console.log(req)
			if (req.code == 0) {
				message.success(req.msg);
				_this.getData()
			}else{
				message.error(req.msg);
			}
		});
	}
	// 申请按钮
	handleApply(){
		let _this=this;
		console.log("apply");
		var par=param({})
		reqwest(
			api(url.persetApplyKey,par)
		).then((req) => {
			console.log(req)
			if (req.code == 0) {
				message.success(req.msg);
				_this.getData()
			}else{
				message.error(req.msg);
			}
		});
	}
	getData(){
		var par=param({})
		reqwest(api(url.persetkeyList,par)).then((req) => {
			console.log(req)
			if (req.code == 0) {
				message.success(req.msg);
				var data=req.result.data
				for (var i = 0; i < data.length; i++) {
					var arr=["未关联","已关联"]
					data[i].status=arr[(data[i].status+1)]
				}
				this.setState({
					data:data
				})
				console.log(this.state)
			}else{
				message.error(req.msg);
			}
		});
	}
	componentDidMount() {
		this.getData();
	}
	render() {
		return(
			<div>
				<Table
			  scroll={{ x: 1300 }}
				columns={this.columns}
				dataSource={this.state.data}
				pagination={this.state.pagination}
				/>
				<Button type="primary" onClick={this.handleApply.bind(this)} style={{marginLeft:"45%",marginTop:"20px"}}>申请</Button>
			</div>
		)
	}
}
export default KeyList

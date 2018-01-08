import React, {
	Component
} from 'react'
import { Link} from 'react-router'
import { Table, Button, message, } from 'antd';
export default class RecordPage extends Component {
	constructor(props) {
		super(props)
		this.state={
			userInfo:[],
			data:[],
	    pagination: false,
			statuslVisible:false,
		}
		this.columns = [
			{
				title: '公钥',
				dataIndex: 'publicKey',
				key: 'publicKey',
		    width: 200,
			},{
			  title: '私钥',
			  dataIndex: 'privatekey',
			  key: 'privatekey',
		    width: 200,
			},
			{
				title: '是否关联',
				dataIndex: 'relationFlag',
				key: 'relationFlag',
		    width: 100,

			},
		]
	}
	render() {
		let {userInfo}=this.props;
		console.log(userInfo);
		for (var i = 0; i < userInfo.length; i++) {
		  if(userInfo[i].relationFlag=="0"){
		    userInfo[i].relationFlag="已关联";
		  }else if(userInfo[i].relationFlag=="-1"){
		    userInfo[i].relationFlag="未关联";
		  }else if(userInfo[i].relationFlag=="-2"){
		    userInfo[i].relationFlag="已删除";
		  }
		}
		return(
			<div>
				<Table
				columns={this.columns}
				dataSource={userInfo}
				pagination={this.state.pagination}
				/>
			</div>
		)
	}
}

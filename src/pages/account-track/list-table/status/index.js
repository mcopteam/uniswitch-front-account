import React, {
	Component
} from 'react'
import { Link} from 'react-router'
import {
  connect
} from 'react-redux'
import { Modal, Table, Button, message, } from 'antd';
import UserCon from './user'
class RecordPage extends Component {
	constructor(props) {
		super()
		this.state={
			width:600,
			userInfo:[],
			data:[],
	    pagination: false,
			statuslVisible:false,
			pagination: {
				current: 1,
				total: 0,
				pageSize: 6,
			},
		}
		this.columns = [
			{
				title: '账户名称',
				dataIndex: 'username',
				key: 'username',
		    width: 100,
			},{
			  title: '账户状态',
			  dataIndex: 'status',
			  key: 'status',
		    width: 100,
			},
			{
				title: '账户角色',
				dataIndex: 'roleName',
				key: 'roleName',
		    width: 100,

			},
			{
				title: '修改日期',
				dataIndex: 'timestamp',
				key: 'timestamp',
		    width: 150,

			},
			{
		    title: '操作',
		    key: 'operation',
		    width: 150,
				render: (record, index, e) => (
					<span>
			      <a onClick={this.handleRelate.bind(this, record,index)}>账号信息</a>
			    </span>
				),
		  },
		]
	}
	//	账号信息按钮
		handleRelate(index) {
			console.log(index);
		    this.setState({
		      statuslVisible: true,
					userInfo:index.accountinfo
		    });
		}
	componentDidMount() {
	}

		handleStatusOk = (e) => {
	    this.setState({
	      statuslVisible: false,
	    });
	  }
	  handleStatusCancel = (e) => {
	    this.setState({
	      statuslVisible: false,
	    });
	  }
		//分页 筛选状态
		handleTableChange = (pagination, filters, sorter) => {
			const pager = { ...this.state.pagination
			};
			pager.current = pagination.current;
			this.setState({
				pagination: pager,
			});
		}
	render() {
		let {recordList}=this.props;
		return(
			<div style={{paddingBottom:"40px"}}>
				<Table
				columns={this.columns}
				dataSource={recordList}
				pagination={this.state.pagination}
				onChange={this.handleTableChange.bind(this)}
				/>

        <Modal
					footer={null}
					width={this.state.width}
          title="账号状态"
          visible={this.state.statuslVisible}
          onOk={this.handleStatusOk}
          onCancel={this.handleStatusCancel}
          okText="确定"
          cancelText="取消"
          ref="statusModal"
        >
					<UserCon userInfo={this.state.userInfo}/>
        </Modal>
			</div>
		)
	}
}
const mapStateToProps = (state) => {
  return {
    ...state.accountRecord
  }
}
const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordPage)

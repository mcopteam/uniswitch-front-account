import './index.less'
import React, {
	Component
} from 'react'
import {
  connect
} from 'react-redux'
import { Link, } from 'react-router'
import { Button, Icon, Table, Input, Modal, message } from 'antd'
import reqwest from 'reqwest';
import {
	api,
} from '../../../common/api_server'
import {
	param,
}from '../../../common/param'
import {
	url,
}from '../../../common/url_api'
import {
	btnIsShow,
}from '../../../common/btnIsShow'
import {
	button_list,
}from '../../../common/button_list'
import {
	queryButtonList,
}from '../../../actions/button_list'

const confirm = Modal.confirm;
const {
	columns,
} = Table;
class ListTable extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data:[],
			pagination: {
				current: 1,
				total: 0,
				pageSize: 6,
			},
		}
	}
	//	审核通过
	showPassConfirm(e, record, index) {
		let _this=this;
	  confirm({
	    title: '您确定审核通过?',
	    content: '确认该账户即通过审核',
	    okText: '确定',
	    okType: 'danger',
	    cancelText: '取消',
	    onOk() {
	      console.log('OK');
				var par=param({
						"user": record.id,
						"status":1
				})
				reqwest(
					api(url.accountCheckIsPass,par)
				).then((req) => {
					console.log(req)
					if (req.code == 0) {
						message.success(req.msg)
						console.log(this);
						_this.getDataCopy()
					}else {
						message.error(req.msg)
					}
				});
	    },
	    onCancel() {
	      console.log('Cancel');
	    },
	  });
	}

//	审核不通过
	showNoPassConfirm(e, record, index) {
		let _this=this;
	  confirm({
	    title: '您确定审核不通过?',
	    content: '确认该账户即不通过审核',
	    okText: '确定',
	    okType: 'danger',
	    cancelText: '取消',
	    onOk() {
	      console.log('NO');
				var par=param({
						"user": record.id,
						"status":-1
				})
				reqwest(
					api(url.accountCheckIsPass,par)
				).then((req) => {
					console.log(req)
					if (req.code == 0) {
						message.success(req.msg)
						_this.getDataCopy()
					}else {
						message.error(req.msg)
					}
				});
	    },
	    onCancel() {
	      console.log('Cancel');
	    },
	  });
	}

		//	获取数据
		getData(status) {
			const pag = { ...this.state.pagination
			};
			console.log(pag);
			var par=param({
				"pageNum": pag.current,
				"pageSize": pag.pageSize,
			})
			reqwest(
				api(url.accountCheckList,par)
			).then((req) => {
				console.log(req)
				if(req.result) {
					if (req.code == 0) {
						message.success(req.msg)
						var data = req.result.data;
						for(var i = 0; i < data.length; i++) {
							if (data[i].role) {
								data[i].rolename=data[i].role.name;
							}
						}
						this.setState({
							data: data,
		          pagination: {
		            ...this.state.pagination,
		            total: req.result.total,
		          }
						})
					}else{
						message.error(req.msg)
					}
				}
			});
		}

			//	获取数据
			getDataCopy(status) {
				const pag = { ...this.state.pagination
				};
				console.log(pag);
				var par=param({
					"pageNum": pag.current,
					"pageSize": pag.pageSize,
				})
				reqwest(
					api(url.accountCheckList,par)
				).then((req) => {
					console.log(req)
					if(req.result) {
						if (req.code == 0) {
							// message.success(req.msg)
							var data = req.result.data;
							for(var i = 0; i < data.length; i++) {
								if (data[i].role) {
									data[i].rolename=data[i].role.name;
								}
							}
							this.setState({
								data: data,
			          pagination: {
			            ...this.state.pagination,
			            total: req.result.total,
			          }
							})
						}else{
							// message.error(req.msg)
						}
					}
				});
			}
		//分页 筛选状态
		handleTableChange = (pagination, filters, sorter) => {
			const pager = { ...this.state.pagination
			};
			console.log(pager);
			pager.current = pagination.current;
			this.setState({
				pagination: pager,
			}, () => {
				console.log(this.state);
				this.getData();
    })
  }
	render() {
		let {buttonList,}=this.props
			const columns = [{
				title: '账户名称',
				dataIndex: 'username',
				width: 150,
				key: 'username',
			}, {
				title: '账户角色',
				dataIndex: 'rolename',
				key: 'rolename',
				width: 100,
			}, {
				title: '账户状态',
				dataIndex: 'statusName',
				key: 'statusName',
				width: 80,
			}, {
				title: '申请日期',
				dataIndex: 'createTime',
				key: 'createTime',
				width: 100,
			}, {
				title: '操作',
				dataIndex: 'handle',
				width: 200,
				render: (record, index, e) => (
					<span>
						<a  onClick={this.showPassConfirm.bind(this, record,index)} style={{display:btnIsShow(buttonList,button_list.auditpass_accountKey)?"inline-block":"none"}}>{button_list.auditpass_accountName}</a>
						<span className="ant-divider" style={{display:btnIsShow(buttonList,button_list.auditpass_accountKey)?"inline-block":"none"}} />
						<a  onClick={this.showNoPassConfirm.bind(this, record,index)} style={{display:btnIsShow(buttonList,button_list.auditnopass_accountKey)?"inline-block":"none"}}>{button_list.auditnopass_accountName}</a>
					</span>
				),
			}]

		return(
			<div>
        <Table
          className="order-mange list-table"
          bordered
					dataSource={this.state.data}
          pagination={this.state.pagination}
          columns={columns}
					onChange={this.handleTableChange.bind(this)}
        />
      </div>
		)
	}


	componentDidMount() {
		this.getData();
		this.props.btnList()
		this.render()
	}
}
const mapStateToProps = (state) => {
  return {
    ...state.buttonList
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
			btnList: () => {
				queryButtonList(dispatch)
			}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListTable)

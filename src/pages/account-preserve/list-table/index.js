import './index.less'
import React, {
	Component
} from 'react'
import {
  connect
} from 'react-redux'
import { Modal, Table, Icon, Button, message  } from 'antd';
import reqwest from 'reqwest';
import $ from 'jquery';
const {
	Columns,
} = Table;
import {
	api,
} from '../../../common/api_server'
import {
	url,
} from '../../../common/url_api'
import {
	param,
}from '../../../common/param'
import {
	btnIsShow,
}from '../../../common/btnIsShow'
import {
	button_list,
}from '../../../common/button_list'
import {
	queryButtonList,
}from '../../../actions/button_list'
import DetailForm from './detail'
import InfoForm from './info'
import { preList, preListCopy } from '../../../actions/preList'
const confirm = Modal.confirm;
class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			searchParams:{},
			preInfo:{},
			id:"",
			detailVisible:false,
			editVisible:false,
			total: 20,
			loading: false,
			pagination: {
				current: 1,
				total: 0,
				pageSize: 6,
			},
		}
	}
//	编辑按钮
	handleEdit(record, index) {
	    this.setState({
	      editVisible: true,
				preInfo:index,
	    });
	}
//	查看详细按钮
	handleDetail(record, index) {
		console.log(index);
	    this.setState({
	      detailVisible: true,
				preInfo:index,
	    });
	}
//	注销按钮
	handelOff(record, index) {
		var _this=this;
		confirm({
			title: '您确定要注销此账户?',
			content: '注销后将删除账户所有信息',
			okText: '确定',
			okType: 'danger',
			cancelText: '取消',
			onOk() {
				console.log(index);
				var par=param({
					"user":index.id,
				})
				reqwest(
					api(url.persetClose,par)
				).then((req) => {
					console.log(req)
					if (req.code == 0) {
						message.success(req.msg);
							_this.props.fetchDateCopy(_this.state.searchParams,_this.state.pagination)
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
//	冻结按钮
	handelFreeze(record, index) {
		var _this=this;
		confirm({
			title: '您确定要冻结此账户?',
			okText: '确定',
			okType: 'danger',
			cancelText: '取消',
			onOk() {
				console.log(index);
				var par=param({
					"user":index.id,
				})
				reqwest(
					api(url.persetFreeze,par)
				).then((req) => {
					console.log(req)
					if (req.code == 0) {
						message.success(req.msg);
							_this.props.fetchDateCopy(_this.state.searchParams,_this.state.pagination)
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
//	挂失按钮
	handelLost(record, index) {
		var _this=this;
		confirm({
			title: '您确定要挂失此账户?',
			okText: '确定',
			okType: 'danger',
			cancelText: '取消',
			onOk() {
				console.log(index);
				var par=param({
					"user":index.id,
				})
				reqwest(
					api(url.persetLost,par)
				).then((req) => {
					console.log(req)
					if (req.code == 0) {
						message.success(req.msg);
							_this.props.fetchDateCopy(_this.state.searchParams,_this.state.pagination)
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
//	激活按钮
	handelActivate(record, index) {
		var _this=this;
		confirm({
			title: '您确定要激活此账户?',
			okText: '确定',
			okType: 'danger',
			cancelText: '取消',
			onOk() {
				console.log(index);
				var par=param({
					"user":index.id,
				})
				reqwest(
					api(url.persetActivate,par)
				).then((req) => {
					console.log(req)
					if (req.code == 0) {
						message.success(req.msg);
							_this.props.fetchDateCopy(_this.state.searchParams,_this.state.pagination)
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
	//分页 筛选状态
	handleTableChange = (pagination, filters, sorter) => {
		console.log(this.state.searchParams);
		const pager = { ...this.state.pagination
		};
		pager.current = pagination.current;
		this.setState({
			pagination: pager,
		}, () => {
			console.log(this.state);
			this.props.fetchDateCopy(this.state.searchParams,this.state.pagination)
		});
	}
	//
	componentDidMount() {
		this.props.fetchDateCopy()
		this.props.btnList()
		this.render()
	}
	componentWillReceiveProps(props){
		console.log(props.searchParams);
    this.setState({
			searchParams:props.searchParams
    })
	}
	handleDetailOk = (e) => {
    this.setState({
      detailVisible: false,
    });
  }
  handleDetailCancel = (e) => {
    this.setState({
      detailVisible: false,
    });
  }
	 handleEditOk = (e) => {
    this.setState({
      editVisible: false,
    });
  }
  handleEditCancel = (e) => {
    this.setState({
      editVisible: false,
    });
  }
	render() {
		let { preList,
				buttonList
		 } = this.props
		 const columns = [{
		 	title: '账户名称',
		 	dataIndex: 'username',
		 	key: 'username',
		 	width: '10%',
		 }, {
		 	title: '关联账号',
		 	dataIndex: 'relate',
		 	key: 'relate',
		 	width: '30%',
		 }, {
		 	title: '账户角色',
		 	dataIndex: 'rolename',
		 	key: 'rolename',
		 	width: '20%',
		 },  {
		 	title: '账户状态',
		 	dataIndex: 'statusName',
		 	key: 'statusName',
		 	width: '10%',
		 }, {
		 	title: '是否生效',
		 	dataIndex: 'validFlagName',
		 	key: 'validFlagName',
		 	width: '10%',
		 },{
		 	title: '操作',
		 	dataIndex: 'handle',
		 	width: '20%',
		 	render: (record, index, e) => (
		 		<span>
		 				<a  onClick={this.handleEdit.bind(this, record,index)} style={{display:btnIsShow(buttonList,button_list.edit_accountKey)?"inline-block":"none"}}>{button_list.edit_accountName}</a>
		 				<span className="ant-divider"  style={{display:btnIsShow(buttonList,button_list.edit_accountKey)?"inline-block":"none"}}/>
		 				<a  disabled = { index.status =="创建中" ? 'disabled' : "" } style={{display:btnIsShow(buttonList,button_list.detail_accountKey)?"inline-block":"none"}} onClick={this.handleDetail.bind(this, record,index)}>{button_list.detail_accountName}</a>
		 				<span className="ant-divider"  style={{display:btnIsShow(buttonList,button_list.detail_accountKey)?"inline-block":"none"}}/>
		 				<a  style={{"disable":""}} onClick={this.handelOff.bind(this, record,index)} style={{display:btnIsShow(buttonList,button_list.cancel_accountKey)?"inline-block":"none"}}>{button_list.cancel_accountName}</a>
		 				<span className="ant-divider"  style={{display:btnIsShow(buttonList,button_list.cancel_accountKey)?"inline-block":"none"}}/>
		 				<a onClick={this.handelFreeze.bind(this, record,index)}>冻结</a>
		 				<span className="ant-divider" />
		 				<a onClick={this.handelLost.bind(this, record,index)}>挂失</a>
		 				<span className="ant-divider" />
		 				<a onClick={this.handelActivate.bind(this, record,index)}>激活</a>
		 			</span>
		 	),
		 }];

		return(
			<div>
				<Table
					columns={columns}
	        rowKey={record => record.registered}
	        dataSource={preList.data}
	        pagination={{...this.state.pagination,"total":preList.total,"current":preList.pageNum}}
	        loading={this.state.loading}
					onChange={this.handleTableChange.bind(this)}
	      />
        <Modal
					footer={null}
          title="查看详细"
          visible={this.state.detailVisible}
          onOk={this.handleDetailOk}
          onCancel={this.handleDetailCancel}
          okText="确定"
          cancelText="取消"
          ref="detailModal"
        >
					<InfoForm preInfo={this.state.preInfo} id={this.state.id}/>
        </Modal>
        <Modal
					footer={null}
          title="编辑"
          visible={this.state.editVisible}
          onOk={this.handleEditOk}
          onCancel={this.handleEditCancel}
          okText="确定"
          cancelText="取消"
          ref="editModal"
        >
					<DetailForm onOk={this.handleEditOk} preInfo={this.state.preInfo} id={this.state.id} search={this.state.searchParams} pag={this.state.pagination}/>
        </Modal>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
  return {
    ...state.preList,
    ...state.buttonList
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchDate: (search,pag) => {
      preList(dispatch,search,pag);
    },
    fetchDateCopy: (search,pag) => {
      preListCopy(dispatch,search,pag);
    },
		btnList: () => {
			queryButtonList(dispatch)
		}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)

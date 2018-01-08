import './index.less'
import React, {
	Component
} from 'react'
import {
  connect
} from 'react-redux'
import { Modal, Table, Icon, Button, message   } from 'antd';
import reqwest from 'reqwest';
import $ from 'jquery';
import {designer_url,} from '../../../common/designer_url'
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
class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			msgTitle:'',
			msgs:'未查询到建议信息',
			visible:false,
			isPage: false,
			data: [{}],
			total: 20,
			loading: false,
			pagination: {
				current: 1,
				total: 0,
				pageSize: 6,
			},
			searchParams:{
				status: -1,
				name:'',
				contractId:'',
				startTime:'',
				endTime:'',
			},
			showModal: false,
			showAuditModal: false,
			audit: {},
			curTransactionId: '',
			selectedRowKeys: [],
		}
	}
//	编辑按钮
	handleEdit(record, index) {
		var parameters = 'name=' + encodeURI(index.name) + '&id=' + index.id + '&contractId=' + index.contractProductId+'&username='+encodeURI(sessionStorage.name)+'&pubkey='+encodeURI(sessionStorage.pubkey)+'&token='+sessionStorage.token;
		location.href = designer_url+'?' + encodeURI(parameters);
	}
//	送审按钮
	handleSendAudit(record, index) {
		console.log(this.state);
		var par=param({
			"id": index.id
		})
		reqwest(
			api(url.fileSendAudit,par)
		).then((req) => {
			console.log(req)
			if (req.code == 0) {
				message.success(req.msg);
				this.getDataCopy(this.state.searchParams,this.state.pagination)
			} else {
				message.error(req.msg);
			}
		});
	}
//	查看修改意见按钮
	handleSuggestion(record, index) {
		index.suggestion = index.suggestion ||  ('未查询到建议信息!')
	    this.setState({
	      visible: true,
	      msgs:index.suggestion,
	      msgTitle:index.name
	    });
		console.log(this.refs.suggestCon)
	}
//	删除按钮
	handelDelete(record, index) {
		var par=param({
			"id": index.id
		})
		reqwest(
			api(url.fileDelete,par)
		).then((req) => {
			console.log(req)
			if (req.code == 0) {
				message.success(req.msg);
				this.getDataCopy(this.state.searchParams,this.state.pagination)
			} else {
				message.error(req.msg);
			}
		});
	}
//分页 筛选状态
	handleTableChange = (pagination, filters, sorter) => {
		const pager = { ...this.state.pagination
		};
		console.log(pagination)
		pager.current = pagination.current;
		console.log(this.state);
		this.setState({
			pagination: pager,
		}, () => {
			console.log(this.state);
			this.getDataCopy(this.state.searchParams,this.state.pagination)
		});
	}
//	获取数据
	getData(search,pag){
		if (!search) {
			search={
				"name":'',
				"contractId":'',
				"startTime":'',
				"endTime":'',
				"status": -1,
			}
		}
		var par=param({
			"pageNum": pag.current,
			"pageSize": pag.pageSize,
			"name":search.itemTitle,
			"contractId":search.orderCode,
			"status": search.status,
			"startTime":search.createTimeStart,
			"endTime":search.createTimeEnd,
		})
		reqwest(
				api(url.fileList,par)
			).then((req) => {
			console.log(req)
			if(req.result){
				if (req.code == 0) {
					message.success(req.msg);
					var data = req.result.data;
					for(var i = 0; i < data.length; i++) {
						var arr = ['创建中', '审核中', '修改中', '等待发布', '已发布'];
						data[i].status = arr[data[i].status];
					}
					this.setState({
						data: data,
						pagination:{
							...this.state.pagination,
							total:req.result.total,
						},
					})
				} else {
					message.error(req.msg);
				}
			}
		});
	}

//	获取数据
	getDataCopy(search,pag){
		if (!search) {
			search={
				"name":'',
				"contractId":'',
				"startTime":'',
				"endTime":'',
				"status": -1,
			}
		}
		var par=param({
			"pageNum": pag.current,
			"pageSize": pag.pageSize,
			"name":search.itemTitle,
			"contractId":search.orderCode,
			"status": search.status,
			"startTime":search.createTimeStart,
			"endTime":search.createTimeEnd,
		})
		reqwest(
				api(url.fileList,par)
			).then((req) => {
			console.log(req)
			if(req.result){
				if (req.code == 0) {
					// message.success(req.msg);
					var data = req.result.data;
					for(var i = 0; i < data.length; i++) {
						var arr = ['创建中', '审核中', '修改中', '等待发布', '已发布'];
						data[i].status = arr[data[i].status];
					}
					this.setState({
						data: data,
						pagination:{
							...this.state.pagination,
							total:req.result.total,
						},
					})
				} else {
					// message.error(req.msg);
				}
			}
		});
	}
	componentDidMount() {
		this.getDataCopy(null,this.state.pagination)
		this.props.btnList()
		this.render()
	}
	componentWillReceiveProps(props) {
		console.log(props);
		console.log(props.searchParams);
		this.setState({
			searchParams:props.searchParams,
			pagination:{
				...this.state.pagination,
				current:1
			}
		}, () => {
			if (props.searchParams.status==''||!props.searchParams.status) {
				props.searchParams.status=-1
			}
			console.log(props.searchParams);
			if (props.searchParams.itemTitle!=null) {
				this.getData(props.searchParams,this.state.pagination)
			} else {
				this.getDataCopy(props.searchParams,this.state.pagination)
			}
		})
	}
	 handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
	//点击Table中的每行
	handleTableClick(record, index, e) {
		let flag = true
		if(e.target.localName !== 'td') {
			flag = false
		}
		if(flag) {
			console.log(record)
		}
	}
	render() {
		let {buttonList } = this.props
		const columns = [{
			title: '序号',
			dataIndex: 'id',
			key: 'id',
			width: '10%',
		}, {
			title: '合约编号',
			dataIndex: 'contractProductId',
			key: 'contractProductId',
			width: '20%',
		}, {
			title: '合约名称',
			dataIndex: 'name',
			key: 'name',
			width: '20%',
		}, {
			title: '修改时间',
			dataIndex: 'updateTime',
			key: 'updateTime',
			width: '20%',
		}, {
			title: '文件状态',
			dataIndex: 'status',
			key: 'status',
			width: '10%',
		}, {
			title: '操作',
			dataIndex: 'handle',
			width: '20%',
			render: (record, index, e) => (
				<span>
			      <a  onClick={this.handleEdit.bind(this, record,index)} style={{display:btnIsShow(buttonList,button_list.edit_contractproductKey)?"inline-block":"none"}}>{button_list.edit_contractproductName}</a>
			      <span className="ant-divider" style={{display:btnIsShow(buttonList,button_list.edit_contractproductKey)?"inline-block":"none"}}/>
			      <a  disabled = { index.status =="创建中" || index.status == "修改中" ? '' : "disabled" } onClick={this.handleSendAudit.bind(this, record,index)} style={{display:btnIsShow(buttonList,button_list.send_contractproductKey)?"inline-block":"none"}}>{button_list.send_contractproductName}</a>
			      <span className="ant-divider"  style={{display:btnIsShow(buttonList,button_list.send_contractproductKey)?"inline-block":"none"}}/>
			      <a  disabled = { index.status =="创建中" ? 'disabled' : "" }  onClick={this.handleSuggestion.bind(this, record,index)} style={{display:btnIsShow(buttonList,button_list.update_contractproductKey)?"inline-block":"none"}}>{button_list.update_contractproductName}</a>
			      <span className="ant-divider"  style={{display:btnIsShow(buttonList,button_list.update_contractproductKey)?"inline-block":"none"}}/>
			      <a  style={{"disable":""}} onClick={this.handelDelete.bind(this, record,index)} style={{display:btnIsShow(buttonList,button_list.delete_contractproductKey)?"inline-block":"none"}}>{button_list.delete_contractproductName}</a>
			    </span>
			),
		}];
		return(
			<div>
				<Table
							columns={columns}
			        rowKey={record => record.id}
			        dataSource={this.state.data}
			        pagination={this.state.pagination}
			        loading={this.state.loading}
			        onChange={this.handleTableChange}
		     			onRowClick={this.handleTableClick.bind(this)}
			      />
		        <Modal
		          title="修改意见"
		          visible={this.state.visible}
		          onOk={this.handleOk}
		          onCancel={this.handleCancel}
		          okText="确定"
		          cancelText="取消"
		          ref="modal"
		        >
		          <p ref="suggestTitle">合约名称:{this.state.msgTitle}</p>
		          <p ref="suggestCon">修改意见:{this.state.msgs}</p>
		        </Modal>
			</div>
		);
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
export default connect(mapStateToProps, mapDispatchToProps)(App)

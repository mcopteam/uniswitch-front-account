import './index.less'
import React, {
	Component
} from 'react'
import {
  connect
} from 'react-redux'
import { Link, } from 'react-router'
import {Table, Icon, Button, Input, Modal, message, confirm }from 'antd'
import fetch from '../../../utils/fetch' //资源请求
import { camelize, JSONToParams } from '../../../utils/lang' //转url方法
import { checkAuth, } from '../../../utils/auth' //检查用户
import SidebarPage from '../sidebar' //列表详情
import RightModel from '../../../components/rightModel' //右侧容器

import { executeSidebar } from '../../../actions/executeSidebar'
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

require('../../../common/encrpt-ed25519')
var ContractUtils=require('../../../common/contract-utils')
var JsonUtils =require('../../../common/json-utils')
const {
	Column,
	ColumnGroup
} = Table;

class ListTable extends Component {
	constructor(props) {
		super()
		this.state = {
			record:{},
			id:'',
			contractId:'',
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
				itemTitle:'',
				orderCode:'',
			},
			showModal: false,
			showAuditModal: false,
			audit: {},
			curTransactionId: '',
			selectedRowKeys: [],
		}
		this.columns = [{
			title: '名称',
			dataIndex: 'name',
			width: 150,
			key: 'name',
		}, {
			title: '创建时间',
			dataIndex: 'createTime',
			key: 'createTime',
			width: 150,
		}, {
			title: '编号',
			dataIndex: 'contractId',
			key: 'contractId',
			width: 150,
		}, {
			title: '执行时间',
			dataIndex: 'start',
			key: 'start',
			width: 150,
		}, {
			title: '执行状态',
			dataIndex: 'status',
			key: 'status',
			width: 150,
		}, {
			title: '操作',
			dataIndex: 'handle',
			width: '20%',
			render: (record, index, e) => (
				<span>
			      <a  onClick={this.handleEnd.bind(this,record,index)}>终止</a>
			    </span>
			),
		}]
	}

	// filters: [
	// 	{
	// 			text: '未执行',
	// 		value: 0,
	// 	 }
	// 	, {
	// 			text: '正在执行',
	// 		value: "Contract_In_Process",
	// 	},{
	// 		text:"已完成",
	// 		value:"Contract_Completed"，
	// 	}
	// 	, {
	// 			text: '终止',
	// 		value: "Contract_Discarded",
	// 	}
	//  ],
//	终止按钮
	handleEnd(e,record, index) {
		console.log(record)
		var contractId=record.contractId;
		var jsonContract='';
		var id=record.id;
		console.log(id);
		console.log(contractId);
	 var par=param({
			 "contractId": contractId,
	 })
	 reqwest(
		 api(url.preTerminate,par)
	 ).then((res) => {
		 console.log(res);
		 if (res.code == 0) {
			 	message.success(res.msg)
  			var preSignData = res.result;
  			console.log(preSignData);
  			jsonContract = preSignData.contract;
  			jsonContract = JSON.parse(jsonContract);
  			console.log(jsonContract);
  			var fullfiledContract = ContractUtils.field_fullfil(jsonContract, "Contract_Discarded");
  			// var cmpPubkey = preSignData.publishPubkey
  			// var cmpPrikey = preSignData.publishPrikey;
  			var currentUserPubkey = preSignData.currentUserPubkey;
  			var currentUserPrikey = preSignData.currentUserPrikey;
  			fullfiledContract['ContractBody']['ContractOwners'] = [];
  			fullfiledContract['ContractBody']['ContractSignatures'] = null;
  			fullfiledContract = ContractUtils.addOwners(fullfiledContract, currentUserPubkey);
  			// ContractUtils.sign(fullfiledContract, cmpPubkey, cmpPrikey);
  			ContractUtils.sign(fullfiledContract, currentUserPubkey, currentUserPrikey);
  			ContractUtils.hash(fullfiledContract);
       console.log("----------------- kk -------------------------------");
       console.log(JSON.stringify(fullfiledContract));

  		 var par=param({
  			 "id": id,
  			//  "auditOp": 4,
  			//  "publishOwner": pubkey
  		 })
  		 var datas={
  			 "jsonContract": JSON.stringify(fullfiledContract),
  		 }
  		 reqwest(
  			 api(url.terminateContract,par,datas)
  		 ).then((req) => {
  			 console.log(req)
				 if (req.code == 0) {
    			 message.success(req.msg)
     			 this.getDataCopy(this.state.searchParams,this.state.pagination)
				 }else{
					 message.error(req.msg);
				 }
  		 });
		 }else{
			 message.error(res.msg);
		 }
	 });
	}
	render() {
		let {
			record,
			id,
			contractId,
			isPage,
			data,
			pagination,
			loading,
			showModal,
			showAuditModal,
			audit,
			curTransactionId,
			curOrderCode,
			selectedRowKeys,
		} = this.state
		let {
			authes
		} = this.props
		return(
			<div>
        {/*侧边栏*/}
        <RightModel show={isPage} handleShowArea={this.handleShowArea}>
          <div className='content-page'>
            <SidebarPage />
          </div>
        </RightModel>
        <Table
          className="order-mange list-table"
          bordered
          dataSource={data}
          pagination={pagination}
          onChange={this.handlePageChange.bind(this)}
          columns={this.columns}
          loading={loading}
          onRowClick={this.handleTableClick.bind(this)}
        />
      </div>
		)
	}

	//	获取数据
	getData(search,pag){
		if (!search) {
			search={
				itemTitle:'',
				orderCode:'',
			}
		}
		var par=param({
			"pageNum": pag.current,
			"pageSize": pag.pageSize,
			"contractName":search.itemTitle,
			"contractId":search.orderCode,
		})
		reqwest(api(url.executeQueryAll,par)).then((req) => {
			console.log(req)
			if(req.code == 0){
				message.success(req.msg)
				var list = req.result.data;
				for(var i = 0; i < list.length; i++) {
					if(list[i].status == 'Contract_Unknown' || list[i].status == 'Contract_Create' || list[i].status == 'Contract_Signature') {
						list[i].status = '未执行';
					} else if(list[i].status == 'Contract_In_Process') {
						list[i].status = '正在执行';
					} else if(list[i].status == 'Contract_Completed') {
						list[i].status = '已完成';
					} else if(list[i].status == 'Contract_Discarded') {
						list[i].status = '终止';
					}
				}
				this.setState({
					data: list,
					total:req.result.total,
				})
			}else{
	 			 message.error(res.msg);
			}
		});
	}

		//	获取数据
		getDataCopy(search,pag){
			if (!search) {
				search={
					itemTitle:'',
					orderCode:'',
				}
			}
			var par=param({
				"pageNum": pag.current,
				"pageSize": pag.pageSize,
				"contractName":search.itemTitle,
				"contractId":search.orderCode,
			})
			reqwest(api(url.executeQueryAll,par)).then((req) => {
				console.log(req)
				if(req.code == 0){
					// message.success(req.msg)
					var list = req.result.data;
					for(var i = 0; i < list.length; i++) {
						if(list[i].status == 'Contract_Unknown' || list[i].status == 'Contract_Create' || list[i].status == 'Contract_Signature') {
							list[i].status = '未执行';
						} else if(list[i].status == 'Contract_In_Process') {
							list[i].status = '正在执行';
						} else if(list[i].status == 'Contract_Completed') {
							list[i].status = '已完成';
						} else if(list[i].status == 'Contract_Discarded') {
							list[i].status = '终止';
						}
					}
					this.setState({
						data: list,
						total:req.result.total,
					})
				}else{
					 //  message.error(res.msg);
				}
			});
		}
	componentDidMount() {
		this.getDataCopy(null,this.state.pagination)
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
				this.getData(props.searchParams,this.state.pagination)
		})
	}
	//点击Table中的每行
	handleTableClick(record, index, e) {
		console.log("%c-------------record-------------------", "color:red")
		console.log(record)
		let flag = true
		if(e.target.localName !== 'td') {
			flag = false
		}
		if(flag) {
			this.props.fetchDate(record.id,record.contractId)
			this.setState({
				isPage: !this.state.isPage,
			})
			let self = this
			setTimeout(function() {
				if(self.state.isPage) {
					const calc = function() {
						self.setState({
							isPage: false
						})
						document.removeEventListener('click', calc)
					}
					document.addEventListener('click', calc)
				}
			}, 20)
		}
	}
	handleShowArea(e) {
		e.nativeEvent.stopImmediatePropagation()
	}

	handlePageChange(pagination) {
		const pager = { ...this.state.pagination
		};
		console.log(pagination)
		pager.current = pagination.current;
		this.setState({
			pagination: pager,
		}, () => {
			console.log(this.state);
			this.getData(this.state.searchParams,this.state.pagination)
		});
	}
}

const mapStateToProps = (state) => {
	console.log(state);
  return {
    ...state.executeSidebar,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchDate: (id,contractId) => {
      executeSidebar(dispatch,id,contractId);
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListTable)

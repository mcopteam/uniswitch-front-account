import './index.less'
import React, {
	Component
} from 'react'
import {
  connect
} from 'react-redux'
import { Link, } from 'react-router'
import {Table, Icon, Button, Input, Modal, message, confirm }from 'antd'
import { camelize, JSONToParams } from '../../../utils/lang' //转url方法
import { checkAuth, } from '../../../utils/auth' //检查用户
import SidebarPage from '../../sidebar' //列表详情
import RightModel from '../../../components/rightModel' //右侧容器
import { productSidebar } from '../../../actions/productSidebar'
import reqwest from 'reqwest';
import { Select } from 'antd';
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
const Option = Select.Option;

const {
	TextArea
} = Input;
const {
	Column,
	ColumnGroup
} = Table;

class ListTable extends Component {
	constructor(props) {
		super()
		this.state = {
			contractId:'',
			id:'',
			selectKey:'',
			keyList:[],
			visibleSign: false,
			suggest: '',
			visible: false,
			record: {},
			isPage: false,
			data: [{}],
			total: 20,
			loading: false,
			pagination: {
				current: 1,
				total: 0,
				pageSize: 6,
			},
			showModal: false,
			showAuditModal: false,
			audit: {},
			curTransactionId: '',
			selectedRowKeys: [],
		}
		this.columns = [{
			title: '合约名称',
			dataIndex: 'name',
			width: 150,
			key: 'name',
		}, {
			title: '创建人',
			dataIndex: 'createUserName',
			key: 'createUserName',
			width: 100,
		}, {
			title: '创建时间',
			dataIndex: 'createTime',
			key: 'createTime',
			width: 150,
		}, {
			title: '执行时间',
			dataIndex: 'executeTime',
			key: 'executeTime',
			width: 100,
		}, {
			title: '操作状态',
			dataIndex: 'status',
			key: 'status',
			width: 125,
			filters: [, {
				text: '未审批',
				value: 1,
			}, {
				text: '审批通过',
				value: 3,
			}, {
				text: '已发布',
				value: 4,
			}],
		}, {
			title: '操作',
			dataIndex: 'handle',
			width: 200,
			render: (record, index, e) => (
				<span>
		      <a  disabled = { index.status =="未审批" ? '' : "disabled" }  onClick={this.handleAgree.bind(this, record,index)}>同意</a>
		      <span className="ant-divider" />
		      <a  disabled = { index.status =="已发布" ? 'disabled' : "" } onClick={this.handleSuggest.bind(this, record,index)}>建议修改</a>
		      <span className="ant-divider" />
		      <a  disabled = { index.status =="已发布" ? 'disabled' : "" }  onClick={this.handlePublish.bind(this, record,index)}>发布</a>
		      <span className="ant-divider" />
		      <a onClick={this.handleSign.bind(this, record,index)}>签约</a>
		    </span>
			),
		}]
	}
//					var arr = ['', '未审批', '', '审批通过', '已发布'];
	//	签约按钮
	handleSign(e, record, index) {
		console.log(record)
		var contractProductId=record.contractProductId;
		var jsonContract='';
		var id=record.id;
		console.log(contractProductId);
	 var par=param({
			 "contractId": contractProductId,
	 })
	 reqwest(
		 api(url.productPreSign,par)
	 ).then((res) => {
			var preSignData = res.result;
			console.log(preSignData);
			jsonContract = preSignData.contract;
			jsonContract = JSON.parse(jsonContract);
			var fullfiledContract = ContractUtils.field_fullfil(jsonContract, "Contract_Signature");
			var cmpPubkey = preSignData.publishPubkey
			var cmpPrikey = preSignData.publishPrikey;
			var currentUserPubkey = preSignData.currentUserPubkey;
			var currentUserPrikey = preSignData.currentUserPrikey;
			fullfiledContract = ContractUtils.addOwners(fullfiledContract, currentUserPubkey);
			ContractUtils.sign(fullfiledContract, cmpPubkey, cmpPrikey);
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
			 api(url.productSign,par,datas)
		 ).then((req) => {
			 console.log(req)
			 this.getData(-1)
		 });
	 });
	}
		//	同意按钮
		handleAgree(e, record, index) {
			console.log(record)
			console.log(this)

			var par=param({
					"id": record.id,
					"auditOp": 3
			})
			console.log(index)
			reqwest(
				api(url.productOperate,par)
			).then((req) => {
				console.log(req)
 			 this.getData(-1)
			});
		}
	//	建议按钮
	handleSuggest(e, record, index) {
		console.log(record)
		console.log(this)
		this.setState({
			record: record
		})
		console.log(index)
		this.showModal();
	}
	//	发布按钮
	handlePublish(e, record, index) {
		console.log(record)
		console.log(this)
		console.log(index)
		this.setState({
			record: record
		})
		this.showModalSign()
	}
//	选择框
	handleSelect = (e) => {
		console.log(e);
		this.setState({
			selectKey:e
		})
		console.log(this.state)
	}
	handleOk = (e) => {
		console.log(e);
		this.setState({
			visible: false,
		});
		console.log(this.state.record)
		console.log(this.state.suggest)
		var par=param({
			"id": this.state.record.id,
			"auditOp": 2,
			"suggestion": this.state.suggest
		})
		reqwest(
			api(url.productOperate,par)
		).then((req) => {
			console.log(req)
		});

	}
	handleCancel = (e) => {
		console.log(e);
		this.setState({
			visible: false,
		});
	}
	handleCancelSign = (e) => {
		console.log(e);
		this.setState({
			visibleSign: false,
		});
	}
	handleOkSign = (e) => {
		console.log(e);
		this.setState({
			visibleSign: false,
		});
		console.log(this.state.selectKey)
		console.log(this.state.record)
		var jsonContract='';
		var id=this.state.record.id;
		console.log(id)
		var contractId=this.state.record.contractId;
		var contractProductId=this.state.record.contractProductId;
	   var pubkey = this.state.selectKey;
		 console.log(contractProductId);
		var par=param({
				"contractId": contractProductId,
		})
		reqwest(
			api(url.productOriginContract,par)
		).then((res) => {
      jsonContract = res.result;
      jsonContract = JSON.parse(jsonContract);
      console.log("-----***********************************---");
      console.log(jsonContract);
      jsonContract['ContractBody']['ContractOwners'] = null;
      var fullfiledContract = ContractUtils.field_fullfil(jsonContract, "Contract_Create");
      fullfiledContract = ContractUtils.addOwners(fullfiledContract, pubkey);
      ContractUtils.hash(fullfiledContract);
			var par=param({
        "id": id,
        "auditOp": 4,
        "publishOwner": pubkey
			})
			var datas={
				"jsonContract": JSON.stringify(fullfiledContract),
			}
			reqwest(
				api(url.productPublish,par,datas)
			).then((req) => {
				console.log(req)
 			 this.getData(-1)
			});
		});
	}
	showModal = () => {
		this.setState({
			visible: true,
		});
	}
	showModalSign = () => {
		this.setState({
			visibleSign: true,
		});
	}
	suggestCon = (e) => {
		this.setState({
			suggest: e.target.value
		})
	}
	render() {
		let {
			contractId,
			id,
			selectKey,
			keyList,
			visibleSign,
			visible,
			record,
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
			authes,
			msg,
		} = this.props

		var keys=[];
        this.state.keyList.forEach(function(item,index){
            keys.push(
              <Option key={'keys'+index} value={item.pubkey}>{item.name}</Option>
            )
        })

					// <SidebarPage record={this.state.record} contractId={this.state.record.contractId} id={this.state.record.id}/>
		return(
			<div>
        {/*侧边栏*/}
        <RightModel show={isPage} handleShowArea={this.handleShowArea}>
          <div className='content-page'>
            <SidebarPage/>
          </div>
        </RightModel>
        {/*建议修改*/}
        <Modal
          title="修改建议"
          record={this.state.record}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="完成"
          cancelText="取消"
        >
	    	<TextArea placeholder="输入修改建议" autosize={{ minRows: 2, maxRows: 6 }} ref="suggestCon" value={this.state.suggest} onChange={this.suggestCon}/>
        </Modal>
        {/*发布*/}
        <Modal
          title="签名"
          recordSign={this.state.record}
          visible={this.state.visibleSign}
          onOk={this.handleOkSign}
          onCancel={this.handleCancelSign}
          okText="确认"
          cancelText="取消"
        >
		    <Select placeholder="请选择签名" style={{ "width": "120px","marginLeft":"175px" }} onSelect={this.handleSelect.bind(this)}>
              {keys }
		    </Select>
        </Modal>

				<p>{msg}</p>
        <Table
          className="order-mange list-table"
          bordered
          dataSource={data}
          pagination={pagination}
          onChange={this.handlePageChange.bind(this)}
          columns={this.columns}
          loading={loading}
          onRowClick={this.handleTableClick.bind(this)}
	        rowKey={record => record.id}
        />
      </div>
		)
	}

		//	获取数据
		getDataPage(status,pagination) {
			var par=param({
				"status": status,
				"pageNum": pagination.current,
				"pageSize": pagination.pageSize,
			})
			reqwest(
				api(url.productList,par)
			).then((req) => {
				console.log(req)
				if(req.result) {
					var data = req.result.data;
					for(var i = 0; i < data.length; i++) {
						if(data[i]["executeTime"] == null) {
							data[i]["executeTime"] = '---';
						}
						var arr = ['', '未审批', '', '审批通过', '已发布'];
						data[i].status = arr[data[i].status];
					}
					pagination.total=req.result.total;
					this.setState({
						data: data,
						pagination:pagination,
					})
				}
			});
		}

	//	获取数据
	getData(status) {
		var par=param({
			"status": status,
			"pageSize": 100
		})
		reqwest(
			api(url.productList,par)
		).then((req) => {
			console.log(req)
			if(req.result) {
				var data = req.result.data;
				for(var i = 0; i < data.length; i++) {
					if(data[i]["executeTime"] == null) {
						data[i]["executeTime"] = '---';
					}
					var arr = ['', '未审批', '', '审批通过', '已发布'];
					data[i].status = arr[data[i].status];
				}
				this.setState({
					data: data,
				})
			}
		});
	}

	componentDidMount() {
	this.getData(-1)
		var par=param({})
		reqwest(api(url.userList,par)).then((req) => {
			console.log(req)
			this.setState({
				keyList:req.result.data
			})
		});
	}
	componentWillReceiveProps(props) {
		if(props.searchParams){
			console.log(props.searchParams)
			let pagination=this.state.pagination;
			let searchParams=props.searchParams
			var par=param({
				"name":searchParams.itemTitle,
				"contractId":searchParams.orderCode,
				"startTime":searchParams.createTimeStart,
				"endTime":searchParams.createTimeEnd,
				"status": -1,
				"pageNum": 1,
				"pageSize": 100,
			})
			reqwest(
					api(url.productList,par)
				).then((req) => {
				console.log(req)
				if(req.result){
					var data = req.result.data;
					for(var i = 0; i < data.length; i++) {
						if(data[i]["executeTime"] == null) {
							data[i]["executeTime"] = '---';
						}
						var arr = ['', '未审批', '', '审批通过', '已发布'];
						data[i].status = arr[data[i].status];
					}
					// pagination.total=req.result.total;
					// pagination.current=req.result.pageNum;
					this.setState({
						data: data,
						// pagination:pagination,
					})
				}
			});
		}
	}
	//点击Table中的每行
	handleTableClick(record, index, e) {
		console.log(record);
		this.props.fetchDate(record.id,record.contractProductId)
		let flag = true
		if(e.target.localName !== 'td') {
			flag = false
		}
		if(flag) {
			this.setState({
				isPage: !this.state.isPage,
				// record: record
			})
			console.log(this.state)
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
		console.log(e)
	}

	handlePageChange(pagination, filters) {
		const pager = { ...this.state.pagination
		};
		console.log(pagination)
		pager.current = pagination.current;
		this.setState({
			pagination: pager,
		});
		if(filters.status) {
			console.log(5555)
			this.getData(filters.status[0])
		} else {
			console.log(4444)
			this.getData(-1)
		}
	}
}

const mapStateToProps = (state) => {
	console.log(state);
  return {
    ...state.productSidebar,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchDate: (id,contractId) => {
			console.log(id);
			console.log(contractId);
      productSidebar(dispatch,id,contractId);
			// proSidCon(dispatch,contractId)
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListTable)

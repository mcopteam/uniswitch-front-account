import './index.less'
import React, {
	Component
} from 'react'
import {
  connect
} from 'react-redux'
import { Row, Col, Modal, Table, Icon, Button, message  } from 'antd';
const {
	Columns,
} = Table;
import {
	btnIsShow,
}from '../../../common/btnIsShow'
import {
	button_list,
}from '../../../common/button_list'
import {
	queryButtonList,
}from '../../../actions/button_list'
import {
	api,
} from '../../../common/api_server'
import {
	url,
} from '../../../common/url_api'
import {
	param,
}from '../../../common/param'
import reqwest from 'reqwest';
import DetailForm from './detail'
import InfoForm from './info'
import { actionBlockchainSearch, actionBlockchainDelete, actionBlockchainTest } from  '../../../actions/blockchain-preserve'
const confirm = Modal.confirm;
class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			width:800,
			blockchainDetail:{},
			conInfo:{},
			detailVisible:false,
			editVisible:false,
		}
	}
//	编辑按钮
	handleEdit(record, index) {
    this.setState({
      editVisible: true,
			conInfo:index,
    });
	}
//	查看详细按钮
	handleDetail(record, index) {
		console.log(index);
	  var par=param({
	    "id":index.id,
	  })
	  reqwest(
	  	api(url.blockchainDetail,par)
	  ).then((req) => {
	  	if (req.code == 0) {
	  		message.success(req.msg);
				let blockchainList=req.result
        blockchainList.blockChain.storeContract=blockchainList.blockChain.storeContract?"是":"否";
        blockchainList.blockChain.valid=blockchainList.blockChain.valid?"是":"否";
				console.log(blockchainList);
				this.setState({
		      detailVisible: true,
					blockchainDetail:blockchainList,
				})
	  	}else{
	  		message.error(req.msg);
	  	}
	  });
	}
//	测试按钮
	handleTest(record, index) {
		console.log(index);
		this.props.testData(index.id)
	}
//	删除按钮
	handleDelete(record, index) {
		console.log(index);
		this.props.deleteData(index.id)
	}

	componentDidMount() {
		this.props.fetchData(1)
		this.props.btnList()
		// this.render()
	}
	// 详细modal
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
	// 编辑modal
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
	queryBlockChainList = (e) => {
		this.props.fetchData()
  }
	render() {
		let { blockchainList,
				buttonList
		 } = this.props
		 console.log(blockchainList);
		 const columns = [{
		 	title: '区块链类型',
		 	dataIndex: 'type',
		 	key: 'type',
		 	width: '10%',
		 }, {
		 	title: '区块链名称',
		 	dataIndex: 'name',
		 	key: 'name',
		 	width: '10%',
		 }, {
		 	title: '区块链链接',
		 	dataIndex: 'ip',
		 	key: 'ip',
		 	width: '10%',
		 },  {
		 	title: '区块链Port',
		 	dataIndex: 'port',
		 	key: 'port',
		 	width: '10%',
		 }, {
		 	title: '是否存储合约',
		 	dataIndex: 'storeContract',
		 	key: 'storeContract',
		 	width: '10%',
		 }, {
		 	title: '是否生效',
		 	dataIndex: 'valid',
		 	key: 'valid',
		 	width: '10%',
		 },{
		 	title: '操作',
		 	dataIndex: 'handle',
		 	width: '20%',
		 	render: (record, index, e) => (
		 		<span>
		 				<a  onClick={this.handleEdit.bind(this, record,index)}>编辑</a>
		 				<span className="ant-divider"/>
		 				<a  onClick={this.handleDetail.bind(this, record,index)}>详细</a>
		 				<span className="ant-divider"/>
		 				<a  onClick={this.handleTest.bind(this, record,index)}>测试</a>
		 				<span className="ant-divider"/>
		 				<a  onClick={this.handleDelete.bind(this, record,index)}>删除</a>
		 			</span>
		 	),
		 }];
		//  <a  onClick={this.handleEdit.bind(this, record,index)} style={{display:btnIsShow(buttonList,button_list.edit_accountKey)?"inline-block":"none"}}>{button_list.edit_accountName}</a>
		//  <span className="ant-divider"  style={{display:btnIsShow(buttonList,button_list.edit_accountKey)?"inline-block":"none"}}/>
		return(
			<div>
				<Row
				style={{'marginTop': '10px','marginBottom': '10px'}}
				>
				<Col span={4} offset={20} style={{'textAlign':'right'}}>
        	<Button type="primary" onClick={this.queryBlockChainList} >查询</Button>
				</Col>
				</Row>
				<Table
					columns={columns}
	        rowKey={record => record.createTime}
	        dataSource={blockchainList}
					pagination={false}
	      />
	        <Modal
						footer={null}
	          title="编辑"
	          visible={this.state.editVisible}
	          onOk={this.handleEditOk}
	          onCancel={this.handleEditCancel}
	          okText="确定"
	          cancelText="取消"
	        >
						<DetailForm onOk={this.handleEditOk} conInfo={this.state.conInfo}/>
	        </Modal>
	        <Modal
						width={this.state.width}
						footer={null}
	          title="查看详细"
	          visible={this.state.detailVisible}
	          onOk={this.handleDetailOk}
	          onCancel={this.handleDetailCancel}
	          okText="确定"
	          cancelText="取消"
	        >
						<InfoForm blockchainDetail={this.state.blockchainDetail}/>
	        </Modal>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
  return {
    ...state.blockchainList,
    ...state.buttonList
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (init) => {
      actionBlockchainSearch(dispatch,init);
    },
    deleteData: (id) => {
      actionBlockchainDelete(dispatch,id);
    },
    testData: (id) => {
      actionBlockchainTest(dispatch,id);
    },
		btnList: () => {
			queryButtonList(dispatch)
		}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)

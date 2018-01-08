import './index.less'
import React, {
	Component
} from 'react'
import {
  connect
} from 'react-redux'
import { Modal, Table, Icon, Button, message  } from 'antd';
import reqwest from 'reqwest';
import {
	api,
} from '../../../common/api_server'
import {
	url,
} from '../../../common/url_api'
import {
	param,
}from '../../../common/param'
import DetailForm from './detail'
import InfoForm from './info'
import { metadataDataList, metadataDataListCopy } from '../../../actions/metadata-datas'
const confirm = Modal.confirm;
const {
	Columns,
} = Table;
class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			editWidth:600,
			searchParams:{},
			editVisible:false,
			detailVisible:false,
			preInfo:{},
			id:"",
			total: 20,
			loading: false,
			pagination: {
				current: 1,
				total: 0,
				pageSize: 6,
			},
		}
	}
//	上架按钮
	handlePutaway(record, index) {
		var _this=this;
		confirm({
			title: '您确定要上架此商品?',
			content: '上架此商品',
			okText: '确定',
			okType: 'danger',
			cancelText: '取消',
			onOk() {
				console.log(index);
				var par=param({
					"dataId":index.dataId,
				})
				reqwest(
					api(url.metadataDataPutaway,par)
				).then((req) => {
					console.log(req)
					if (req.code == 0) {
						message.success(req.msg);
						_this.props.fetchDataCopy(_this.state.searchParams,_this.state.pagination)
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
//	下架按钮
	handleSoldOut(record, index) {
		var _this=this;
		confirm({
			title: '您确定要下架此商品?',
			content: '下架此商品',
			okText: '确定',
			okType: 'danger',
			cancelText: '取消',
			onOk() {
				console.log(index);
				var par=param({
					"dataId":index.dataId,
				})
				reqwest(
					api(url.metadataDataSoldOut,par)
				).then((req) => {
					console.log(req)
					if (req.code == 0) {
						message.success(req.msg);
							_this.props.fetchDataCopy(_this.state.searchParams,_this.state.pagination)
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
//	删除按钮
	handelDelete(record, index) {
		var _this=this;
		confirm({
			title: '您确定要删除此商品?',
			content: '删除此商品',
			okText: '确定',
			okType: 'danger',
			cancelText: '取消',
			onOk() {
				console.log(index);
				var par=param({
					"dataId":index.dataId,
				})
				reqwest(
					api(url.metadataDataDelete,par)
				).then((req) => {
					console.log(req)
					if (req.code == 0) {
						message.success(req.msg);
							_this.props.fetchDataCopy(_this.state.searchParams,_this.state.pagination)
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
	getDataEdit(dataId){
		var par=param({
			"dataId":dataId,
		})
		reqwest(
			api(url.getBaseDataDetail,par)
		).then((req) => {
			console.log(req)
			if (req.code == 0) {
				// message.success(req.msg);
				this.setState({
		      editVisible: true,
					preInfo:req.result,
				})
			}else{
				// message.error(req.msg);
			}
		});
	}
//	编辑按钮
	handelUpdate(record, index) {
		console.log(index);
		this.getDataEdit(index.dataId)
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
	getDatadetail(dataId){
		var par=param({
			"dataId":dataId,
		})
		reqwest(
			api(url.getBaseDataDetail,par)
		).then((req) => {
			console.log(req)
			if (req.code == 0) {
				// message.success(req.msg);
				this.setState({
		      detailVisible: true,
					preInfo:req.result,
				})
			}else{
				// message.error(req.msg);
			}
		});
	}
//	查看详细按钮
	handleDetail(record, index) {
		this.getDatadetail(index.dataId)
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
			this.props.fetchDataCopy(this.state.searchParams,this.state.pagination)
		});
	}
	//
	componentDidMount() {
		this.props.fetchDataCopy()
		this.render()
	}
	componentWillReceiveProps(props){
		console.log(props.searchParams);
    this.setState({
			searchParams:props.searchParams
    })
	}
	render() {
		let { metaDataList,
				buttonList
		 } = this.props
		 const columns = [{
		 	title: '数据ID',
		 	dataIndex: 'dataId',
		 	key: 'dataId',
		 	width: '10%',
		 }, {
		 	title: '数据名称',
		 	dataIndex: 'dataName',
		 	key: 'dataName',
		 	width: '10%',
		 }, {
		 	title: '数据分类',
		 	dataIndex: 'categoryName',
		 	key: 'categoryName',
		 	width: '10%',
		 }, {
		 	title: '数据标签',
		 	dataIndex: 'dataLable',
		 	key: 'dataLable',
		 	width: '10%',
		 },  {
		 	title: '数据状态',
		 	dataIndex: 'dataStatus',
		 	key: 'dataStatus',
		 	width: '10%',
		 }, {
		 	title: '操作',
		 	dataIndex: 'handle',
		 	width: '20%',
		 	render: (record, index, e) => (
		 		<span>
						<a  onClick={this.handleDetail.bind(this, record,index)}>详细</a>
						<span className="ant-divider"/>
						<a  onClick={this.handelUpdate.bind(this, record,index)}>编辑</a>
						<span className="ant-divider"/>
		 				<a  onClick={this.handlePutaway.bind(this, record,index)}>上架</a>
		 				<span className="ant-divider"/>
		 				<a  onClick={this.handleSoldOut.bind(this, record,index)}>下架</a>
		 				<span className="ant-divider"/>
		 				<a  onClick={this.handelDelete.bind(this, record,index)}>删除</a>
		 			</span>
		 	),
		 }];

		return(
			<div>
				<Table
					columns={columns}
	        rowKey={record => record.registered}
	        dataSource={metaDataList.data}
	        pagination={{...this.state.pagination,"total":metaDataList.total,"current":metaDataList.pageNum}}
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
					<InfoForm preInfo={this.state.preInfo}/>
        </Modal>
        <Modal
					footer={null}
          title="编辑"
					width={this.state.editWidth}
          visible={this.state.editVisible}
          onOk={this.handleEditOk}
          onCancel={this.handleEditCancel}
          okText="确定"
          cancelText="取消"
          ref="editModal"
        >
					<DetailForm onOk={this.handleEditOk} preInfo={this.state.preInfo} search={this.state.searchParams} pag={this.state.pagination}/>
        </Modal>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
  return {
    ...state.metaDataList,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (search,pag) => {
      metadataDataList(dispatch,search,pag);
    },
    fetchDataCopy: (search,pag) => {
      metadataDataListCopy(dispatch,search,pag);
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)

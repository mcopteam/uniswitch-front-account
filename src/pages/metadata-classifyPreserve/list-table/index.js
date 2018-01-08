import './index.less'
import React, {
	Component
} from 'react'
import {
  connect
} from 'react-redux'
import { Modal, Table, Icon, Button, message  } from 'antd';
import DetailForm from './detail'
import InfoForm from './info'
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
import { metadataCategoryList, metadataCategoryListCopy } from  '../../../actions/metadata-category'

const confirm = Modal.confirm;
const {
	Columns,
} = Table;
class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			searchParams:{},
			preInfo:{},
			detailVisible:false,
			editVisible:false,
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
	    this.setState({
	      detailVisible: true,
				preInfo:index,
	    });
	}
//	删除按钮
	handelOff(record, index) {
		var _this=this;
		confirm({
			title: '您确定要删除此账户?',
			content: '删除账户所有信息',
			okText: '确定',
			okType: 'danger',
			cancelText: '取消',
			onOk() {
				console.log(index);
				var par=param({
					"categoryId":index.categoryId,
				})
				reqwest(
					api(url.getMetadataCategoryDelete,par)
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
	//分页 筛选状态
	handleTableChange = (pagination, filters, sorter) => {
		const pager = { ...this.state.pagination
		};
		pager.current = pagination.current;
		this.setState({
			pagination: pager,
		}, () => {
			this.props.fetchDataCopy(this.state.searchParams,this.state.pagination)
		});
	}
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
			let {metaGategoryList}=this.props
		  const columns = [{
		 	title: '分类ID',
		 	dataIndex: 'categoryId',
		 	key: 'categoryId',
		 	width: '10%',
		 }, {
		 	title: '分类编码',
		 	dataIndex: 'categoryCharSet',
		 	key: 'categoryCharSet',
		 	width: '20%',
		 }, {
		 	title: '分类名称',
		 	dataIndex: 'categoryName',
		 	key: 'categoryName',
		 	width: '20%',
		 },  {
		 	title: '父级分类',
		 	dataIndex: 'parentName',
		 	key: 'parentName',
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
		 				<a  onClick={this.handelOff.bind(this, record,index)}>删除</a>
		 			</span>
		 	),
		 }];

		return(
			<div>
				<Table
					columns={columns}
	        rowKey={record => record.registered}
	        dataSource={metaGategoryList.data}
	        pagination={{...this.state.pagination,"total":metaGategoryList.total,"current":metaGategoryList.pageNum}}
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
    ...state.metaGategoryList,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (search,pag) => {
      metadataCategoryList(dispatch,search,pag);
    },
    fetchDataCopy: (search,pag) => {
      metadataCategoryListCopy(dispatch,search,pag);
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)

import './index.less'
import React, {
	Component
} from 'react'
import {
  connect
} from 'react-redux'
import { Modal, Table, Icon, Button  } from 'antd';
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
import CreateForm from './create'
import InfoForm from './info'
import { preList, preListCopy } from '../../../actions/preList'
const confirm = Modal.confirm;
class App extends Component {
	constructor(props) {
		super()
		this.state = {
			searchParams:{},
			infoWidth:600,
			preInfo:{},
			id:"12342340980",
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

	//	查看详细按钮
	handleDetail(record, index) {
		console.log(index);
			this.setState({
				detailVisible: true,
				preInfo:index,
			});
	}
//	资产创建按钮
	handleCreate(record, index) {
		console.log(index);
	    this.setState({
	      editVisible: true,
				preInfo:index,
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
			console.log(this.state);
			this.props.fetchDateCopy(this.state.searchParams,this.state.pagination)
	});
	}
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
		console.log(preList);
		const columns = [{
			title: '账户名称',
			dataIndex: 'username',
			key: 'username',
			width: '10%',
		}, {
			title: '账户角色',
			dataIndex: 'rolename',
			key: 'rolename',
			width: '10%',
		},{
			title: '关联账号',
			dataIndex: 'relate',
			key: 'relate',
			width: '30%',
		},  {
			title: '操作',
			dataIndex: 'handle',
			width: '20%',
			render: (record, index, e) => (
				<span>
						<a disabled = { index.status =="创建中" ? 'disabled' : "" }  onClick={this.handleDetail.bind(this, record,index)} style={{display:btnIsShow(buttonList,button_list.detail_accountassetKey)?"inline-block":"none"}}>{button_list.detail_accountassetName}</a>
			      <span className="ant-divider" style={{display:btnIsShow(buttonList,button_list.detail_accountassetKey)?"inline-block":"none"}} />
			      <a onClick={this.handleCreate.bind(this, record,index)} style={{display:btnIsShow(buttonList,button_list.create_accountassetKey)?"inline-block":"none"}}>{button_list.create_accountassetName}</a>
			    </span>
			),
		}];
		return(
			<div>
				<Table columns={columns}
	        rowKey={record => record.registered}
	        dataSource={preList.data}
	        pagination={{...this.state.pagination,"total":preList.total,"current":preList.pageNum}}
	        loading={this.state.loading}
					onChange={this.handleTableChange.bind(this)}
	      />
        <Modal
					footer={null}
          title="查看详细"
					width={this.state.infoWidth}
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
          title="资产创建"
          visible={this.state.editVisible}
          onOk={this.handleEditOk}
          onCancel={this.handleEditCancel}
          okText="确定"
          cancelText="取消"
          ref="createModal"
        >
					<CreateForm preInfo={this.state.preInfo} id={this.state.id} onOk={this.handleEditOk}/>
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

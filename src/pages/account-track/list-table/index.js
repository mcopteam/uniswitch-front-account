import './index.less'
import React, {
	Component
} from 'react'
import {
  connect
} from 'react-redux'
import { Modal, Table, Badge, Menu, Dropdown, Icon } from 'antd';
import reqwest from 'reqwest';
import StatusCon from './status'
import { preList,preListCopy } from '../../../actions/preList'
import { accountRecord } from '../../../actions/preList'
import InfoForm from './info'
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


class ListTable extends Component {

  constructor(props) {
  	super(props)
  	this.state = {
			searchParams:{},
			preInfo:{},
			id:"",
			detailVisible:false,
			statuslVisible:false,
      isPage: false,
      width:800,
			infoWidth:600,
			pagination: {
				current: 1,
				total: 0,
				pageSize: 6,
			},
  	}
  }
//	查看详细按钮
	handleDetail(index) {
		console.log(index);
	    this.setState({
	      detailVisible: true,
				preInfo:index,
	    });
	}
  componentDidMount(){
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
  handelTrack(index){
		console.log(index);
		this.props.fetchRecord(index.username)
	    this.setState({
	      statuslVisible: true,
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
  render(){
		let {
			preList,
			buttonList
		} = this.props
		console.log(buttonList);
		const columns = [
			{ title: '账户名称', dataIndex: 'username', key: 'username' },
			{ title: '账户角色', dataIndex: 'rolename', key: 'rolename' },
			{ title: '账户状态', dataIndex: 'statusName', key: 'statusName' },
			{ title: '是否生效', dataIndex: 'validFlagName', key: 'validFlagName' },
			{ title: '操作', key: 'operation', render: (index) => (
				<span>
					<a onClick={this.handleDetail.bind(this,index)} style={{display:btnIsShow(buttonList,button_list.detail_accountinfoKey)?"inline-block":"none"}}>{button_list.detail_accountinfoName}</a>
					<span className="ant-divider" style={{display:btnIsShow(buttonList,button_list.detail_accountinfoKey)?"inline-block":"none"}} />
					<a onClick={this.handelTrack.bind(this,index)}>状态跟踪</a>
				</span>
			)},
		];
    return (
      <div>
        <div>
          <Table
            className="components-table-demo-nested"
            columns={columns}
		        pagination={{...this.state.pagination,"total":preList.total,"current":preList.pageNum}}
						onChange={this.handleTableChange.bind(this)}
            dataSource={preList.data}
          />
        </div>
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
					<InfoForm preInfo={this.state.preInfo}/>
        </Modal>

        <Modal
					footer={null}
					width={this.state.width}
          title="状态跟踪"
          visible={this.state.statuslVisible}
          onOk={this.handleStatusOk}
          onCancel={this.handleStatusCancel}
          okText="确定"
          cancelText="取消"
          ref="statusModal"
        >
					<StatusCon preInfo={this.state.preInfo}/>
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
		fetchRecord:(search) => {
			accountRecord(dispatch,search)
		},
		btnList: () => {
			queryButtonList(dispatch)
		}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListTable)

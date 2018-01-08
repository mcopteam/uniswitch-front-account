import './index.less'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Table, Icon, Button, Form, Input  } from 'antd';
import reqwest from 'reqwest';
import $ from 'jquery';
const { Columns } = Table;
import { api } from '../../../common/api_server'
import { url } from '../../../common/url_api'
import { param }from '../../../common/param'
import EditModal from '../btn-edit'
import { actionLimitBtnSearch, actionLimitBtnSearchCopy, actionLimitBtnDelete } from '../../../actions/limit-btn'
const confirm = Modal.confirm;
const FormItem = Form.Item;

class Btn extends Component {
	constructor(props) {
		console.log(props);
		super()
		this.state = {
			searchParams:{},
			showEditModal:false,
			showAuthModal:false,
			menuInfo: {},
			total: 20,
			loading: false,
			pagination: {
				current: 1,
				total: 0,
				pageSize: 6,
			},
		}
		this.columns = [{
			title: '按钮ID',
			dataIndex: 'id',
			key: 'id',
			width: '20%',
		}, {
			title: '按钮名称',
			dataIndex: 'name',
			key: 'name',
			width: '20%',
		}, {
			title: '按钮描述',
			dataIndex: 'note',
			key: 'note',
			width: '20%',
		}, {
			title: '操作',
			dataIndex: 'handle',
			width: '20%',
			render: (text, record) => (
				<span>
			      <a  onClick={this.handleEdit.bind(this, text, record)}>编辑</a>
			      <span className="ant-divider" />
			      <a  onClick={this.handelOff.bind(this, text, record)}>删除</a>
			    </span>
			),
		}];
	}
	render() {
		let {getFieldDecorator} = this.props.form
		let {showEditModal, menuInfo} = this.state
		let { btnList } = this.props
		return(
			<div>
				<Table
					columns={this.columns}
	        rowKey={record => record.registered}
	        dataSource={btnList.data}
	        pagination={{...this.state.pagination,"total":btnList.total,"current":btnList.pageNum}}
	        loading={this.state.loading}
					onChange={this.handleTableChange.bind(this)}
	      />
				<EditModal
            show={showEditModal}
            menuInfo={menuInfo}
            onCancel={() => {
              this.setState({
                showEditModal: false,
              })
            }}
           onOk={this.handleEditMenu.bind(this)}
					 search={this.state.searchParams}
					 pag={this.state.pagination}
        />
			</div>
		);
	}
	//	编辑按钮
	handleEdit(text, record) {
		this.setState({
			showEditModal: true,
			menuInfo: record,
		});
	}
	handleEditMenu() {
    this.setState({
      showEditModal: false,
    })
		// pagination: {
		// 	...this.state.pagination,
		// 	pager: 1,
		// }
	}

	//	删除按钮
	handelOff(text, record) {
		let _this=this;
		confirm({
			title: '您确定要删除此按钮?',
			content: '删除后将删除按钮所有信息',
			okText: '确定',
			okType: 'danger',
			cancelText: '取消',
			onOk() {
				console.log(record.id, 'menuId')
				_this.props.btnDelete(record.id, _this.state.searchParams, _this.state.pagination)
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
			this.props.fetchDataCopy(this.state.searchParams,this.state.pagination)
		});
	}

	componentWillReceiveProps(props){
		console.log(props.searchParams);
		this.setState({
			searchParams:props.searchParams
		})
	}
	componentDidMount() {
		this.props.fetchDataCopy()
	}
}
const mapStateToProps = (state) => {
	console.log(state);
  return {
    ...state.limitBtn,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (search, pag) => {
      actionLimitBtnSearch(dispatch, search, pag);
    },
		btnDelete:(id, search, pag) => {
			actionLimitBtnDelete(dispatch, id, search, pag)
		},
    fetchDataCopy: (search, pag) => {
      actionLimitBtnSearchCopy(dispatch, search, pag);
    },
  }
}
const BtnList = Form.create()(Btn);
export default connect(mapStateToProps, mapDispatchToProps)(BtnList)

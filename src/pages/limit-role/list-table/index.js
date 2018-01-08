import './index.less'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Table, Icon, Button, Form, Input, message  } from 'antd';
import reqwest from 'reqwest';
import $ from 'jquery';
const { Columns } = Table;
import { api } from '../../../common/api_server'
import { url } from '../../../common/url_api'
import { param }from '../../../common/param'
import EditModal from '../role-edit'
import InfoForm from '../role-auth'
import { actionLimitRoleSearch,actionLimitRoleSearchCopy,actionRoleDelete,actionRoleLimitData,actionRoleLimitFun } from '../../../actions/limit-role'
import {
	btnIsShow,
}from '../../../common/btnIsShow'
import {
	button_list,
}from '../../../common/button_list'
import {
	queryButtonList,
}from '../../../actions/button_list'
const confirm = Modal.confirm;
const FormItem = Form.Item;

class Role extends Component {
	constructor(props) {
		super()
		this.state = {
			searchParams:{},
			id:'',
			width:900,
			showEditModal:false,
			showAuthModal:false,
			roleInfo: {},
			total: 20,
			loading: false,
			pagination: {
				current: 1,
				total: 0,
				pageSize: 6,
			},
		}
	}
	render() {
		let {getFieldDecorator} = this.props.form
		let {showEditModal, roleInfo} = this.state
		let { roleList, priviDataList, priviFunList,buttonList } = this.props

		const columns = [{
			title: '角色ID',
			dataIndex: 'id',
			key: 'id',
			width: '10%',
		}, {
			title: '角色名称',
			dataIndex: 'name',
			key: 'name',
			width: '20%',
		}, {
			title: '角色描述',
			dataIndex: 'note',
			key: 'note',
			width: '30%',
		}, {
			title: '操作',
			dataIndex: 'handle',
			width: '20%',
			render: (text, record) => (
				<span>
			      <a  onClick={this.handleEdit.bind(this, text, record)} style={{display:btnIsShow(buttonList,button_list.edit_roleKey)?"inline-block":"none"}}>{button_list.edit_roleName}</a>
			      <span className="ant-divider"  style={{display:btnIsShow(buttonList,button_list.edit_roleKey)?"inline-block":"none"}}/>
			      <a  onClick={this.handleDetail.bind(this, text, record)} style={{display:btnIsShow(buttonList,button_list.maintain_rolerightKey)?"inline-block":"none"}}>{button_list.maintain_rolerightName}</a>
			      <span className="ant-divider"  style={{display:btnIsShow(buttonList,button_list.maintain_rolerightKey)?"inline-block":"none"}}/>
			      <a  onClick={this.handelOff.bind(this, text, record)} style={{display:btnIsShow(buttonList,button_list.delete_roleKey)?"inline-block":"none"}}>{button_list.delete_roleName}</a>
			    </span>
			),
		}];
		return(
			<div>
				<Table
					columns={columns}
	        rowKey={record => record.registered}
	        dataSource={roleList.data}
	        pagination={{...this.state.pagination,"total":roleList.total,"current":roleList.pageNum}}
	        loading={this.state.loading}
					onChange={this.handleTableChange.bind(this)}
	      />
				<EditModal
						search={this.state.searchParams}
						pag={this.state.pagination}
            show={showEditModal}
            roleInfo={roleInfo}
            onCancel={this.handleEditCencel.bind(this)}
            onConfirm={this.handleEditRole.bind(this)}  //点击编辑的确认
        />
        <Modal
					footer={null}
					width={this.state.width}
          title="角色权限"
          visible={this.state.showAuthModal}
          onOk={this.handleDetailOk}
          onCancel={this.handleDetailCancel}
          okText="确定"
          cancelText="取消"
          ref="detailModal"
        >
						<InfoForm roleLimitData={priviDataList} priviFunList={priviFunList} id={this.state.id}/>
        </Modal>
			</div>
		);
	}

	//	编辑按钮
	handleEdit(text, record) {
		this.setState({
			showEditModal: true,
			roleInfo: record,
		});
	}
	//	编辑取消按钮
	handleEditCencel(text, record) {
		this.setState({
			showEditModal: false,
		})
	}
	handleEditRole() {
    this.setState({
      showEditModal: false,
    })
    this.fetchDataCopy(this.state.searchParams,this.state.pagination)
	}

	//	查看详细按钮
	handleDetail(text, record) {
			this.setState({
				showAuthModal: true,
				id:record.id,
			});
			// this.props.roleLimit(record.id)
	}
	//	删除按钮
	handelOff(text, record) {
		let _this=this;
		confirm({
			title: '您确定要删除此角色?',
			content: '删除后将删除角色所有信息',
			okText: '确定',
			okType: 'danger',
			cancelText: '取消',
			onOk() {
				  var par=param({
				    "id":record.id,
				  })
				  reqwest(
				  	api(url.limitRoleListDelete,par)
				  ).then((req) => {
				  	if (req.code == 0) {
				  		message.success(req.msg);
							_this.props.fetchDataCopy(_this.state.searchParams,_this.state.pagination)
				  	}else{
				  		message.error(req.msg);
				  	}
				  });
			},
			onCancel() {
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
		this.props.btnList()
		this.render()
	}

	componentWillReceiveProps(props){
		this.setState({
			searchParams:props.searchParams
		})
	}
	handleDetailOk = (e) => {
		this.setState({
			showAuthModal: false,
		});
	}
	handleDetailCancel = (e) => {
		this.setState({
			showAuthModal: false,
		});
	}
}
const mapStateToProps = (state) => {
  return {
    ...state.limitRole,
		...state.limitRoleData,
    ...state.limitRoleFun,
    ...state.buttonList
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (search,pag) => {
      actionLimitRoleSearch(dispatch, search,pag);
    },
    fetchDataCopy: (search,pag) => {
      actionLimitRoleSearchCopy(dispatch, search,pag);
    },
    roleDelete: (info) => {
      actionRoleDelete(dispatch, info);
    },
		roleLimit:(info) => {
			actionRoleLimitData(dispatch,info)
			actionRoleLimitFun(dispatch,info)
		},
		btnList: () => {
			queryButtonList(dispatch)
		}
  }
}
const RoleModal = Form.create()(Role);
export default connect(mapStateToProps, mapDispatchToProps)(RoleModal)

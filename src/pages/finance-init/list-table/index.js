import './index.less'
import React, {
	Component
} from 'react'
import {
  connect
} from 'react-redux'
import { Link, } from 'react-router'
import { Button, Icon, Table, Input, Modal, message } from 'antd'
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
const {
	columns,
} = Table;
class ListTable extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data:[],
		}
	}
	//	审核通过
	showPassConfirm(e, record, index) {
		let _this=this;
	  confirm({
	    title: '您确定初始化此合约?',
	    content: '确认该合约初始化',
	    okText: '确定',
	    okType: 'danger',
	    cancelText: '取消',
	    onOk() {
	      console.log('OK');
				var par=param({
						"id": record.id,
				})
				reqwest(
					api(url.initContractApp,par)
				).then((req) => {
					console.log(req)
					if (req.code == 0) {
						message.success(req.msg)
						_this.getDataCopy()
					}else {
						message.error(req.msg)
					}
				});
	    },
	    onCancel() {
	      console.log('Cancel');
	    },
	  });
	}

	//	获取数据
	getData() {
		var par=param({})
		reqwest(
			api(url.getContractAppsList,par)
		).then((req) => {
			console.log(req)
			if (req.code == 0) {
				message.success(req.msg)
				this.setState({
					data: req.result,
				})
			}else{
				message.error(req.msg)
			}
		});
	}
		//	获取数据
		getDataCopy() {
			var par=param({})
			reqwest(
				api(url.getContractAppsList,par)
			).then((req) => {
				console.log(req)
				if (req.code == 0) {
					this.setState({
						data: req.result,
					})
				}else{
				}
			});
		}
	render() {
		let {buttonList,}=this.props
			const columns = [{
				title: '序号',
				dataIndex: 'id',
				width: 50,
				key: 'id',
			}, {
				title: '合约产品编码',
				dataIndex: 'contractProductId',
				key: 'contractProductId',
				width: 100,
			}, {
				title: '合约名称',
				dataIndex: 'contractName',
				key: 'contractName',
				width: 100,
			}, {
				title: '合约描述',
				dataIndex: 'description',
				key: 'description',
				width: 200,
			},{
				title: '是否初始化',
				dataIndex: 'alreadyInitText',
				key: 'alreadyInitText',
				width: 100,
			}, {
				title: '操作',
				dataIndex: 'handle',
				width: 50,
				render: (record, index, e) => (
					<span>
						<a  onClick={this.showPassConfirm.bind(this, record,index)}>初始化</a>
					</span>
				),
			}]

		return(
			<div>
        <Table
          className="order-mange list-table"
          bordered
					dataSource={this.state.data}
          columns={columns}
					pagination={false}
        />
      </div>
		)
	}


	componentDidMount() {
		this.getData();
		this.props.btnList()
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

export default connect(mapStateToProps, mapDispatchToProps)(ListTable)

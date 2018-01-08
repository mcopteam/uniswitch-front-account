import './index.less'
import React, {Component} from 'react'
import {
  connect
} from 'react-redux'
import {  Row, Col, Modal, Table, Icon, Button  } from 'antd';
import reqwest from 'reqwest';
import { assetQueryList,assetQueryAmount,assetQueryListCopy,assetQueryAmountCopy  } from '../../../actions/asset-query'
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
class App extends Component {
	constructor(props) {
		super()
		this.state = {
			searchParams:{},
			data: [],
			loading: false,
			pagination: {
				current: 1,
				total: 0,
				pageSize: 6,
			},
		}
		this.columns = [{
			title: '账户账号',
			dataIndex: 'pubKey',
			key: 'pubKey',
			width: '18%',
		},{
			title: '操作日期',
			dataIndex: 'transferDate',
			key: 'transferDate',
			width: '10%',
		}, {
			title: '资产来源',
			dataIndex: 'transferFrom',
			key: 'transferFrom',
			width: '18%',
		}, {
			title: '资产去向',
			dataIndex: 'transferTo',
			key: 'transferTo',
			width: '18%',
		}, {
			title: '资产数量',
			dataIndex: 'transferAmount',
			key: 'transferAmount',
			width: '7%',
		}, {
			title: '是否合约',
			dataIndex: 'transactionType',
			key: 'transactionType',
			width: '7%',
		}, {
			title: '操作类型',
			dataIndex: 'operateType',
			key: 'operateType',
			width: '7%',
		}];
	}

  componentWillReceiveProps(props){
    console.log(props.searchParams);
    this.setState({
      searchParams:props.searchParams
    })
  }

  componentDidMount(){
    this.props.queryCopy();
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
			this.props.queryCopy(this.state.searchParams.user,this.state.searchParams.pubkey,this.state.pagination)
	});
  }
	render() {
		let {assetList,amount}=this.props
    console.log(amount);
    console.log(assetList);
		return(
			<div style={{marginTop:"20px"}}>
				<Row
				style={{'marginTop': '10px','marginBottom': '10px'}}
				>
					<Col span={6}>
							<p className="showInfo">账户余额：<span>{amount}</span>元</p>
					</Col>
			 </Row>
				<Table
					columns={this.columns}
	        rowKey={record => record.dataIndex}
	        dataSource={assetList.data}
	        pagination={{...this.state.pagination,"total":assetList.total,"current":assetList.pageNum}}
	        loading={this.state.loading}
					onChange={this.handleTableChange.bind(this)}
	      />
			</div>
		);
	}
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    ...state.assetQueryList,
    ...state.assetQueryAmount,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    query:(id,pubkey,pag) => {
      assetQueryList(dispatch,id,pubkey,pag)
      assetQueryAmount(dispatch,id,pubkey)
    },
    queryCopy:(id,pubkey,pag) => {
      assetQueryListCopy(dispatch,id,pubkey,pag)
      assetQueryAmountCopy(dispatch,id,pubkey)
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)

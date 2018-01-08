import './index.less'
import React, {Component} from 'react'
import {
  connect
} from 'react-redux'
import PageTitle from '../../components/page-title'
import SearchGroup from './search-group'
import ListTable from './list-table'
import ImportBtn from './link-group/importBtn'
import { Row, Col, Button, message} from 'antd';
import reqwest from 'reqwest';
import {port,} from '../../common/port'
import $ from 'jquery';
import {
	api,
} from '../../common/api_server'
import {
	param,
}from '../../common/param'
import {
	url,
}from '../../common/url_api'
import {
	btnIsShow,
}from '../../common/btnIsShow'
import {
	button_list,
}from '../../common/button_list'
import {
	queryButtonList,
}from '../../actions/button_list'
//
//	        	<SearchGroup onSearch={this.handleSearchChange.bind(this)} />
class contractFile extends Component {
  constructor(props){
    super()
    this.state = {
      info:{},
    	isUpdate:{},
      searchParams: {}, // 搜索参数
    }
  }
 	handleSearch(search){
		console.log(search);
		this.setState({
			searchParams:search
		})
 	}
  handleInfo(info){
	    this.setState({
	      info
	    })
	    console.log(this.state)
  }
  exportFile(){
		var searchParams=this.state.searchParams;
		if(searchParams.effectSelect=="0"){
			searchParams.effectSelect=false;
		}else{
			searchParams.effectSelect=true;
		}
    var searchData = {
			"username": searchParams.username,
			"role": searchParams.roleSelect,
			"status": searchParams.statusSelect,
			"validFlag": searchParams.effectSelect,
		};
		location.href=port+'chainUsers/exportUsers'+'?'+'token='+sessionStorage.token+'&'+reqwest.toQueryString(searchData);
  }

	componentDidMount() {
		this.props.btnList()
		this.render()
	}
	render(){

			let {buttonList} = this.props
	    return (
	    	<div className="page">
       			<PageTitle title="账户维护" />
				<Row
			      style={{'marginTop': '10px','marginBottom': '10px'}}
			      >
			      	<Col span={4} offset={16} style={{'textAlign':'right'}}>
              	<Button type="primary" onClick={this.exportFile.bind(this)} style={{display:btnIsShow(buttonList,button_list.export_accountKey)?"inline-block":"none"}}>{button_list.export_accountName}</Button>
			      	</Col>
			      	<Col span={4} style={{'textAlign':'right',display:btnIsShow(buttonList,button_list.inport_accountKey)?"inline-block":"none"}}>
			            <ImportBtn/>
			      	</Col>
			     </Row>
       			<SearchGroup onSearch={this.handleSearch.bind(this)}/>
	        	<ListTable {...this.props} onInfo={this.handleInfo.bind(this)} searchParams={this.state.searchParams} isUpdate={this.state.isUpdate}/>
	    	</div>
	    )
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
export default connect(mapStateToProps, mapDispatchToProps)(contractFile)

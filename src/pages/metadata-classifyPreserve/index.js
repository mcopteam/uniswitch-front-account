import './index.less'
import React, {Component} from 'react'
import {
  connect
} from 'react-redux'
import PageTitle from '../../components/page-title'
import SearchGroup from './search-group'
import ListTable from './list-table'
import CreateBtn from './link-group/createBtn'
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
      searchParams: {}, // 搜索参数
    }
  }
 	handleSearch(search){
		console.log(search);
		this.setState({
			searchParams:search
		})
 	}
	render(){

			let {buttonList} = this.props
	    return (
	    	<div className="page">
       			<PageTitle title="数据分类维护" />
		        <Row
			      style={{'marginTop': '10px','marginBottom': '10px'}}
			      >
  						<Col span={4} offset={20} style={{'textAlign':'right'}}>
  							<CreateBtn />
  						</Col>
			     </Row>
       			<SearchGroup onSearch={this.handleSearch.bind(this)}/>
	        	<ListTable {...this.props}  searchParams={this.state.searchParams}/>
	    	</div>
	    )
	}
}
export default contractFile

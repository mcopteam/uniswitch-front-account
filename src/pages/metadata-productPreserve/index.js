import './index.less'
import React, {Component} from 'react'
import {
  connect
} from 'react-redux'
import PageTitle from '../../components/page-title'
import SearchGroup from './search-group'
import ListTable from './list-table'
import { Row, Col, Button, message} from 'antd';
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
       			<PageTitle title="数据产品维护" />
       			<SearchGroup onSearch={this.handleSearch.bind(this)}/>
	        	<ListTable {...this.props} searchParams={this.state.searchParams}/>
	    	</div>
	    )
	}
}
export default contractFile

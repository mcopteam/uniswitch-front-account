import './index.less'
import React, {Component} from 'react'
import PageTitle from '../../components/page-title'
import { Row, Col, Button, message, Select} from 'antd';
import {
	api,
} from '../../common/api_server'
import {
	param,
}from '../../common/param'
import {
	url,
}from '../../common/url_api'
import ListTable from './list-table'
import SearchGroup from './search-group'
const Option = Select.Option;
export default class contractFile extends Component {
  constructor(props){
    super()
    this.state = {
			searchParams: {
				user:'',
				pubkey:'',
				blockChainId:'',
			}
    }
  }
 	handleSearch(search){
		console.log(search);
		this.setState({
			searchParams:{
				user:search.id,
				pubkey:search.roleSelect,
				blockChainId:search.blockChainId,
			}
		})
 	}
	render(){
	    return (
	    	<div className="page">
       			<PageTitle title="资产记录" />
						<SearchGroup onSearch={this.handleSearch.bind(this)}/>
           <ListTable {...this.props} searchParams={this.state.searchParams}/>
	    	</div>
	    )
	}
}

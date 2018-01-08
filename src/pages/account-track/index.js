import React from 'react';
import './index.less';
import {
 connect
} from 'react-redux'
import { Button, } from 'antd';
import ListTable from './list-table'
import PageTitle from '../../components/page-title'
import SearchGroup from './search-group'

export default class TrackPage extends React.Component {
  constructor(props){
    super()
    this.state = {
      searchParams: {}
    }
  }
handleSearch(search){
  console.log(search);
  this.setState({
    searchParams:search
  })
}
 render(){
     return (
       <div className="page">
          <PageTitle title="账户状态跟踪" />
          <SearchGroup onSearch={this.handleSearch.bind(this)}/>
          <ListTable {...this.props} searchParams={this.state.searchParams}/>
       </div>
     )
 }
}

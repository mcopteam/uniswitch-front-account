import './index.less'
import React, {Component} from 'react'
import {
  connect
} from 'react-redux'
import PageTitle from '../../components/page-title'
import SearchGroup from './search-group'
import ListTable from './list-table'
import CreateBtn from './create-role'
import { Row, Col, Button, message} from 'antd';
import { api } from '../../common/api_server'
import { param }from '../../common/param'
import { url }from '../../common/url_api'
import {
	btnIsShow,
}from '../../common/btnIsShow'
import {
	button_list,
}from '../../common/button_list'
import {
	queryButtonList,
}from '../../actions/button_list'

class RolePage extends Component {
  constructor(props){
    super()
    this.state = {
      info:{},
    	isUpdate:{},
      searchParams: {}, // 搜索参数
    }
  }
	handleUpdate(isUpdate){
    this.setState({
      isUpdate:isUpdate,
    })
    console.log(this.state)
 	}
 	handleSearch(search){
    console.log(search)
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
    console.log(this.state)
    // var _this=this;
    // var par = param({
    //   "info":_this.state.info,
    // })
		// reqwest(
		// 		api(url.accountPreserveExport,par)
		// 	).then((req) => {
		// 	console.log(req)
		// 	if(req.code == 0){
    //     message.success(req.msg)
		// 	}else {
		// 	  message.error(req.msg)
		// 	}
		// });
  }
	componentDidMount() {
		this.props.btnList()
		this.render()
	}
	render(){
			let {buttonList} = this.props
	    return (
	    	<div className="page">
     			<PageTitle title="角色管理" />
          <Row
          style={{'marginTop': '10px','marginBottom': '10px'}}
          >
            <Col span={4} offset={20} style={{'textAlign':'right',display:btnIsShow(buttonList,button_list.add_roleKey)?"inline-block":"none"}}>
                <CreateBtn onUpdate={this.handleUpdate.bind(this)} />
            </Col>
         </Row>
   			 <SearchGroup onSearch={this.handleSearch.bind(this)}/>
        <ListTable
          {...this.props}
          onInfo={this.handleInfo.bind(this)}
          searchParams={this.state.searchParams}
          isUpdate={this.state.isUpdate}/>
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
export default connect(mapStateToProps, mapDispatchToProps)(RolePage)

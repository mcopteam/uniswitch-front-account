import './index.less'
import React, {Component} from 'react'
import {
  connect
} from 'react-redux'
import PageTitle from '../../components/page-title'
import CreateForm from './link-group/createForm'
import { Row, Col, Button, message} from 'antd';
class contractFile extends Component {
	render(){

			let {buttonList} = this.props
	    return (
	    	<div className="page">
          <PageTitle title="数据产品添加" />
          <Row
          style={{'marginTop': '10px','marginBottom': '10px'}}
          >
          <Col span={20} offset={2}>
           <CreateForm/>
          </Col>
         </Row>
	    	</div>
	    )
	}
}

export default contractFile
   //
  //   <PageTitle title="数据产品添加" />
  //   <Row
  //   style={{'marginTop': '10px','marginBottom': '10px'}}
  //   >
  //   <Col span={4} offset={20} style={{'textAlign':'right'}}>
  //     <CreateBtn onUpdate={this.handleUpdate.bind(this)} />
  //   </Col>
  //  </Row>
  //   <SearchGroup onSearch={this.handleSearch.bind(this)}/>
  //   <ListTable {...this.props} onInfo={this.handleInfo.bind(this)} searchParams={this.state.searchParams} isUpdate={this.state.isUpdate}/>

import './index.less'
import React, {Component} from 'react'
import {
  connect
} from 'react-redux'
import { Row, Col} from 'antd';
import PageTitle from '../../components/page-title'
import ListTable from './list-table'
import CreateBtn from './link-group/createBtn'
class contractFile extends Component {
	render(){
	    return (
	    	<div className="page">
       			<PageTitle title="区块链维护" />
		        <Row
			      style={{'marginTop': '10px','marginBottom': '10px'}}
			      >
  						<Col span={4} offset={20} style={{'textAlign':'right'}}>
  								<CreateBtn />
  						</Col>
			     </Row>
	        	<ListTable/>
	    	</div>
	    )
	}
}
const mapStateToProps = (state) => {
  return {
  }
}
const mapDispatchToProps = (dispatch) => {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(contractFile)

import './index.less'
import React, {Component} from 'react'
import {
  connect
} from 'react-redux'
import PageTitle from '../../components/page-title'
import SearchGroup from './search-group'
import ListTable from './list-table'
import CreateBtn from './link-group/createBtn'
import ImportBtn from './link-group/importBtn'
import { Row, Col } from 'antd';
import {
	btnIsShow,
}from '../../common/btnIsShow'
import {
	button_list,
}from '../../common/button_list'
import {
	queryButtonList,
}from '../../actions/button_list'

class contractFile extends Component {
  constructor(props){
    super()
    this.state = {
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
	    this.setState({
	      searchParams:search,
	    })
	    console.log(this.state)
 	}
  	componentDidMount() {
  		this.props.btnList()
  		this.render()
  	}
	render(){
  			let {buttonList} = this.props
	    return (
	    	<div className="page">
       			<PageTitle title="文件管理" />
				<Row
			      style={{'marginTop': '10px','marginBottom': '10px'}}
			      >
			      	<Col span={4} offset={16} style={{'textAlign':'right'}}>
                <div style={{display:btnIsShow(buttonList,button_list.create_contractKey)?"inline-block":"none"}}>
			            <CreateBtn onUpdate={this.handleUpdate.bind(this)}/>
                </div>
			      	</Col>
			      	<Col span={4}style={{'textAlign':'right',display:btnIsShow(buttonList,button_list.import_contractKey)?"inline-block":"none"}}>
			            <ImportBtn onUpdate={this.handleUpdate.bind(this)} />
			      	</Col>
			     </Row>
       			<SearchGroup onSearch={this.handleSearch.bind(this)}/>
	        	<ListTable {...this.props}  searchParams={this.state.searchParams} isUpdate={this.state.isUpdate}/>
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

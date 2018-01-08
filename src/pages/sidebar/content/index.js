import './index.less'
import React, {
  Component,
} from 'react'
import {
  connect
} from 'react-redux'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import { Row, Col, Steps, Icon, Timeline} from 'antd';
import reqwest from 'reqwest';
import {
	api,
} from '../../../common/api_server'
import {
	param,
}from '../../../common/param'
import {
	url,
}from '../../../common/url_api'

const Step = Steps.Step;

class ContentPage extends Component{
  constructor(props){
    super(props)
    this.state = {
    }
  }
  render(){
    var lists=[];
    if(this.props.data){
      this.props.data.forEach(function(list,index){
  			var time=list.createTime;
  			var timeArr=time.split(' ')[0].split('-');
      	lists.push(
          <Timeline.Item key={index}>
            <div className="item-date">
                <div className="date-left">{timeArr[2]}</div>
                <div className="date-right">
                    <div className="right-may">{timeArr[1]}月</div>
                    <div className="right-year">{timeArr[0]}</div>
                </div>
            </div>
            <div className="item-content">
                {list.description}
                <p>操作人：{list.createUserName}</p>
            </div>
          </Timeline.Item>
      	)
      })
    }
    return (
      <div className="content-page" style={{height:"100%"}}>
        <div style={{overflowY:"auto",height:"580px"}}>
          <Timeline>
              {lists}
          </Timeline>
        </div>
        <Row>
          <Col span={10} offset={4}>
            <Button type="primary" onClick={this.upgrade}>升级</Button>
          </Col>
          <Col>
            <Button type="primary" onClick={this.offline}>下线</Button>
          </Col>
       </Row>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    ...state.productSidebar
  }
}
const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentPage)

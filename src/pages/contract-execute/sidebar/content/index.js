import './index.less'
import React, {
  Component,
} from 'react'
import {
  connect
} from 'react-redux'
import { Steps, Icon, Timeline, Button, Input} from 'antd';

const Step = Steps.Step;

class ContentPage extends Component{
  constructor(props){
    super()
    this.state = {
    }
  }
  render(){
    var lists=[];
    this.props.data.forEach(function(list,index){
			var time=list.timestamp;
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
              {list.contractState}
              <p>任务名称：{list.caption}</p>
              <p>任务状态：{list.state}</p>
          </div>
        </Timeline.Item>
    	)
    })
    return (
      <div className="content-page" style={{overflowY:"auto",height:"800px"}}>
        <Timeline>
            {lists}
        </Timeline>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    ...state.executeSidebar
  }
}
const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentPage)

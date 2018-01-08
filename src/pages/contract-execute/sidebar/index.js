import './index.less'
import React, {
  Component,
} from 'react'
import {
  connect
} from 'react-redux'
import {Tabs, Icon, Button, Input, Nav, Modal} from 'antd'
import PageTitle from '../../../components/page-title'
import Content from './content'
import Detail from './detail'

let TabPane = Tabs.TabPane
export default class SidebarPage extends Component{
  constructor(props){
    super()
    this.state = {
      title: '合约详情',
    }
  }
  render(){
    let {
      title,
    } = this.state
    return (
        <div className="sidebarx Kpage">
          <p style={{fontSize: 16, marginLeft: 10}}>{title}</p>
          <div className='Kpage-content'>
            <Tabs
              defaultActiveKey='detail'
            >
              <TabPane tab="执行记录" key='detail'>
                <Content/>
              </TabPane>
              <TabPane tab="合约内容" key="content">
                <Detail/>
              </TabPane>
            </Tabs>
          </div>
        </div>
    )
  }
}

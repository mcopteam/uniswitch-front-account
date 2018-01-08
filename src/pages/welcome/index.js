import './index.less'
import React, {
  Component,
} from 'react'
import {
  connect
} from 'react-redux'

// import 'antd/dist/antd.css'
import Button from 'antd/lib/button'

class WelcomePage extends Component{
  render(){
    return (
      <div className="welcome-page page">
        <div className="welcome-content">
          <div>
            欢迎登录，<span>uniSwitch管理平台！</span>
          </div>
          <img src={require('../../assets/img/welcome.png')}/>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    ...state.personal
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage)

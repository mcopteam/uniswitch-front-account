import './index.less'
import React, {
  Component,
  PropTypes,
} from 'react'
import {
  connect
} from 'react-redux'
import Icon from 'antd/lib/icon'
import {
  logout,
} from '../../actions/user'

import UserMenu from './userMenu'

class Head extends Component{
  render(){
    let {
      user,
    } = this.props
    return (
      <div className="head-component">
        <div className="logo">
        	<img className="logoImg" src={require('../../assets/img/logo1.png')} />
        	<p style={{paddingLeft:"5px"}}>Uni-Switch可信数据交换平台</p>
        </div>
        <UserMenu />
      </div>
    )
  }
  handleLogoutClick(){
    this.props.logout()
  }
}

//      <div className="left">
//        <div className="user">
//        	欢迎您,
//          <span className="name">{user.name}</span>
//          进入智能合约管理平台!
//        </div>
//        <div className="logout"
//        onClick={this.handleLogoutClick.bind(this)}>
//          <span>退出</span>
//        </div>
//      </div>
const mapStateToProps = (state) => {
  return {
    ...state.login,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout(){
      dispatch(logout())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Head)

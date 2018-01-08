// antd.css中的代码编译有报错，所以单独抽取出来删除了报错的代码
import './index.less'
import React, {
  Component,
  PropTypes,
} from 'react'
import {
  connect,
} from 'react-redux'
import {
  Link,
} from 'react-router'
import {hashHistory} from 'react-router'
import Menu, {SubMenu, Item, ItemGroup} from 'antd/lib/menu'
import Icon from 'antd/lib/icon'
import Nav from '../../components/nav'
import Head from '../../components/head'
import {
  fetchUserInfo,
  requestMenuList
} from '../../actions/user'

class Main extends Component{
  constructor(props){
    super()
  }
  render(){
    let {
      user,
      menues,
      children,
      menuList,
    } = this.props
    return (
      <div className="main-container">
        <Head user={user}/>
        <div className="content-container">
          <Nav menues={menues} menuList={menuList}/>
          {menues.length ? children : ''}
        </div>
      </div>
    )
  }

updateToken(){
  let _this=this;
var t=setTimeout(function(){
  _this.props.fetchUserInfo()
},1000)
}
  componentDidMount(){
    if (window.location.href.indexOf("?")!=-1) {
      let link = window.location.href.split('?')[1].split('&')[0].split('=')[1]
      let token = window.location.href.split('?')[1].split('&')[1].split('=')[1]
      console.log(link);
      console.log(token);
      if (link&&token) {
        sessionStorage.token=token;
        this.updateToken()
        switch (link) {
          case "welcome":
              hashHistory.push('/main/welcome')
            break;
          case "check":
              hashHistory.push('/main/account/check')
            break;
          case "preserve":
              hashHistory.push('/main/account/preserve')
            break;
          case "track":
              hashHistory.push('/main/account/track')
            break;
          case "role":
              hashHistory.push('/main/limit/role')
            break;
          case "menu":
              hashHistory.push('/main/limit/menu')
            break;
          case "btn":
              hashHistory.push('/main/limit/btn')
            break;
          case "data":
              hashHistory.push('/main/limit/data')
            break;
          default:

        }
      }
    }else{
      console.log(1111111111111);
      this.props.fetchUserInfo()
    }
  }
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    ...state.user,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserInfo(){
      // dispatch(fetchUserInfo())\
      requestMenuList(dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)

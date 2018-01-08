import './index.less'
import React, {
  Component,
  PropTypes,
} from 'react'
import {
  connect
} from 'react-redux'
import {
  Link,
} from 'react-router'
import Menu, {SubMenu, Item, ItemGroup} from 'antd/lib/menu'
import Icon from 'antd/lib/icon'
import {
	findRoute,
}from '../../common/judgeRoute'
class Nav extends Component{
  constructor(props){
    super()
    if(!props.menues.length) return
    this.state = {
      current: '', //props.menuList[0].menuKey
    }
  }

  render(){
    let {
      test,
      menues,
      children,
      menuList,
    } = this.props
    console.log(menues);
    console.log(menuList);
    return (
      <div className="app-nav"
      style={{
        width: '15%',
        background: '#232631',
        padding: 0,
      }}>
        {
          menuList.length ? <Menu
          onClick={this.handleClick.bind(this)}
          defaultOpenKeys={menuList.map((item, index) => {
            return menuList.menuKey
          })}
          selectedKeys={[this.state.current]}
          mode='inline'>
            {
              menuList.map((menu, index) => {
                function item(menu){
                  if (findRoute(menu.menuLink)) {
                    console.log(findRoute(menu.menuLink));
                    return (<a href={findRoute(menu.menuLink)+'token='+sessionStorage.token+'&roleId='+sessionStorage.role}>{menu.menuName}</a>)
                  }else {
                    return (<Link activeClassName="active" to={menu.menuLink}>{menu.menuName}</Link>)
                  }
                }
                return (
                  !menu.listMenuChild||menu.listMenuChild.length==0 ?
                  <Item key={menu.menuKey}>
                    {
                      item(menu)
                    }
                  </Item>
                  : (<SubMenu key={menu.menuKey} title={menu.menuName}>
                    {
                      menu.listMenuChild.map((subMenu, i) => {
                        return (<Item key={subMenu.menuKey}>{item(subMenu)}</Item>)
                      })
                    }
                  </SubMenu> : '')
                )
              })
            }
          </Menu> : ''
        }
      </div>
    )
  }
  componentDidMount(){
    this.render()
  }
  componentWillReceiveProps(props){
    this.render()
    let current = props.menues.length ? props.menues[0].key : ''
    this.setState({
      current
    })
  }
  handleClick(e) {
    this.setState({
      current: e.key,
    })
  }
}

const mapStateToProps = (state) => {
  return {
  }
}
const mapDispatchToProps = (dispatch) => {
	// console.log(dispatch)
  return {
    // dispatch(detailtest)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Nav)

  // menues.length ? <Menu
  // onClick={this.handleClick.bind(this)}
  // defaultOpenKeys={menues.map((item, index) => {
  //   return menues.key
  // })}
  // selectedKeys={[this.state.current]}
  // mode='inline'>
  //   {
  //     menues.map((menu, index) => {
  //       return (
  //         !menu.subMenues ? <Item key={menu.key}><Link activeClassName="active" to={menu.link}>{menu.name}</Link></Item>
  //         : (<SubMenu key={menu.key} title={menu.name}>
  //           {
  //             menu.subMenues.map((subMenu, i) => {
  //               return (<Item key={subMenu.key}><Link activeClassName="active" to={subMenu.link}>{subMenu.name}</Link></Item>)
  //             })
  //           }
  //         </SubMenu> : '')
  //       )
  //     })
  //   }
  // </Menu> : ''

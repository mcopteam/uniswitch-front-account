import './index.less'
import React, {Component}from 'react';
import { connect } from 'react-redux'
import {  Row, Col, Icon, Input, Button, Checkbox, message } from 'antd';
import { hashHistory } from 'react-router'
import reqwest from 'reqwest';
import { api } from '../../../common/api_server'
import { param }from '../../../common/param'
import { url }from '../../../common/url_api'
import { actionRoleEdit } from  '../../../actions/limit-role'

class RoleAuth extends Component {
  constructor(props) {
    console.log(props);
		super(props)
      this.state = {
        id:props.id,
        priviDataList:[],
        priviFunList:[],
      }
  }
  // let id = this.props.id;

handelChange(e){
  var roleId=this.props.id;
  var checked=e.target.checked;
  var id=e.target.id;
  var type=e.target.name;
  if (checked) {
    checked=1;
  }else {
    checked=0;
  }
  var par=param({
    "role":roleId,
    "type":type,
    "resId":id,
    "flag":checked,
  })
  reqwest(
  	api(url.limitRoleLimitReset,par)
  ).then((req) => {
  	console.log(req)
  	if (req.code == 0) {
  		message.success(req.msg);
console.log(this.state.id);
        this.actionRoleLimitData(this.state.id)
        this.actionRoleLimitFun(this.state.id)
  	}else{
  		message.error(req.msg);
  	}
  });
}
handelChangeUpdate(e){
  var roleId=this.props.id;
  var checked=e.target.checked;
  var id=e.target.id;
  var type=e.target.name;
  if (checked) {
    checked=1;
  }else {
    checked=0;
  }
  var par=param({
    "role":roleId,
    "type":type,
    "resId":id,
    "flag":checked,
  })
  reqwest(
  	api(url.limitRoleLimitReset,par)
  ).then((req) => {
  	console.log(req)
  	if (req.code == 0) {
  		message.success(req.msg);
      this.actionRoleLimitData(this.state.id)
      this.actionRoleLimitFun(this.state.id)
  	}else{
  		message.error(req.msg);
  	}
  });
}
// 权限查询

actionRoleLimitData(info){
  let priviDataList
  var par=param({
    "role":info
  })
  reqwest(
  	api(url.limitRoleListData,par)
  ).then((req) => {
  	console.log(req)
  	if (req.code == 0) {
  		// message.success(req.msg);
      priviDataList=req.result;
      this.setState({
        priviDataList:priviDataList,
      })
  	}else{
  		message.error(req.msg);
  	}
  });
}
// 权限查询2

actionRoleLimitFun(info){
  console.log(info);
  let priviFunList
  var par=param({
    "role":info
  })
  reqwest(
  	api(url.limitRoleListFun,par)
  ).then((req) => {
  	console.log(req)
  	if (req.code == 0) {
  		// message.success(req.msg);
      priviFunList=req.result;
      this.setState({
        priviFunList:priviFunList,
      })
  	}else{
  		message.error(req.msg);
  	}
  });
}

componentDidMount(){
  this.actionRoleLimitData(this.state.id)
  this.actionRoleLimitFun(this.state.id)
}
componentWillReceiveProps(props){
  this.actionRoleLimitData(props.id)
  this.actionRoleLimitFun(props.id)
  this.setState({
    id:props.id,
  })
  // this.render()
  // setTimeout(this.render,3000)
}
	render() {
		let {
      show,
      roleInfo,
    } = this.props
    let {
      priviDataList,
      priviFunList,
    } = this.state
    console.log(priviDataList);
    console.log(priviFunList);
		return(
      <div className="limit-con" style={{height:"400px",overflow:"auto"}}>
      <div className="limit-list info-data">
          <div className="limit-info-data">
            <p className="info-title">数据：</p>
            <div>
              <Row>
              {
                priviDataList.map((item,index) => {
                  return(
                    <Col span={4} key={"data"+index}>
                      <input onClick={this.handelChange.bind(this)} type="checkbox" id={item.dataResourceID} name={item.type} checked={item.qxFlag?true:false} />
                      <label for={item.dataResourceID}>{item.dataResourceName}</label>
                    </Col>
                  )
                })
              }
              </Row>
            </div>
          </div>
        </div>
        <p className="info-title">功能：</p>
        {
          priviFunList.map((item,index) => {
            return (

              <div className="limit-list" key={"fun"+index}>
                <div className="limit-menu">
                  <input onClick={this.handelChangeUpdate.bind(this)} type="checkbox" id={item.menuID} name={item.type} checked={item.qxFlag?true:false}  />
                  <label for={item.menuID}>{item.menuFullName}</label>
                  <span className="menu-add">菜单地址：{item.menuLink}</span>
                </div>
                <div className="limit-info">
                  <p className="limti-btn">按钮：</p>
                  <div>
                    <Row>
                    {
                      item.listButton.map((item,index) => {
                        return(
                          <Col span={4} key={"btn"+index}>
                            <input onClick={this.handelChange.bind(this)} type="checkbox" id={item.buttonID} name={item.type} checked={item.qxFlag?true:false}  />
                            <label for={item.buttonID}>{item.buttonName}</label>
                          </Col>
                        )
                      })
                    }
                    </Row>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
		);
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    ...state.limitRoleData,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    submitEdit: (info) => {
      actionRoleEdit(dispatch, info);
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RoleAuth)

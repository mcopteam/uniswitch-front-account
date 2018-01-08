
import './index.less'
import React, {
	Component
} from 'react'
import { Link} from 'react-router'
import { Row, Col, Table, Button, message, Modal, } from 'antd';
import { hashHistory } from 'react-router'
import reqwest from 'reqwest';
import {
	api,
} from '../../../../../common/api_server'
import {
	param,
}from '../../../../../common/param'
import {
	url,
}from '../../../../../common/url_api'
const confirm = Modal.confirm;
export default class Off extends Component{
  constructor(props) {
		super(props)
      this.state = {
        datalist:[],
        menulist:[],
      }
  }
  componentDidMount() {
		var par=param({
			"role":sessionStorage.role,
		})
		reqwest(
				api(url.persetDataRes,par)
			).then((req) => {
			console.log(req)
			if(req.code == 0){
				message.success(req.msg);
				var data = req.result;
				this.setState({
					datalist: data,
				})
			}else{
				message.error(req.msg);
			}
		});

  		var par=param({
				"role":sessionStorage.role,
			})
  		reqwest(
  				api(url.persetFunRes,par)
  			).then((req) => {
  			console.log(req)
  			if(req.code == 0){
					message.success(req.msg);
  				var data = req.result;
  				this.setState({
  					menulist: data,
  				})
  			}else{
					message.error(req.msg);
				}
  		});
  }
  render() {
    let {
      datalist,
      menulist,
    } = this.state
		return(
      <div className="limit-con" style={{height:"400px",overflow:"auto"}}>
				<div className="limit-list info-data">
					<div className="limit-info-data">
						<p className="info-title">数据：</p>
						<div>
							<Row>
							{
								datalist.map((item,index) => {
									return(
										<Col span={4}>
											<span key={item.dataResourceKey}>{item.dataResourceName}</span>
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
          menulist.map((item,index) => {
            return (
              <div className="limit-list">
                <div className="limit-menu">
									<span>{item.menuFullName}</span>
                  <span className="menu-add">菜单地址：{item.menuLink}</span>
										<div className="limit-info">
											<p className="limti-btn">按钮：</p>
											<div>
												<Row>
												{
													item.listButton.map((item,index) => {
														return(
															<Col span={4}>
																<span key={item.buttonKey}>{item.buttonName}</span>
															</Col>
														)
													})
												}
												</Row>
											</div>
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

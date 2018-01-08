import './index.less';
import React from 'react';
import reqwest from 'reqwest';
import { Row, Col } from 'antd';
import {
	api,
} from '../../../../common/api_server'
import {
	param,
}from '../../../../common/param'
import {
	url,
}from '../../../../common/url_api'

class InfoForm extends React.Component {
	  state = {
      pagination:false,
      loading:false,
      data:{
        name:"sdiofj",
        relate:"23423423423",
        role:"管理者",
				effect:"生效",
        status:"通过审核",
        username:"1111",
        phone:"1903284082340",
				time:'2017-09-12',
				userList:[
					{
						name:"234434",
						state:"未启用"
					},
					{
						name:"234sdfge34",
						state:"未启用"
					},
					{
						name:"234qqqqq434",
						state:"关联启用"
					},
				]
      },
	  };

	render() {
		let { preInfo,}=this.props
		var list=[];
		preInfo.keyPairs.forEach(function (item,index) {
			list.push(
				<p key={index+'userlist'} style={{fontWeight:(item.status==0?'bold':'')}}><span>{item.publicKey}</span><span>{item.statusName}</span></p>
			)
		})
		return(
      <div>
        <Row>
          <Col span={22} offset={1}><span className="infoKey">账户名称：</span><span className="infoValue">{preInfo.username}</span></Col>
          <Col span={22} offset={1}><span className="infoKey">账户姓名：</span><span className="infoValue">{preInfo.name}</span></Col>
          <Col span={22} offset={1}><span className="infoKey">账户电话：</span><span className="infoValue">{preInfo.mobile}</span></Col>
          <Col span={22} offset={1}><span className="infoKey">账户角色：</span><span className="infoValue">{preInfo.rolename}</span></Col>
					<Col span={22} offset={1}><span className="infoKey">账户账号：</span></Col>
          <Col span={22} offset={1}><div className="infolist">{list}</div></Col>
          <Col span={22} offset={1}><span className="infoKey">账户状态：</span><span className="infoValue">{preInfo.statusName}</span></Col>
					<Col span={22} offset={1}><span className="infoKey">是否生效：</span><span className="infoValue">{preInfo.validFlagName}</span></Col>
          <Col span={22} offset={1}><span className="infoKey">申请日期：</span><span className="infoValue">{preInfo.createTime}</span></Col>
        </Row>
      </div>
		);
	}
}

export default InfoForm

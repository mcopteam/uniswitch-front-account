import './index.less';
import React from 'react';
import reqwest from 'reqwest';
import { Table, Row, Col } from 'antd';
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
      },
	  };

	render() {
		let { preInfo,}=this.props
		console.log(preInfo);
		var list=[];
		// preInfo.keyPairs.forEach(function (item,index) {
		// 	list.push(
		// 		<p key={index+'userlist'} style={{fontWeight:(item.status==0?'bold':'')}}><span>{item.publicKey}</span><span>{item.statusName}</span></p>
		// 	)
		// })

		switch(preInfo.dataStatus){
			case 1:
				preInfo.dataStatus="新建";
				break
			case 5:
				preInfo.dataStatus="上架";
				break
			case 6:
				preInfo.dataStatus="下架";
				break
			default:
				break
		}
		switch(preInfo.dataFrequencyUnit){
			case "year":
				preInfo.dataFrequencyUnit="年";
				break
			case "month":
				preInfo.dataFrequencyUnit="月";
				break
			case "day":
				preInfo.dataFrequencyUnit="日";
				break
			case "hour":
				preInfo.dataFrequencyUnit="小时";
				break
			case "minute":
				preInfo.dataFrequencyUnit="分";
				break
			case "second":
				preInfo.dataFrequencyUnit="秒";
				break
			default:
				break
		}
		switch(preInfo.dataSaveUnit){
			case "year":
				preInfo.dataSaveUnit="年";
				break
			case "month":
				preInfo.dataSaveUnit="月";
				break
			case "day":
				preInfo.dataSaveUnit="日";
				break
			case "hour":
				preInfo.dataSaveUnit="小时";
				break
			case "minute":
				preInfo.dataSaveUnit="分";
				break
			case "second":
				preInfo.dataSaveUnit="秒";
				break
			default:
				break
		}
		const columns = [{
		 title: '序号',
		 dataIndex: "attrId",
		 key: "attrId",
		 width: '10%',
		}, {
		 title: '属性标识',
		 dataIndex: 'attrVar',
		 key: 'attrVar',
		 width: '10%',
		}, {
		 title: '属性名称',
		 dataIndex: 'attrName',
		 key: 'attrName',
		 width: '10%',
		}, {
		 title: '属性值',
		 dataIndex: 'attrValue',
		 key: 'attrValue',
		 width: '10%',
		}]

		return(
      <div className="flowCon">
        <Row>
					<Col span={22} offset={1}><span className="infokeyWidth left">基本属性信息</span></Col>
          <Col span={22} offset={1}><span className="infokeyWidth">数据编码：</span><span className="infoValue">{preInfo.dataCharSet}</span></Col>
          <Col span={22} offset={1}><span className="infokeyWidth">数据分类：</span><span className="infoValue">{preInfo.categoryName}</span></Col>
          <Col span={22} offset={1}><span className="infokeyWidth">数据名称：</span><span className="infoValue">{preInfo.dataName}</span></Col>
					<Col span={22} offset={1}><span className="infokeyWidth">数据供应方：</span><span className="infoValue">{preInfo.username}</span></Col>
					<Col span={22} offset={1}><span className="infokeyWidth">数据摘要：</span><span className="infoValue">{preInfo.dataAbstract}</span></Col>
					<Col span={22} offset={1}><span className="infokeyWidth">数据描述：</span><span className="infoValue">{preInfo.dataDesc}</span></Col>
					<Col span={22} offset={1}><span className="infokeyWidth">数据价格：</span><span className="infoValue">{preInfo.dataPrice}</span></Col>
					<Col span={22} offset={1}><span className="infokeyWidth">数据状态：</span><span className="infoValue">{preInfo.dataStatus}</span></Col>
					<Col span={22} offset={1}><span className="infokeyWidth">数据格式：</span><span className="infoValue">{preInfo.dataFormat}</span></Col>
					<Col span={22} offset={1}><span className="infokeyWidth">数据更新频率：</span><span className="infoValue">{preInfo.dataFrequency+preInfo.dataFrequencyUnit}</span></Col>
					<Col span={22} offset={1}><span className="infokeyWidth">数据留存时间：</span><span className="infoValue">{preInfo.dataSave+preInfo.dataSaveUnit}</span></Col>
					<Col span={22} offset={1}><span className="infokeyWidth">数据类型：</span><span className="infoValue">{preInfo.dataType}</span></Col>
					<Col span={22} offset={1}><span className="infokeyWidth">数据大小：</span><span className="infoValue">{preInfo.dataSize+preInfo.dataSizeUnit}</span></Col>
          <Col span={22} offset={1}><span className="infokeyWidth">数据路径：</span><span className="infoValue">{preInfo.dataAddress}</span></Col>
					<Col span={22} offset={1}><span className="infokeyWidth left">扩展属性信息</span></Col>
					<Col span={22} offset={1}>
						<Table
							columns={columns}
			        rowKey={record => record.attrId}
			        dataSource={preInfo.attributeList}
							pagination={false}
			      />
					</Col>
        </Row>
      </div>
		);
	}
}

export default InfoForm

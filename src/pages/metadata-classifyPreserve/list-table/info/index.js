import './index.less';
import React from 'react';
import { Row, Col } from 'antd';
class InfoForm extends React.Component {
	render() {
		let { preInfo,}=this.props
		return(
      <div>
        <Row>
          <Col span={22} offset={1}><span className="infoKey">分类ID：</span><span className="infoValue">{preInfo.categoryId}</span></Col>
          <Col span={22} offset={1}><span className="infoKey">分类编码：</span><span className="infoValue">{preInfo.categoryCharSet}</span></Col>
          <Col span={22} offset={1}><span className="infoKey">分类名称：</span><span className="infoValue">{preInfo.categoryName}</span></Col>
          <Col span={22} offset={1}><span className="infoKey">分类全称：</span><span className="infoValue">{preInfo.categoryFullName}</span></Col>
          <Col span={22} offset={1}><span className="infoKey">分类描述：</span><span className="infoValue">{preInfo.categoryDesc}</span></Col>
        </Row>
      </div>
		);
	}
}
export default InfoForm

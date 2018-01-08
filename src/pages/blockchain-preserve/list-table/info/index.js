import './index.less';
import React, {
	Component
} from 'react'
import { Table, Row, Col} from 'antd';

export default class InfoForm extends React.Component {
	render() {
		let { blockchainDetail, }=this.props
		console.log(blockchainDetail);
		var list=[];
		blockchainDetail.blockChainNodeInfo.keyRings.forEach(function (item,index) {
			list.push(
				<p key={index+'keyRings'}><span>{item}</span></p>
			)
		})
		const columns = [{
		 title: '节点公钥',
		 dataIndex: 'nodePubKey',
		 key: 'nodePubKey',
		 width: '40%',
		}, {
		 title: '交易总数',
		 dataIndex: 'txsCount',
		 key: 'txsCount',
		 width: '10%',
		}, {
		 title: '区块总数',
		 dataIndex: 'blockCount',
		 key: 'blockCount',
		 width: '10%',
		}, {
		 title: '投票总数',
		 dataIndex: 'voteCount',
		 key: 'voteCount',
		 width: '10%',
		},  {
		 title: '有效区块数',
		 dataIndex: 'validBlockCount',
		 key: 'validBlockCount',
		 width: '15%',
		}, {
		 title: '有效交易数',
		 dataIndex: 'validTxsCount',
		 key: 'validTxsCount',
		 width: '15%',
		}]
		return(
      <div className="flowCon">
        <Row>
					<Col span={22} offset={1}><span className="infokeyWidth left">区块链基本信息</span></Col>
          <Col span={22} offset={1}><span className="infokeyWidth">区块链类型：</span><span className="infoValue">{blockchainDetail.blockChain.type}</span></Col>
          <Col span={22} offset={1}><span className="infokeyWidth">区块链名称：</span><span className="infoValue">{blockchainDetail.blockChain.name}</span></Col>
          <Col span={22} offset={1}><span className="infokeyWidth">区块链描述：</span><span className="infoValue">{blockchainDetail.blockChain.description}</span></Col>
          <Col span={22} offset={1}><span className="infokeyWidth">区块链链接：</span><span className="infoValue">{blockchainDetail.blockChain.ip}</span></Col>
          <Col span={22} offset={1}><span className="infokeyWidth">区块链Port：</span><span className="infoValue">{blockchainDetail.blockChain.port}</span></Col>
					<Col span={22} offset={1}><span className="infokeyWidth">是否存储合约：</span><span className="infoValue">{blockchainDetail.blockChain.storeContract}</span></Col>
          <Col span={22} offset={1}><span className="infokeyWidth">是否生效：</span><span className="infoValue">{blockchainDetail.blockChain.valid}</span></Col>
					<Col span={22} offset={1}><span className="infokeyWidth left">区块链节点信息</span></Col>
          <Col span={22} offset={1}><span className="infokeyWidth">节点数量：</span><span className="infoValue">{blockchainDetail.blockChainNodeInfo.nodeCount}</span></Col>
					<Col span={22} offset={1}><span className="infokeyWidth">节点公钥环：</span></Col>
          <Col span={22} offset={1}><div className="infolist">{list}</div></Col>
					<Col span={22} offset={1}><span className="infokeyWidth left">区块链统计信息</span></Col>
					<Col span={22} offset={1}>
						<Table
							columns={columns}
			        rowKey={record => record.nodePubKey}
			        dataSource={blockchainDetail.blockChainStatisticInfo}
							pagination={false}
			      />
					</Col>
        </Row>
      </div>
		);
	}
}

// <Col span={22} offset={1}><h3>区块链节点信息</h3></Col>
// <Col span={22} offset={1}><span className="infoKey">节点数量：</span><span className="infoValue">{blockchainDetail.blockChainNodeInfo.type}</span></Col>
// <Col span={22} offset={1}><span className="infoKey">节点公钥环：</span><span className="infoValue">{blockchainDetail.blockChainNodeInfo.type}</span></Col>
// <Col span={22} offset={1}><h3>区块链统计信息</h3></Col>
// <Col span={22} offset={1}><span className="infoKey"></span>交易总数：<span className="infoValue">{blockChainStatisticInfo.type}</span></Col>
// <Col span={22} offset={1}><span className="infoKey"></span>区块总数：<span className="infoValue">{blockChainStatisticInfo.type}</span></Col>
// <Col span={22} offset={1}><span className="infoKey"></span>投票总数：<span className="infoValue">{blockChainStatisticInfo.type}</span></Col>
// <Col span={22} offset={1}><span className="infoKey"></span>有效区块数：<span className="infoValue">{blockChainStatisticInfo.type}</span></Col>
// <Col span={22} offset={1}><span className="infoKey"></span>有效交易数：<span className="infoValue">{blockChainStatisticInfo.type}</span></Col>

import './index.less'
import React, {
  Component,
} from 'react'
import {
  connect
} from 'react-redux'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'

class DetailPage extends Component{
  constructor(props){
    super()
    this.state = {
    }
  }
    render(){
      var owners=[];
      var components=[];
  		if(this.props.conData.ContractOwners){
  		this.props.conData.ContractOwners.forEach(function(item,index){
  			owners.push(
  				<div key={'owner'+index} style={{paddingLeft:"10px"}}>
  					<span style={{wordBreak:"break-all"}}>owner{index+1}：{item}</span>
  				</div>
  			)
  		})
  		}
  		if(this.props.conData.ContractComponents){
  		this.props.conData.ContractComponents.forEach(function(item,index){
        var precondition='';
        for (var i = 0; i < item.PreCondition.length; i++) {
          if (i==item.PreCondition.length-1) {
            precondition+=item.PreCondition[i].Description+"";
          }else{
            precondition+=item.PreCondition[i].Description+","
          }
        }
        console.log(precondition);
  			components.push(
  				<div key={'component'+index}>
  					<span>{index+1}.</span><span>[{precondition}]:【{item.Caption}】{item.Description}</span>
  				</div>
  			)
  		})
  	}
  		var asset=[];
  		if(this.props.conData.ContractAssets){
    		this.props.conData.ContractAssets.forEach(function(item,index){
    			asset.push(
    					<div key={'asset'+index}>
                <div>
                  <span>名称：</span><span>{item.Caption}</span>
                </div>
                <div>
                  <span>描述：</span><span>{item.Description}</span>
                </div>
              	<div>
                  <span>数量：</span><span>{item.Amount}</span>
              	</div>
              	<div>
                  <span>单位：</span><span>{item.Unit}</span>
              	</div>
  					</div>
    			)
    		})

  		}

      // <div>
      //   <span>合约模板编号：</span>
      //   <span>{this.props.conData.ContractTemplateId}</span>
      // </div>
      return (
        <div className="content-page" style={{overflowY:"auto",height:"800px"}}>
          <ul className='wrap'>
            {/*合约编号*/}
              <li className='item-body'>
                <div>
                  <span>合约名称：</span>
                  <span>{this.props.conData.Caption}</span>
                </div>
                <div>
                  <span>合约产品编号：</span>
                  <span>{this.props.conData.ContractProductId}</span>
                </div>
                <div>
                  <span>合约编号：</span>
                  <span>{this.props.conData.ContractId}</span>
                </div>
              </li >
              <li className='item-body'>
                <div>
                  <span>合约主体：</span>
                </div>
                <div>
                  {owners}
                </div>
              </li >
              {/*合约日期*/}
              <li className='item-body'>
                <div>
                  <span>合约创建日期：</span><span>{this.props.conData.CreateTime}</span>
                </div>
                <div>
                  <span style={{wordBreak:"break-all"}}>合约创建人：{this.props.conData.Creator}</span>
                </div>
                <div>
                  <span>合约起始日期：</span><span>{this.props.conData.StartTime}</span>
                </div>
              	<div>
                  <span>合约截止日期：</span><span>{this.props.conData.EndTime}</span>
              	</div>
              </li>
              {/*资产描述*/}
              <li className='item-body'>
                <span>资产描述：</span>
                <div style={{paddingLeft:"10px"}}>
                  {asset}
                </div>
              </li>
          </ul>
          <div className='item-detail'>
            <span className='title'>合约权利和义务：</span>
            {components}
          </div>
        </div>
      )
    }
}
const mapStateToProps = (state) => {
  return {
    ...state.exeSidCon
  }
}
const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage)

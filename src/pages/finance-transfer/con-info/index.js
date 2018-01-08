import './index.less'
import React, {
	Component
} from 'react'
import {
	Layout,
	Row,
	Col,
	Radio ,
	Select,
	DatePicker,
	Button,
	Checkbox,
	message,
	Modal,
} from 'antd';
import reqwest from 'reqwest';

import ListTable from '../list-table'
import FormCon1 from './form1'
import FormCon2 from './form2'
import FormCon3 from './form3'
import RecordCon from './record'
import {
	api,
} from '../../../common/api_server'
import {
	param,
}from '../../../common/param'
import {
	url,
}from '../../../common/url_api'
import {
	contractApp,
}from '../../../common/contract_app'
const Option = Select.Option;

export default class ConInfo extends Component {
  constructor(props){
    super()
		this.state = {
			searchParams1:{},
			searchParams2:{},
			searchParams3:{},
			checked1: true,
			checked2: false,
	    checked3: false,
			amount:100,
		};
  }
//	获取余额
	getAmount(chainType){
		var par=param({
			"chainType":chainType,
		})
		reqwest(
			api(url.getAccountBlances,par)
		).then((req) => {
			console.log(req)
      if(req.code == 0){
          var data = req.result;
          this.setState({
          	amount:data.amount
          })
      }
      console.log(this.state)
		});
	}
//	获取合约记录
	getRecord(){
		var par=param({})
		reqwest(
			api(url.getContractAppsExecuteList,par)
		).then((req) => {
			console.log(req)
			if(req.code == 0){
				var list = req.result.data;
        for(var i = 0; i < list.length; i++) {
            if(list[i].status == 'Contract_Unknown' || list[i].status == 'Contract_Create' || list[i].status == 'Contract_Signature') {
                list[i].status  = '未执行';
            } else if(list[i].status == 'Contract_In_Process') {
                list[i].status  = '正在执行';
            } else if(list[i].status == 'Contract_Completed') {
                list[i].status  = '已完成';
            } else if(list[i].status == 'Contract_Discarded') {
                list[i].status  = '终止';
            }
        }
				this.setState({
					data: list,
				})
			}
		});
	}
	getTest(){
    this.timer = setInterval(function () {
			this.getAmount("contract")
    }.bind(this), 2000);
	}
	componentDidMount() {
		// this.getTest()
	}

  componentWillUnmount() {
	clearInterval(this.timer);
	clearInterval(this.timer1);
	clearInterval(this.timer2);
	clearInterval(this.timer3);
  }
	// 搜索参数
 	handleSearch1(search){
		console.log(search);
    this.setState({
      searchParams1:search,
			amount:"searchParams1",
    }, () => {
			console.log(this.state);
	    clearInterval(this.timer2);
	    clearInterval(this.timer3);
	    this.timer1 = setInterval(function () {
				console.log(11111111111);
				console.log(this.state);
				console.log(contractApp.single);
				var metaParams=reqwest.toQueryString(this.state.searchParams1)
				console.log(metaParams);
				var par=param({
			    "contractProductId":contractApp.single.contractProductId,
			    "contractTemplateId":contractApp.single.contractTemplateId,
					"metaParams":metaParams,
				})
				reqwest(
					api(url.signContract,par)
				).then((req) => {
					console.log(req)
		      if(req.code == 0){
						message.success(req.msg)
		      }
				});
	    }.bind(this), 2000);
		})
 	}
 	handleSearch2(search){
    this.setState({
      searchParams2:search,
			amount:"searchParams2",
    }, () => {
			console.log(this.state);
	    clearInterval(this.timer1);
	    clearInterval(this.timer3);
	    this.timer2 = setInterval(function () {
				console.log(222222222222);
				console.log(this.state);
				console.log(contractApp.singleTimer);
	    }.bind(this), 2000);
		})
 	}
 	handleSearch3(search){
    this.setState({
      searchParams3:search,
			amount:"searchParams3",
    }, () => {
			console.log(this.state);
	    clearInterval(this.timer1);
	    clearInterval(this.timer2);
	    this.timer3 = setInterval(function () {
				console.log(333333333);
				console.log(this.state);
				console.log(contractApp.multipleLong);
	    }.bind(this), 2000);
		})
 	}
	// radio点击事件
	toggleChecked1(e) {
	  console.log(`checked = ${e.target.checked}`);
    this.setState({
			checked1: e.target.checked,
			checked2: false,
      checked3: false,
    });
		clearInterval(this.timer1);
		clearInterval(this.timer2);
		clearInterval(this.timer3);
	}
	toggleChecked2(e) {
	  console.log(`checked = ${e.target.checked}`);
    this.setState({
			checked1: false,
			checked2: e.target.checked,
      checked3: false,
    });
		clearInterval(this.timer1);
		clearInterval(this.timer2);
		clearInterval(this.timer3);
	}
	toggleChecked3(e) {
	  console.log(`checked = ${e.target.checked}`);
    this.setState({
			checked1: false,
			checked2: false,
      checked3: e.target.checked,
    });
		clearInterval(this.timer1);
		clearInterval(this.timer2);
		clearInterval(this.timer3);
	}
	render() {
		return(
			<div>
			    <Row>
			      <Col span={10}>
			      	<h2>转账设置</h2>
				     	<div className="con-list">
  								<Checkbox onChange={this.toggleChecked1.bind(this)} checked={this.state.checked1}>单次转账</Checkbox>
				     	</div>
							<div className="form-con" style={{display:this.state.checked1?"block":"none"}}>
								<p>设置转账的时间，根据设置的转账信息自动转账。一次设置只完成一次转账。</p>
				     		<FormCon1 onSearch={this.handleSearch1.bind(this)} />
							</div>
				     	<div className="con-list">
  								<Checkbox onChange={this.toggleChecked2.bind(this)} checked={this.state.checked2}>单次定时转账</Checkbox>
				     	</div>
							<div className="form-con" style={{display:this.state.checked2?"block":"none"}}>
								<p>设置转账的时间，根据设置的转账信息自动转账。一次设置只完成一次转账。</p>
				     		<FormCon2 onSearch={this.handleSearch2.bind(this)} />
							</div>
				     	<div className="con-list">
  								<Checkbox onChange={this.toggleChecked3.bind(this)} checked={this.state.checked3}>多次长期定时转账</Checkbox>
				     	</div>
							<div className="form-con" style={{display:this.state.checked3?"block":"none"}}>
								<p>设置转账的时间，根据设置的转账信息自动转账。一次设置只完成一次转账。</p>
				     		<FormCon3 onSearch={this.handleSearch3.bind(this)} />
							</div>
			      </Col>
			      <Col span={14}>
			      		<h2 style={{'marginBottom':'10px'}}>合约记录</h2>
			      		<ListTable/>
			      		<div className='list_bot'>
				      		<Row>
				      			<Col span={10}>
				      				<h2>账户余额</h2>
				      				<p className='showMoney'><span>{this.state.amount}</span>元</p>
				      			</Col>
				      			<Col span={14}>
				      				<h2>转账记录</h2>
				      				<RecordCon/>
				      			</Col>
				      		</Row>
			      		</div>
			      </Col>
			    </Row>
			  </div>
		)
	}
}

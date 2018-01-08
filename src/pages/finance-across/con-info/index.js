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
} from 'antd';
import reqwest from 'reqwest';

import ListTable from '../list-table'
import FormCon1 from './form1'
import FormCon2 from './form2'
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
const Option = Select.Option;

export default class ConInfo extends Component {
  constructor(props){
    super()
		this.state = {
			searchParams1:{},
			searchParams2:{},
			checked1: true,
			checked2: false,
			amount:100,
		};
  }
//	获取余额
	getAmount(){
		var par=param({})
		reqwest(
			api(url.transferBalanceQuery,par)
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
//	获取转账记录
	getAmount(){
		var par=param({})
		reqwest(
			api(url.transferQuery,par)
		).then((req) => {
			console.log(req)
			if(req.data){
				this.setState({
					data: req.data,
				})
			}
		});
	}
//	获取合约记录
	getRecord(){
		var par=param({})
		reqwest(
			api(url.transferQueryAll,par)
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
			console.log("----------------state---------------------");
			console.log(this.state);
      // var amount = this.state.amount;
      // amount -= 1;
      // if (amount < 1) {
      //   amount = 1.0;
		  //   clearInterval(this.timer);
      // }
      // this.setState({
      //   amount: amount
      // });
    }.bind(this), 2000);
	}
	componentDidMount() {
		// this.getTest()
	}

  componentWillUnmount() {
    clearInterval(this.timer);
  }
	// 搜索参数
 	handleSearch1(search){
		console.log(search);
    this.setState({
      searchParams1:search,
			amount:"searchParams1",
    }, () => {
			console.log(this.state);
		})
 	}
 	handleSearch2(search){
    this.setState({
      searchParams2:search,
			amount:"searchParams2",
    }, () => {
			console.log(this.state);
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
	}
	toggleChecked2(e) {
	  console.log(`checked = ${e.target.checked}`);
    this.setState({
			checked1: false,
			checked2: e.target.checked,
      checked3: false,
    });
	}
	render() {
		return(
			<div>
			    <Row>
			      <Col span={10}>
			      	<h2>跨链操作</h2>
				     	<div className="con-list">
  								<Checkbox onChange={this.toggleChecked1.bind(this)} checked={this.state.checked1}>组件化跨链合约</Checkbox>
				     	</div>
							<div className="form-con" style={{display:this.state.checked1?"block":"none"}}>
								<p>设置转账的时间，根据设置的转账信息自动转账。一次设置只完成一次转账。</p>
				     		<FormCon1 onSearch={this.handleSearch1.bind(this)} />
							</div>
				     	<div className="con-list">
  								<Checkbox onChange={this.toggleChecked2.bind(this)} checked={this.state.checked2}>常规跨链合约</Checkbox>
				     	</div>
							<div className="form-con" style={{display:this.state.checked2?"block":"none"}}>
								<p>设置转账的时间，根据设置的转账信息自动转账。一次设置只完成一次转账。</p>
				     		<FormCon2 onSearch={this.handleSearch2.bind(this)} />
							</div>
			      </Col>
			      <Col span={14}>
			      		<h2 style={{'marginBottom':'10px'}}>合约记录</h2>
			      		<ListTable/>
			      		<div className='list_bot'>
				      		<Row>
				      			<Col span={10}>
											<h2>房屋拥有者</h2>
											<p className='showMoney'><span>{this.state.amount}</span>套</p>
				      				<h2>金钱拥有者</h2>
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

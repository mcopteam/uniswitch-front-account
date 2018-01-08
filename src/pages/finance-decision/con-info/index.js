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
			checked1: true,
			amount:"是",
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
	render() {
		return(
			<div>
			    <Row>
			      <Col span={10}>
			      	<h2>决策合约</h2>
							<p>决策合约应用：决策个人是否具有北京市机动车摇号资格</p>
							<div className="form-con form-decision" style={{display:this.state.checked1?"block":"none"}}>
				     		<FormCon1 onSearch={this.handleSearch1.bind(this)} />
							</div>
			      </Col>
			      <Col span={14}>
			      		<h2 style={{'marginBottom':'10px'}}>合约记录</h2>
			      		<ListTable/>
			      		<div className='list_bot'>
				      		<Row>
				      			<Col span={10}>
											<h2>决策结果</h2>
											<p className='showMoney'><span>{this.state.amount}</span></p>
				      			</Col>
				      		</Row>
			      		</div>
			      </Col>
			    </Row>
			  </div>
		)
	}
}

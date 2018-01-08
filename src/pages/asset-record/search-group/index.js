import './index.less'
import React, {Component} from 'react'
import {
  connect
} from 'react-redux'
import {Form, Input, Button, Row, Col, Select} from 'antd'
import { assetQueryList,assetQueryAmount,assetQueryListCopy,assetQueryAmountCopy  } from '../../../actions/asset-query'
import { actionBlockchainOption } from  '../../../actions/blockchain-preserve'
import {
	api,
} from '../../../common/api_server'
import {
	url,
} from '../../../common/url_api'
import {
	param,
}from '../../../common/param'
import {
	btnIsShow,
}from '../../../common/btnIsShow'
import {
	button_list,
}from '../../../common/button_list'
import {
	queryButtonList,
}from '../../../actions/button_list'
import reqwest from 'reqwest';

const {Option} = Select

const searches = [
{
  name: '',
  key: 'username',
  label: '账户名称',
  id: 'username',
},{
  name: '',
  key: 'pubkey',
  label: '账户账号',
  id: 'pubkey',
  type: 'pubkey',
},{
  name: '',
  key: 'blockChainId',
  label: '区块链名称',
  id: 'blockChainId',
  type: 'blockChainId',
}]
const roleSelect = [{
  id: '0',
  name: '管理者',
},{
  id: '1',
  name: '设计者',
},{
  id: '2',
  name: '审核者',
},{
  id: '3',
  name: '用户',
}]


class SearchForm extends Component {
  constructor(props){
    super()
    this.state = {
      blockChainId: '',
      username: '',
      pubkey: '',
			preInfo:{},
      keys:[],
      user:'',
    }
  }
  render(){
		let { buttonList, blockchainOption } = this.props
    let {
      getFieldDecorator,
    } = this.props.form
    var keyList=[];
    if(this.state.keys){
       this.state.keys.forEach(function (item,index) {
         keyList.push(
           <Option key={item.id+'user'} value={item.publicKey}>{item.strOption}</Option>
         )
       })
     }else{
       keyList=[]
     }
    return (
      <Form
      horizontal
      style={{'marginTop': '15px','marginBottom':'30px'}}
      className='bill-search-form'
      onSubmit={this.handleSearch.bind(this)}>
        <Row gutter={10}>
        {
          searches.map((item, index) => {
            return (
              <Col span={12} key={item.key}>
                <Form.Item
                label={item.label}
                labelCol={{span: 4}}
                wrapperCol={{span: 20}}>
                  {getFieldDecorator(
                      item.id,{
      			            rules: [{ required: true, message: '请输入必选项!', whitespace: true }],
                      }
                    )(
                    item.type === 'pubkey'
                    ? (
                      <Select placeholder="请选择账号" onChange={this.handleChange.bind(this, item)}>
                        {keyList}
                      </Select>
                      )
                    :item.type === 'blockChainId'
                    ? (
                      <Select placeholder="请选择区块链名称" onChange={this.handleChange.bind(this, item)}>
                        {
                          blockchainOption.map((item, index) => {
                            return (
                              <Option key={item.id} value={item.id+''}>{item.name}</Option>
                            )
                          })
                        }
                      </Select>
                      )
                    : <Input onChange={this.handleChange.bind(this, item)} onBlur={this.getData.bind(this, item)} placeholder="" />
                  )}
                </Form.Item>
              </Col>
            )
          })
        }
        </Row>
        <Row>
          <Col span={24} key='submit' style={{textAlign: 'right'}}>
					<Button type="primary" onClick={this.handleReset} style={{ marginRight: "20px" }}>清空</Button>
            <Button type="primary" htmlType="submit" style={{display:btnIsShow(buttonList,button_list.query_assettraceKey)?"inline-block":"none"}}>{button_list.query_assettraceName}</Button>
          </Col>
        </Row>
      </Form>
    )

  }
	handleReset = () => {
		this.props.form.resetFields();
		this.setState({
      blockChainId:'',
			username:'',
      pubkey: '',
		})
    this.props.queryCopy();
	}
  componentDidMount(){
    this.props.fetchData();
    this.props.btnList()
    this.render()
  }
  getData(item, event){
    let value=event.target.value;
    var par=param({
  			"username":value,
  	})
    let data=[];
    let user='';
    reqwest(
    	api(url.accountKeypairList,par)
    ).then((req) => {
    	console.log(req)
    	if (req.code == 0) {
        if (req.result) {
            data=req.result;
            this.setState({
              keys:data,
              user:data[0].userId,
            })
          }else{
            data=[];
            this.setState({
              keys:data,
            })
          }
        this.render()
    	}
    });
  }
  handleChange(item, event){
    // console.log(event)
    let value
    switch(item.type){
      case 'pubkey':
        this.setState({
          [item.key]: event,
        })
        break
      case 'blockChainId':
        this.setState({
          [item.key]: event,
        })
        break
      default:
        this.setState({
          [item.key]: event.target.value,
        })
    }
    console.log(this.state);
  }
  handleSearch(e){
    e.preventDefault()
    console.log(this.state);
    this.props.onSearch(this.state)
		this.props.form.validateFields((err, values) => {
			if(!err) {
        this.handleReset();
        console.log(this.state);
        this.props.query(this.state,{"current":1});
      }else{
        this.props.queryCopy();
      }
    })
  }
}
const mapStateToProps = (state) => {
  return {
    ...state.blockchainOption,
    ...state.assetList,
    ...state.amount,
    ...state.buttonList
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    query:(search,pag) => {
      assetQueryList(dispatch,search,pag)
      assetQueryAmount(dispatch,search)
    },
    queryCopy:(search,pag) => {
      assetQueryListCopy(dispatch,search,pag)
      assetQueryAmountCopy(dispatch,search)
    },
		btnList: () => {
			queryButtonList(dispatch)
		},
    fetchData: () => {
      actionBlockchainOption(dispatch);
    },
  }
}
const SearchGroup = Form.create()(SearchForm)
export default connect(mapStateToProps, mapDispatchToProps)(SearchGroup)

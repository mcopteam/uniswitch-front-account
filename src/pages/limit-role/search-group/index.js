import './index.less'
import React, {Component} from 'react'
import { connect } from 'react-redux'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import DatePicker from 'antd/lib/date-picker'
import Select from 'antd/lib/select'
import reqwest from 'reqwest';
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
import { actionLimitRoleSearchCopy,actionLimitRoleSearch } from  '../../../actions/limit-role'

const {RangePicker} = DatePicker
const {Option} = Select
const searches = [
{
  name: '',
  key: 'roleSelect',
  label: '角色名称',
  id: 'roleSelect',
  type: 'roleSelect',
},]


class SearchForm extends Component {
  constructor(props){
    super()
    this.state = {
      roleSelect: '',
			roleList:[],
    }
  }
  render(){
		let {buttonList} = this.props
    let {
      getFieldDecorator,
    } = this.props.form
		var keys=[];
		this.state.roleList.forEach(function (item,index) {
			keys.push(
				<Option key={item.id} value={item.id}>{item.name}</Option>
			)
		})
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
                labelCol={{span: 5}}
                wrapperCol={{span: 16}}>
                  {getFieldDecorator(item.id)(
                    item.type === 'roleSelect'
                    ? (
                      <Select onChange={this.handleChange.bind(this, item)}>
											{keys}
                      </Select>
                      )
                    : <Input onChange={this.handleChange.bind(this, item)} placeholder="" />
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
            <Button type="primary" htmlType="submit" style={{display:btnIsShow(buttonList,button_list.query_roleKey)?"inline-block":"none"}}>{button_list.query_roleName}</Button>
          </Col>
        </Row>
      </Form>
    )

  }
	handleReset = () => {
		this.props.form.resetFields();
		this.setState({
      roleSelect: '',
		})
    this.props.fetchRoleCopy()
	}
	componentDidMount(){
		this.props.btnList()
		this.render()
	  var par=param({
	    "pageSize":100,
		})
	  reqwest(
	  	api(url.limitRoleList,par)
	  ).then((req) => {
	  	console.log(req)
	  	if (req.code == 0) {
				this.setState({
					roleList:req.result.data
				})
	  	}
			console.log(this.state);
	  });
	}
  handleChange(item, event){
    // console.log(event)
    let value
    switch(item.type){
      case 'roleSelect':
        this.setState({
          [item.key]: event,
        })
        break
      default:
        this.setState({
          [item.key]: event.target.value,
        })
    }
  }
  handleSearch(e){
    e.preventDefault()
    console.log(this.state);
		this.props.onSearch(this.state)
    this.props.fetchRole(this.state,{"current":1})
  }
}
const mapStateToProps = (state) => {
  return {
    ...state.limitRole,
    ...state.buttonList
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
		fetchRole(search,pag){
			actionLimitRoleSearch(dispatch,search,pag)
		},
		fetchRoleCopy(search,pag){
			actionLimitRoleSearchCopy(dispatch,search,pag)
		},
		btnList: () => {
			queryButtonList(dispatch)
		}
  }
}
const SearchGroup = Form.create()(SearchForm);
export default connect(mapStateToProps, mapDispatchToProps)(SearchGroup)

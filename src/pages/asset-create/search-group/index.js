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
import { actionLimitRoleSearchCopy } from  '../../../actions/limit-role'
import { preList } from '../../../actions/preList'
import {
	btnIsShow,
}from '../../../common/btnIsShow'
import {
	button_list,
}from '../../../common/button_list'
import {
	queryButtonList,
}from '../../../actions/button_list'

const {RangePicker} = DatePicker
const {Option} = Select
const searches = [
{
  name: '',
  key: 'username',
  label: '账户名称',
  id: 'username',
},{
  name: '',
  key: 'roleSelect',
  label: '账户角色',
  id: 'roleSelect',
  type: 'roleSelect',
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
      roleSelect: '',
    }
  }
  render(){
		let {roleList,buttonList} = this.props
    let {
      getFieldDecorator,
    } = this.props.form
		if (roleList.data) {
			roleList=roleList.data;
		}
		var keys=[];
		roleList.forEach(function (item,index) {
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
                    : item.type === 'effectSelect'
                    ? (
                      <Select onChange={this.handleChange.bind(this, item)}>
                        {
                          effectSelect.map((item, index) => {
                            return (
                              <Option key={item.id} value={item.id}>{item.name}</Option>
                            )
                          })
                        }
                      </Select>
                      )
                    : item.type === 'statusSelect'
                    ? (
                      <Select onChange={this.handleChange.bind(this, item)}>
                        {
                          statusSelect.map((item, index) => {
                            return (
                              <Option key={item.id} value={item.id}>{item.name}</Option>
                            )
                          })
                        }
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
            <Button type="primary" htmlType="submit" style={{display:btnIsShow(buttonList,button_list.query_accountassetKey)?"inline-block":"none"}}>{button_list.query_accountassetName}</Button>
          </Col>
        </Row>
      </Form>
    )

  }
	handleReset = () => {
		this.props.form.resetFields();
		this.setState({
			username:'',
      roleSelect: '',
		})
    this.props.fetchDate()
	}
	componentDidMount(){
		this.props.fetchRole()
		this.props.btnList()
		this.render()
	}
  handleChange(item, event){
    let value
    switch(item.type){
      case 'roleSelect':
        this.setState({
          [item.key]: event,
        })
        break
      case 'effectSelect':
        this.setState({
          [item.key]: event,
        })
        break
      case 'statusSelect':
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
    this.props.fetchDate(this.state,{"current":1})
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
    fetchDate: (search,pag) => {
      preList(dispatch,search,pag);
    },
		fetchRole(){
			actionLimitRoleSearchCopy(dispatch)
		},
		btnList: () => {
			queryButtonList(dispatch)
		}
  }
}
const SearchGroup = Form.create()(SearchForm)
export default connect(mapStateToProps, mapDispatchToProps)(SearchGroup)

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
  key: 'itemTitle',
  label: '合约名称',
  id: 'orderitemTitleinput',
},{
  name: '',
  key: 'orderCode',
  label: '合约编号',
  id: 'orderordercodeinput',
},{
  name: '',
  key: 'status',
  label: '合约状态',
  id: 'status',
  type: 'status',
},{
  name: '',
  key: 'createdate',
  label: '合约日期',
  id: 'ordercreatetimeinput',
  type: 'time',
}]


const statusSelect = [
	{
  id: '1',
  name: '未审批',
	},{
	  id: '3',
	  name: '审批通过',
	},{
	  id: '4',
	  name: '已发布',
	}
]
class SearchForm extends Component {
  constructor(props){
    super()
    this.state = {
      itemTitle: '',
      orderCode: '',
			status:'',
      createTimeStart: '', // 订单
      createTimeEnd: '',
    }
  }
  render(){
		let {buttonList} = this.props
    let {
      getFieldDecorator,
    } = this.props.form
    return (
      <Form
      horizontal
      style={{'marginTop': '15px'}}
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
                    item.type === 'status'
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
                    :item.type === 'date'
                    ? <RangePicker onChange={this.handleChange.bind(this, item)}/>
                    : item.type === 'time'
                    ? <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{width: '100%',"display":"block"}} onChange={this.handleChange.bind(this, item)}/>
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
            <Button type="primary" htmlType="submit" style={{display:btnIsShow(buttonList,button_list.query_contractproductinproductKey)?"inline-block":"none"}}>{button_list.query_contractproductinproductName}</Button>
          </Col>
        </Row>
      </Form>
    )

  }
	componentDidMount(){
		this.props.btnList()
		this.render()
	}
	handleReset = () => {
		this.props.form.resetFields();
		this.setState({
      itemTitle: '',
      orderCode: '',
			status:'',
      createTimeStart: '',
      createTimeEnd: '',
		})
	}
  handleChange(item, event, info){
    console.log(event, info)
    let value
    switch(item.type){
      case 'date':
			case 'status':
				this.setState({
					[item.key]: event,
				})
				break
      case 'time':
        let pre = item.key.substring(0, item.key.indexOf('date'))
        this.setState({
          [pre + 'TimeStart']: info[0] || '',
          [pre + 'TimeEnd']: info[1] || '',
        }, () => {
          console.log(this.state);
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
    this.props.onSearch(this.state)
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.buttonList
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
		btnList: () => {
			queryButtonList(dispatch)
		}
  }
}
const SearchGroup = Form.create()(SearchForm);
export default connect(mapStateToProps, mapDispatchToProps)(SearchGroup)

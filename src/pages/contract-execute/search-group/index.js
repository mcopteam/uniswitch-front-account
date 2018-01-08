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
}]


class SearchForm extends Component {
  constructor(props){
    super()
    this.state = {
      itemTitle: '',
      orderCode: '',
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
                    <Input onChange={this.handleChange.bind(this, item)} placeholder="" />
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
            <Button type="primary" htmlType="submit" style={{display:btnIsShow(buttonList,button_list.query_contractKey)?"inline-block":"none"}}>{button_list.query_contractName}</Button>
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
		})
	}
  handleChange(item, event, info){
    console.log(event, info)
    let value
    switch(item.type){
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

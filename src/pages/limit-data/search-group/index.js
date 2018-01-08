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
import {actionLimitDataSearch} from '../../../actions/limit-data'
const FormItem = Form.Item;

class SearchForm extends Component {
  constructor(props){
    super()
    this.state = {

    }
  }
  render(){
    let { getFieldDecorator } = this.props.form
    return (
      <Form
      horizontal
      style={{'marginTop': '15px','marginBottom':'30px'}}
      className='bill-search-form'
      onSubmit={this.handleSearch.bind(this)}>
        <Row gutter={10}>
          <Col span={12}>
            <FormItem
                label={'数据ID'}
                labelCol={{span: 5}}
                wrapperCol={{span: 16}}>
              {getFieldDecorator('btnId', {
              })(
                <Input size="large" placeholder="数据ID" />
                )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
                label={'数据名称'}
                labelCol={{span: 5}}
                wrapperCol={{span: 16}}>
              {getFieldDecorator('btnName', {
              })(
                <Input size="large" placeholder="数据名称" />
                )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24} key='submit' style={{textAlign: 'right'}}>
				    <Button type="primary" onClick={this.handleReset} style={{ marginRight: "20px" }}>清空</Button>
            <Button type="primary" htmlType="submit">查询</Button>
          </Col>
        </Row>
      </Form>
    )
  }
	handleReset = () => {
		this.props.form.resetFields();
		this.setState({
			id:'',
      name: '',
		})
    this.props.handleConfirmOk()
	}
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
  		this.props.onSearch(values)
      this.props.handleConfirmOk(values,{});
    });
  }
}
const mapStateToProps = (state) => {
  return {
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    // 点击搜索按钮的搜索结果
    handleConfirmOk: (search, pag) => {
      actionLimitDataSearch(dispatch, search, pag);
    }
  }
}

const SearchGroup = Form.create()(SearchForm)
export default connect(mapStateToProps, mapDispatchToProps)(SearchGroup);

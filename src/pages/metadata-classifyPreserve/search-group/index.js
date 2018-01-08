import './index.less'
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Form, Input,Row, Col, Modal,Select, Table, Icon, Button, message   } from 'antd';
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
import { metadataCategoryListCopy } from  '../../../actions/metadata-category'
const {Option} = Select
const searches = [{
  name: '',
  key: 'categoryName',
  label: '分类名称',
  id: 'categoryName',
  type: 'categoryName',
},
{
  name: '',
  key: 'categoryId',
  label: '父级分类',
  id: 'categoryId',
  type: 'categoryId',
},]

class SearchForm extends Component {
  constructor(props){
    super()
    this.state = {
      categoryId: '',
      categoryName: '',
    }
  }
  render(){
    let {
      getFieldDecorator,
    } = this.props.form
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
	                    item.type === 'categoryId'
	                    ? (
	                      <Select onChange={this.handleChange.bind(this, item)}>
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
            <Button type="primary" htmlType="submit" >查询</Button>
          </Col>
        </Row>
      </Form>
    )
  }
	handleReset = () => {
		this.props.form.resetFields();
		this.setState({
			categoryId:'',
      categoryName: '',
		})
		this.props.fetchData()
	}
  handleChange(item, event){
    switch(item.type){
      case 'categoryId':
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
		this.setState({
			...this.state,
			categoryId:0,
		}, () => {
			console.log(this.state);
			this.props.onSearch(this.state)
	    this.props.fetchData(this.state,{"current":1})
		})
  }
}

const mapStateToProps = (state) => {
  return {
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (search,pag) => {
      metadataCategoryListCopy(dispatch,search,pag);
    },
  }
}
const SearchGroup = Form.create()(SearchForm);
export default connect(mapStateToProps, mapDispatchToProps)(SearchGroup)

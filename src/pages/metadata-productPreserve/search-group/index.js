import './index.less'
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Form, Input,Row, Col, Modal, Select, Icon, Button, message } from 'antd';
import { metadataDataListCopy } from  '../../../actions/metadata-datas'
import { metadataCategoryListCopy } from  '../../../actions/metadata-category'
const {Option} = Select
const searches = [
    {
      name: '',
      key: 'categoryId',
      label: '数据分类',
      id: 'categoryId',
      type: 'categoryId',
    },{
        name: '',
        key: 'dataId',
        label: '数据ID',
        id: 'dataId',
        type: 'dataId',
    },{
        name: '',
        key: 'dataName',
        label: '数据名称',
        id: 'dataName',
        type: 'dataName',
    },{
        name: '',
        key: 'dataStatus',
        label: '数据状态',
        id: 'dataStatus',
        type: 'dataStatus',
    }
]
const statusSelect = [
{
  id: '1',
  name: '新建',
},{
  id: '5',
  name: '上架',
},{
  id: '6',
  name: '下架',
}]
class SearchForm extends Component {
  constructor(props){
    super()
    this.state = {
        categoryId: '',
        dataId: '',
        dataName: '',
        dataStatus: '',
    }
  }
  render(){
    let{metaGategoryList}=this.props
		if (metaGategoryList.data) {
			metaGategoryList=metaGategoryList.data;
		}
    console.log(metaGategoryList);
    let {
      getFieldDecorator,
    } = this.props.form

		var keys=[];
		metaGategoryList.forEach(function (item,index) {
			keys.push(
				<Option key={index} value={item.categoryId+""}>{item.categoryName}</Option>
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
                    item.type === 'categoryId'
                    ? (
                      <Select onChange={this.handleChange.bind(this, item)}>
                      {keys}
                      </Select>
                      )
                    :item.type === 'dataStatus'
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
              <Button type="primary" htmlType="submit" >查询</Button>
          </Col>
        </Row>
      </Form>
    )

  }
	handleReset = () => {
		this.props.form.resetFields();
		this.setState({
      categoryId: '',
      dataId: '',
      dataName: '',
      dataStatus: '',
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
      case 'dataStatus':
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
    this.props.onSearch(this.state)
    this.props.fetchData(this.state,{"current":1})
  }
	componentDidMount(){
    console.log(222222222222222);
		this.props.fetchCategory("all")
		// this.render()
	}
}
const mapStateToProps = (state) => {
  return {
    ...state.metaGategoryList,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (search,pag) => {
      metadataDataListCopy(dispatch,search,pag);
    },
    fetchCategory: (type) => {
      metadataCategoryListCopy(dispatch,{},{},type);
    },
  }
}
const SearchGroup = Form.create()(SearchForm);
export default connect(mapStateToProps, mapDispatchToProps)(SearchGroup)

import './index.less'
import React from 'react';
import { connect } from 'react-redux'
import { Row, Col, Form, Icon, Input, Button, Checkbox, message, Tooltip, Cascader, Select, InputNumber } from 'antd';
import { hashHistory } from 'react-router'
import { metadataDataEdit } from  '../../../../actions/metadata-datas'
import { metadataCategoryListCopy } from  '../../../../actions/metadata-category'
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

let uuid = 0;
class NormalLoginForm extends React.Component {
  constructor(props) {
		super(props)
      this.state = {
      };
  }
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if(!err) {
        console.log(values);
        values={
          ...values,
          attrArr:[],
        }
        for (var i = 1; i < values.keys.length+1; i++) {
          values.attrArr.push(
            {
              "attrId":values["attrId"+i]||"",
              "attrVar":values["attrVar"+i],
              "attrName":values["attrName"+i],
              "attrValue":values["attrValue"+i],
            }
          )
        }
        let data={
          "dataId":this.props.preInfo.dataId+'',
          "categoryId":values.categoryId+'',
          "dataName":values.dataName,
          "dataLable":values.dataLable,
          "dataAbstract":values.dataAbstract,
          "dataDesc":values.dataDesc,
          "dataPrice":values.dataPrice+'',
          "dataFormat":values.dataFormat,
          "dataCharSet":values.dataCharSet,
          "dataFrequency":values.dataFrequency,
          "dataFrequencyUnit":values.dataFrequencyUnit,
          "dataSave":values.dataSave,
          "dataSaveUnit":values.dataSaveUnit,
          "dataType":values.dataType,
          "dataSize":values.dataSize,
          "dataSizeUnit":values.dataSizeUnit,
          "dataAddress":values.dataAddress,
          "attributeList":values.attrArr,
        }
  				console.log('Received values of form: ', data);
        let datas={
          "dataParams":JSON.stringify(data)
        }
        console.log(datas);
        this.props.form.resetFields()
				this.props.submitCreate(datas)
				this.props.onOk();
			}
		});
	}
	componentDidMount(){
		this.props.fetchCategory("all")
		this.render()
	}



  remove = (k) => {
      const { form } = this.props;
      // can use data-binding to get
      const keys = form.getFieldValue('keys');
      // We need at least one passenger
      if (keys.length === 1) {
        return;
      }

      // can use data-binding to set
      form.setFieldsValue({
        keys: keys.filter(key => key !== k),
      });
    }

    add = () => {
      uuid++;
      const { form } = this.props;
      // can use data-binding to get
      const keys = form.getFieldValue('keys');
      const nextKeys = keys.concat(uuid);
      // can use data-binding to set
      // important! notify form to detect changes
      form.setFieldsValue({
        keys: nextKeys,
      });
    }

    checkPrice = (rule, value, callback) => {
      if (value.number > 0) {
        callback();
        return;
      }
      callback('Price must greater than zero!');
    }

	render() {
    let{preInfo, metaGategoryList}=this.props
    console.log(metaGategoryList);
    metaGategoryList=metaGategoryList.data||[];
		console.log(preInfo);
		const {
			getFieldDecorator,
      getFieldValue
		} = this.props.form;
		 const formItemLayout = {
	      labelCol: {
	        xs: { span: 24 },
	        sm: { span: 6 },
	      },
	      wrapperCol: {
	        xs: { span: 24 },
	        sm: { span: 14 },
	      },
	    };
        const tailFormItemLayout = {
	      wrapperCol: {
	        xs: {
	          span: 24,
	          offset: 0,
	        },
	        sm: {
	          span: 14,
	          offset: 6,
	        },
	      },
	    };
		 const formItemLayoutGroup = {
        labelCol: { span: 9 },
        wrapperCol: { span: 15 },
	    };
		 const formItemLayoutUnit = {
        labelCol: { span: 0 },
        wrapperCol: { span: 12 },
	    };
      const formItemLayoutWithOutLabel = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 14, offset: 6 },
        },
      };
      let attributeList=preInfo.attributeList;
      getFieldDecorator('keys', { initialValue: attributeList });
      const keys = getFieldValue('keys');
      console.log(attributeList);
      const formItems = keys.map((k, index) => {
        return (
          <div className="attrForm">
            <Row>
              <Col span={6}>
                <FormItem
                  {...formItemLayoutWithOutLabel}
                  label={index === 0 ? '' : ''}
                  required={false}
                  key={k+'Id'}
                >
                  {getFieldDecorator(`attrId${index+1}`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    initialValue:k.attrId,
                  })(
                    <Input readOnly placeholder="ID不可修改！" style={{ width: '75%', marginRight: 3 }} />
                  )}
                  {keys.length > 1 ? (
                    <Icon
                      className="dynamic-delete-button"
                      type="minus-circle-o"
                      disabled={keys.length === 1}
                      onClick={() => this.remove(k)}
                    />
                  ) : null}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem
                  {...formItemLayoutWithOutLabel}
                  label={index === 0 ? '' : ''}
                  required={false}
                  key={k+'var'}
                >
                  {getFieldDecorator(`attrVar${index+1}`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                      required: true,
                      whitespace: true,
                      message: "请输入属性标识",
                    }],
                    initialValue:k.attrVar,
                  })(
                    <Input placeholder={"属性标识"+(index+1)} style={{ width: '75%', marginRight: 3 }} />
                  )}
                  {keys.length > 1 ? (
                    <Icon
                      className="dynamic-delete-button"
                      type="minus-circle-o"
                      disabled={keys.length === 1}
                      onClick={() => this.remove(k)}
                    />
                  ) : null}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem
                  {...formItemLayoutWithOutLabel}
                  label={index === 0 ? '' : ''}
                  required={false}
                  key={k+"name"}
                >
                  {getFieldDecorator(`attrName${index+1}`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                      required: true,
                      whitespace: true,
                      message: "请输入属性名称",
                    }],
    								initialValue:k.attrName,
                  })(
                    <Input placeholder={"属性名称"+(index+1)} style={{ width: '75%', marginRight: 3 }} />
                  )}
                  {keys.length > 1 ? (
                    <Icon
                      className="dynamic-delete-button"
                      type="minus-circle-o"
                      disabled={keys.length === 1}
                      onClick={() => this.remove(k)}
                    />
                  ) : null}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem
                  {...formItemLayoutWithOutLabel}
                  label={index === 0 ? '' : ''}
                  required={false}
                  key={k+"value"}
                >
                  {getFieldDecorator(`attrValue${index+1}`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                      required: true,
                      whitespace: true,
                      message: "请输入属性值",
                    }],
    								initialValue:k.attrValue,
                  })(
                    <Input placeholder={"属性值"+(index+1)} style={{ width: '75%', marginRight: 3 }} />
                  )}
                  {keys.length > 1 ? (
                    <Icon
                      className="dynamic-delete-button"
                      type="minus-circle-o"
                      disabled={keys.length === 1}
                      onClick={() => this.remove(k)}
                    />
                  ) : null}
                </FormItem>
              </Col>
            </Row>
          </div>
        );
      });
    var keyList=[];
		metaGategoryList.forEach(function (item,index) {
			keyList.push(
				<Option key={index} value={item.categoryId+""}>{item.categoryName}</Option>
			)
		})
		return(
  		<Form onSubmit={this.handleSubmit}>
        <p className="fontP">数据基本属性：</p>
        <FormItem
          {...formItemLayout}
          label="数据分类"
          hasFeedback
        >
          <div className="input-wrap">
            {getFieldDecorator('categoryId', {
                rules: [{ required: true, message: '请选择数据分类'}],
								initialValue:preInfo.categoryId,
              })(
                <Select>
                {keyList}
                </Select>
            )}
          </div>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="数据名称"
          hasFeedback
        >
          <div className="input-wrap">
            {getFieldDecorator('dataName', {
                rules: [{ required: true, message: '请输入数据名称'}],
								initialValue:preInfo.dataName,
              })(
              <Input name='name' key='name'/>
            )}
          </div>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="数据标签"
          hasFeedback
        >
          <div className="input-wrap">
            {getFieldDecorator('dataLable', {
                rules: [{ required: true, message: '请输入数据标签'}],
								initialValue:preInfo.dataLable,
              })(
              <Input name='name' key='name'/>
            )}
          </div>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="数据摘要"
          hasFeedback
        >
          <div className="input-wrap">
            {getFieldDecorator('dataAbstract', {
                rules: [{ required: true, message: '请输入数据摘要'}],
								initialValue:preInfo.dataAbstract,
              })(
              <TextArea name='note' key='note'/>
            )}
          </div>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="数据描述"
          hasFeedback
        >
          <div className="input-wrap">
            {getFieldDecorator('dataDesc', {
                rules: [{ required: true, message: '请输入数据描述'}],
								initialValue:preInfo.dataDesc,
              })(
              <TextArea name='note' key='note'/>
            )}
          </div>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="数据价格(分)"
          hasFeedback
        >
          <div className="input-wrap">
            {getFieldDecorator('dataPrice', {
                rules: [{ required: true, message: '请输入数据价格'}],
								initialValue:preInfo.dataPrice,
              })(
              <Input name='name' key='name'/>
            )}
          </div>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="数据格式"
          hasFeedback
        >
          <div className="input-wrap">
            {getFieldDecorator('dataFormat', {
                rules: [{ required: true, message: '请输入数据数据格式'}],
								initialValue:preInfo.dataFormat,
              })(
                <Select>
                  <Option value="basic">audio/basic</Option>
                  <Option value="jpeg">image/jpeg</Option>
                  <Option value="png">image/png</Option>
                  <Option value="mpeg">video/mpeg</Option>
                  <Option value="xml">text/xml</Option>
                  <Option value="plain">text/plain</Option>
                  <Option value="json">application/json</Option>
                </Select>
            )}
          </div>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="数据编码"
          hasFeedback
        >
          <div className="input-wrap">
            {getFieldDecorator('dataCharSet', {
                rules: [{ required: true, message: '请选择数据编码'}],
								initialValue:preInfo.dataCharSet,
              })(
                <Select>
                  <Option value="utf8">utf8</Option>
                  <Option value="gb2312">gb2312</Option>
                  <Option value="latin1">latin1</Option>
                </Select>
            )}
          </div>
        </FormItem>
        <Row gutter={20}>
          <Col span={16}>
            <FormItem
              {...formItemLayoutGroup}
              label="数据更新频率"
              hasFeedback
            >
              <div className="input-wrap">
                {getFieldDecorator('dataFrequency', {
                    rules: [{ required: true, message: '请选择数据更新频率'}],
    								initialValue:preInfo.dataFrequency,
                  })(
                  <InputNumber min={1}  style={{"width":"100%"}}/>
                )}
              </div>
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...formItemLayoutUnit}
              label=""
              hasFeedback
            >
              <div className="input-wrap">
                {getFieldDecorator('dataFrequencyUnit', {
                    rules: [{ required: true, message: '请选择单位'}],
    								initialValue:preInfo.dataFrequencyUnit,
                  })(
                    <Select>
                      <Option value="year">年</Option>
                      <Option value="month">月</Option>
                      <Option value="day">日</Option>
                      <Option value="hour">时</Option>
                      <Option value="minute">分</Option>
                      <Option value="second">秒</Option>
                    </Select>
                )}
              </div>
            </FormItem>
          </Col>
        </Row>

        <Row gutter={20}>
          <Col span={16}>
            <FormItem
              {...formItemLayoutGroup}
              label="数据留存时间"
              hasFeedback
            >
              <div className="input-wrap">
                {getFieldDecorator('dataSave', {
                    rules: [{ required: true, message: '请选择数据留存时间'}],
    								initialValue:preInfo.dataSave,
                  })(
                  <InputNumber min={1}  style={{"width":"100%"}}/>
                )}
              </div>
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...formItemLayoutUnit}
              label=""
              hasFeedback
            >
              <div className="input-wrap">
                {getFieldDecorator('dataSaveUnit', {
                    rules: [{ required: true, message: '请选择单位'}],
    								initialValue:preInfo.dataSaveUnit,
                  })(
                    <Select>
                      <Option value="year">年</Option>
                      <Option value="month">月</Option>
                      <Option value="day">日</Option>
                      <Option value="hour">时</Option>
                      <Option value="minute">分</Option>
                      <Option value="second">秒</Option>
                    </Select>
                )}
              </div>
            </FormItem>
          </Col>
        </Row>
        <FormItem
          {...formItemLayout}
          label="数据类型"
          hasFeedback
        >
          <div className="input-wrap">
            {getFieldDecorator('dataType', {
                rules: [{ required: true, message: '请选择数据类型'}],
								initialValue:preInfo.dataType,
              })(
                <Select>
                  <Option value="text">文本</Option>
                  <Option value="image">图片</Option>
                  <Option value="video">视频</Option>
                </Select>
            )}
          </div>
        </FormItem>

        <Row gutter={20}>
          <Col span={16}>
            <FormItem
              {...formItemLayoutGroup}
              label="数据大小"
              hasFeedback
            >
              <div className="input-wrap">
                {getFieldDecorator('dataSize', {
                    rules: [{ required: true, message: '请输入数据大小'}],
    								initialValue:preInfo.dataSize,
                  })(
                  <InputNumber min={1}  style={{"width":"100%"}}/>
                )}
              </div>
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...formItemLayoutUnit}
              label=""
              hasFeedback
            >
              <div className="input-wrap">
                {getFieldDecorator('dataSizeUnit', {
                    rules: [{ required: true, message: '请选择单位'}],
    								initialValue:preInfo.dataSizeUnit,
                  })(
                    <Select>
                      <Option value="B">B</Option>
                      <Option value="KB">KB</Option>
                      <Option value="MB">MB</Option>
                      <Option value="GB">GB</Option>
                      <Option value="TB">TB</Option>
                      <Option value="PB">PB</Option>
                    </Select>
                )}
              </div>
            </FormItem>
          </Col>
        </Row>
        <FormItem
          {...formItemLayout}
          label="数据路径"
          hasFeedback
        >
          <div className="input-wrap">
            {getFieldDecorator('dataAddress', {
                rules: [{ required: true, message: '请输入数据路径'}],
								initialValue:preInfo.dataAddress,
              })(
              <Input name='name' key='name'/>
            )}
          </div>
        </FormItem>
        <hr/>
        <p className="fontP">扩展属性信息：</p>
          <Row style={{marginBottom:"15px",marginTop:"15px"}}>
            <Col span={6}>
              <p style={{textAlign:"center"}}>属性ID</p>
            </Col>
            <Col span={6}>
              <p style={{textAlign:"center"}}>属性标识</p>
            </Col>
            <Col span={6}>
              <p style={{textAlign:"center"}}>属性名称</p>
            </Col>
            <Col span={6}>
              <p style={{textAlign:"center"}}>属性值</p>
            </Col>
          </Row>
          {formItems}
          <FormItem {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
              <Icon type="plus" />添加扩展属性
            </Button>
          </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" style={{marginLeft:"33%"}}>更新</Button>
        </FormItem>
      </Form>
		);
	}
}
const mapStateToProps = (state) => {
  return {
    ...state.metaGategoryList,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    submitCreate: (info) => {
      metadataDataEdit(dispatch, info);
    },
    fetchCategory: (type) => {
      metadataCategoryListCopy(dispatch,{},{},type);
    },
  }
}
const DetailForm = Form.create()(NormalLoginForm);
export default connect(mapStateToProps, mapDispatchToProps)(DetailForm)

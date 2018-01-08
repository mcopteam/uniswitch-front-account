import './index.less'
import React, { Component } from 'react'
import { Row, Col, Form, Modal, Button,Input, Icon, message, Select, InputNumber } from 'antd';
import { metadataDataCreate } from  '../../../../actions/metadata-datas'
import { metadataCategoryListCopy } from  '../../../../actions/metadata-category'
import { connect } from 'react-redux'
const FormItem = Form.Item;
const { TextArea } = Input;
let uuid = 0;
const {Option} = Select
class NormalLoginForm extends React.Component {
  constructor(props) {
		super()
      this.state = {
      };
  }
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if(!err) {
        values={
          ...values,
          attrArr:[],
        }
        for (var i = 0; i < values.keys.length; i++) {
          values.attrArr.push(
            {
              "attrVar":values["attrVar"+values.keys[i]],
              "attrName":values["attrName"+values.keys[i]],
              "attrValue":values["attrValue"+values.keys[i]],
            }
          )
        }
        let data={
          "categoryId":values.categoryId,
          "dataName":values.dataName,
          "dataLable":values.dataLable,
          "dataAbstract":values.dataAbstract,
          "dataDesc":values.dataDesc,
          "dataPrice":values.dataPrice,
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
        // this.props.form.resetFields()
        this.props.submitCreate(datas);
			}
		});
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
    let{metaGategoryList}=this.props;
		if (metaGategoryList.data) {
			metaGategoryList=metaGategoryList.data;
		}
    console.log(metaGategoryList);
		const {
			getFieldDecorator,
      getFieldValue
		} = this.props.form;
		 const formItemLayout = {
	      labelCol: {
	        xs: { span: 12 },
	        sm: { span: 6 },
	      },
	      wrapperCol: {
	        xs: { span: 12 },
	        sm: { span: 14 },
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
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 12,
            offset: 0,
          },
          sm: {
            span: 12,
            offset: 6,
          },
        },
      };

  		var keyList=[];
  		metaGategoryList.forEach(function (item,index) {
  			keyList.push(
  				<Option key={index} value={item.categoryId+""}>{item.categoryName}</Option>
  			)
  		})

      const formItemLayoutWithOutLabel = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 14, offset: 6 },
        },
      };
      getFieldDecorator('keys', { initialValue: [] });
      const keys = getFieldValue('keys');
      const formItems = keys.map((k, index) => {
        return (
          <div>
            <Row>
              <Col span={8}>
                <FormItem
                  {...formItemLayoutWithOutLabel}
                  label={index === 0 ? '' : ''}
                  required={false}
                  key={k+'var'}
                >
                  {getFieldDecorator(`attrVar${k}`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                      required: true,
                      whitespace: true,
                      message: "请输入属性标识",
                    }],
                  })(
                    <Input placeholder={"属性标识"+k} style={{ width: '80%', marginRight: 8 }} />
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
                <Col span={8}>
                  <FormItem
                    {...formItemLayoutWithOutLabel}
                    label={index === 0 ? '' : ''}
                    required={false}
                    key={k+"name"}
                  >
                    {getFieldDecorator(`attrName${k}`, {
                      validateTrigger: ['onChange', 'onBlur'],
                      rules: [{
                        required: true,
                        whitespace: true,
                        message: "请输入属性名称",
                      }],
                    })(
                      <Input placeholder={"属性名称"+k} style={{ width: '80%', marginRight: 8 }} />
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
                <Col span={8}>
                  <FormItem
                    {...formItemLayoutWithOutLabel}
                    label={index === 0 ? '' : ''}
                    required={false}
                    key={k+"value"}
                  >
                    {getFieldDecorator(`attrValue${k}`, {
                      validateTrigger: ['onChange', 'onBlur'],
                      rules: [{
                        required: true,
                        whitespace: true,
                        message: "请输入属性值",
                      }],
                    })(
                      <Input placeholder={"属性值"+k} style={{ width: '80%', marginRight: 8 }} />
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

		return(
  		<Form onSubmit={this.handleSubmit}>
        <p className="fontP">基本属性信息：</p>

        <FormItem
          {...formItemLayout}
          label="数据分类"
          hasFeedback
        >
          <div className="input-wrap">
            {getFieldDecorator('categoryId', {
                rules: [{ required: true, message: '请选择数据分类'}],
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
                  })(
                    <Select>
                      <Option value="year">年</Option>
                      <Option value="month">月</Option>
                      <Option value="day">日</Option>
                      <Option value="hour">小时</Option>
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
                  })(
                    <Select>
                      <Option value="year">年</Option>
                      <Option value="month">月</Option>
                      <Option value="day">日</Option>
                      <Option value="hour">小时</Option>
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
              })(
              <Input name='name' key='name'/>
            )}
          </div>
        </FormItem>
        <hr/>
        <p className="fontP">扩展属性信息：</p>
          <Row style={{marginBottom:"20px"}}>
            <Col span={8}>
              <p style={{textAlign:"center"}}>属性标识</p>
            </Col>
            <Col span={8}>
              <p style={{textAlign:"center"}}>属性名称</p>
            </Col>
            <Col span={8}>
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
          <Button type="primary" htmlType="submit" style={{marginLeft:"33%"}}>添加</Button>
        </FormItem>
      </Form>
		);
	}
	componentDidMount(){
		this.props.fetchCategory("all")
		this.render()
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
      metadataDataCreate(dispatch, info);
    },
    fetchCategory: (type) => {
      metadataCategoryListCopy(dispatch,{},{},type);
    },
  }
}
const CreateForm = Form.create()(NormalLoginForm);
export default connect(mapStateToProps, mapDispatchToProps)(CreateForm)

import './index.less'
import React, { Component } from 'react'
import { Row, Col, Form, Modal, Button,Input, Icon, message, Select, InputNumber, Upload } from 'antd';
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
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
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
        for (var i = 0; i < values.keys.length; i++) {
          values.attrArr.push(
            {
              "attrName":values["attrName"+values.keys[i]],
              "attrType":values["attrType"+values.keys[i]],
              "attrClassify":values["attrClassify"+values.keys[i]],
              "attrMethod":values["attrMethod"+values.keys[i]],
              "attrCandidate":values["attrCandidate"+values.keys[i]],
              "attrTemplateId":values["attrTemplateId"+values.keys[i]],
              "attrTemplateAttr":values["attrTemplateAttr"+values.keys[i]],
            }
          )
        }
        let data={
          "templateId":values.templateId,
          "templateName":values.templateName,
          "templateDesc":values.templateDesc,
          "upload":values.upload,
          "productClassify":values.productClassify,
          "productId":values.productId,
          "attributeList":values.attrArr,
        }
				console.log('Received values of form: ', data);
        let datas={
          "dataParams":JSON.stringify(data)
        }
        console.log(datas);
        // this.props.form.resetFields()
        // this.props.submitCreate(datas);
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
    // 重置
  	handleReset = () => {
  		this.props.form.resetFields();
  	}
	render() {
    let{metaGategoryList}=this.props;
		if (metaGategoryList.data) {
			metaGategoryList=metaGategoryList.data;
		}
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
          <div className="attrCon">
            <Row>
              <Col span={3}>
                <FormItem
                  {...formItemLayoutWithOutLabel}
                  label={index === 0 ? '' : ''}
                  required={false}
                  key={k+'name'}
                >
                  {getFieldDecorator(`attrName${k}`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                      required: true,
                      whitespace: true,
                      message: "请输入属性名称",
                    }],
                  })(
                    <Input placeholder={"属性名称"+k} style={{ width: '80%', marginRight: 2 }} />
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
              <Col span={3}>
                <FormItem
                  {...formItemLayoutWithOutLabel}
                  label={index === 0 ? '' : ''}
                  required={false}
                  key={k+"type"}
                >
                  {getFieldDecorator(`attrType${k}`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                      required: true,
                      whitespace: true,
                      message: "请选择属性类型",
                    }],
                  })(
                    <Select placeholder="请选择属性类型" style={{ width: '80%', marginRight: 2 }}>
                    {keyList}
                    </Select>
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
              <Col span={3}>
                <FormItem
                  {...formItemLayoutWithOutLabel}
                  label={index === 0 ? '' : ''}
                  required={false}
                  key={k+"classify"}
                >
                  {getFieldDecorator(`attrClassify${k}`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                      required: true,
                      whitespace: true,
                      message: "请选择属性分类",
                    }],
                  })(
                    <Select placeholder="请选择属性分类" style={{ width: '80%', marginRight: 2 }}>
                    {keyList}
                    </Select>
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
              <Col span={3}>
                <FormItem
                  {...formItemLayoutWithOutLabel}
                  label={index === 0 ? '' : ''}
                  required={false}
                  key={k+"method"}
                >
                  {getFieldDecorator(`attrMethod${k}`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                      required: true,
                      whitespace: true,
                      message: "请选择录入方式",
                    }],
                  })(
                    <Select placeholder="请选择录入方式" style={{ width: '80%', marginRight: 2 }}>
                    {keyList}
                    </Select>
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
              <Col span={3}>
                <FormItem
                  {...formItemLayoutWithOutLabel}
                  label={index === 0 ? '' : ''}
                  required={false}
                  key={k+'candidate'}
                >
                  {getFieldDecorator(`attrCandidate${k}`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                      required: true,
                      whitespace: true,
                      message: "请输入属性候选值",
                    }],
                  })(
                    <Input placeholder={"属性候选值"+k} style={{ width: '80%', marginRight: 2 }} />
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
              <Col span={3}>
                <FormItem
                  {...formItemLayoutWithOutLabel}
                  label={index === 0 ? '' : ''}
                  required={false}
                  key={k+'templateId'}
                >
                  {getFieldDecorator(`attrTemplateId${k}`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                      required: true,
                      whitespace: true,
                      message: "请输入合约模板编号",
                    }],
                  })(
                    <Input placeholder={"合约模板编号"+k} style={{ width: '80%', marginRight: 2 }} />
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
              <Col span={3}>
                <FormItem
                  {...formItemLayoutWithOutLabel}
                  label={index === 0 ? '' : ''}
                  required={false}
                  key={k+"templateAttr"}
                >
                  {getFieldDecorator(`attrTemplateAttr${k}`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                      required: true,
                      whitespace: true,
                      message: "请选择合约模板属性",
                    }],
                  })(
                    <Select placeholder="请选择合约模板属性" style={{ width: '80%', marginRight: 2 }}>
                    {keyList}
                    </Select>
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
        <p className="fontP">基本属性：</p>
        <FormItem
          {...formItemLayout}
          label="合同模板分类"
          hasFeedback
        >
          <div className="input-wrap">
            {getFieldDecorator('templateId', {
                rules: [{ required: true, message: '请选择合同模板分类'}],
              })(
                <Select>
                {keyList}
                </Select>
            )}
          </div>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="合同模板名称"
          hasFeedback
        >
          <div className="input-wrap">
            {getFieldDecorator('templateName', {
                rules: [{ required: true, message: '请输入合同模名称'}],
              })(
              <Input name='name' key='name'/>
            )}
          </div>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="合同模板描述"
          hasFeedback
        >
          <div className="input-wrap">
            {getFieldDecorator('templateDesc', {
                rules: [{ required: true, message: '合同模板描述'}],
              })(
              <TextArea name='note' key='note'/>
            )}
          </div>
        </FormItem>
        <p className="fontP">模板文件：</p>
        <FormItem
            {...formItemLayout}
            label="模板文件"
            extra="模板文件必须是PDF格式"
          >
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            rules: [{ required: true, message: '上传合同模板'}],
            getValueFromEvent: this.normFile,
          })(
            <Upload name="logo" action="" listType="picture">
              <Button>
                <Icon type="upload" /> 上传模板文件
              </Button>
            </Upload>
          )}
        </FormItem>
        <p className="fontP">合约产品：</p>
        <FormItem
          {...formItemLayout}
          label="合约产品分类"
          hasFeedback
        >
          <div className="input-wrap">
            {getFieldDecorator('productClassify', {
                rules: [{ required: true, message: '请选择合约产品分类'}],
              })(
                <Select>
                {keyList}
                </Select>
            )}
          </div>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="合约产品"
          hasFeedback
        >
          <div className="input-wrap">
            {getFieldDecorator('productId', {
                rules: [{ required: true, message: '请选择合约产品'}],
              })(
                <Select>
                {keyList}
                </Select>
            )}
          </div>
        </FormItem>
        <hr/>
        <p className="fontP">扩展属性信息：</p>
          <Row className="attrTitle">
            <Col span={3}>
              <p>名称</p>
            </Col>
            <Col span={3}>
              <p>类型</p>
            </Col>
            <Col span={3}>
              <p>分类</p>
            </Col>
            <Col span={3}>
              <p>录入方式</p>
            </Col>
            <Col span={3}>
              <p>候选值</p>
            </Col>
            <Col span={3}>
              <p>合约模板编号</p>
            </Col>
            <Col span={3}>
              <p>合约模板属性</p>
            </Col>
          </Row>
          {formItems}
          <FormItem {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
              <Icon type="plus" />添加扩展属性
            </Button>
          </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" onClick={this.handleReset} style={{ marginRight: "20px" }}>清空</Button>
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

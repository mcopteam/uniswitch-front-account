webpackJsonp([9,21],{27:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(7),r=l(n),s=a(2),d=l(s),u=a(5),i=l(u),c=a(4),o=l(c),m=a(3),f=l(m);a(34);var p=a(1),g=l(p),h=function(e){function t(){return(0,d.default)(this,t),(0,o.default)(this,(t.__proto__||(0,r.default)(t)).apply(this,arguments))}return(0,f.default)(t,e),(0,i.default)(t,[{key:"render",value:function(){var e=this.props.title;return g.default.createElement("h2",{className:"page-title"},e)}}]),t}(p.Component);t.default=h},33:function(e,t,a){t=e.exports=a(11)(),t.push([e.id,".page-title{border-left:2px solid #fa7a27;padding:0 10px;line-height:22px}",""])},34:function(e,t,a){var l=a(33);"string"==typeof l&&(l=[[e.id,l,""]]);a(12)(l,{});l.locals&&(e.exports=l.locals)},46:function(e,t,a){e.exports={default:a(58),__esModule:!0}},58:function(e,t,a){var l=a(31),n=l.JSON||(l.JSON={stringify:JSON.stringify});e.exports=function(e){return n.stringify.apply(n,arguments)}},68:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.metadataCategoryCreate=t.metadataCategoryDelete=t.metadataCategoryEdit=t.metadataCategoryListCopy=t.metadataCategoryList=void 0;var n=a(19),r=l(n),s=a(15),d=a(16),u=a(17),i=a(9),c="METADATA_CATEGORY_LIST",o=(t.metadataCategoryList=function(e,t,a){var l=void 0;if(t&&a){var n=(0,d.param)({pageNum:a.current||1,pageSize:6,categoryId:t.categoryId,categoryName:t.categoryName});(0,r.default)((0,s.api)(u.url.getMetadataCategoryList,n)).then(function(t){console.log(t),0==t.code?(i.message.success(t.msg),l=t.result,e({metaGategoryList:l,type:c})):i.message.error(t.msg)})}else l=[],e({metaGategoryList:l,type:c})},t.metadataCategoryListCopy=function(e,t,a,l){var n=void 0;if(t&&a){if("all"==l)var i=(0,d.param)({pageNum:a.current||1,pageSize:100,categoryId:t.categoryId,categoryName:t.categoryName});else var i=(0,d.param)({pageNum:a.current||1,pageSize:6,categoryId:t.categoryId,categoryName:t.categoryName});(0,r.default)((0,s.api)(u.url.getMetadataCategoryList,i)).then(function(t){console.log(t),0==t.code&&(n=t.result,e({metaGategoryList:n,type:c}))})}else n=[],e({metaGategoryList:n,type:c})});t.metadataCategoryEdit=function(e,t,a,l){var n=(0,d.param)(t);(0,r.default)((0,s.api)(u.url.getMetadataCategoryEdit,n)).then(function(t){console.log(t),0==t.code?(i.message.success(t.msg),o(e,{},{})):i.message.error(t.msg)})},t.metadataCategoryDelete=function(e,t){var a=(0,d.param)({categoryId:t});(0,r.default)((0,s.api)(u.url.getMetadataCategoryDelete,a)).then(function(t){console.log(t),0==t.code?(i.message.success(t.msg),o(e)):i.message.error(t.msg)})},t.metadataCategoryCreate=function(e,t){var a=(0,d.param)(t);(0,r.default)((0,s.api)(u.url.getMetadataCategoryCreate,a)).then(function(t){console.log(t),0==t.code?(i.message.success(t.msg),o(e,{},{})):i.message.error(t.msg)})}},98:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.metadataDataCreate=t.metadataDataDelete=t.metadataDataEdit=t.metadataDataListCopy=t.metadataDataList=void 0;var n=a(19),r=l(n),s=a(15),d=a(16),u=a(17),i=a(9),c="METADATA_DATA_LIST",o=(t.metadataDataList=function(e,t,a){var l=void 0;if(t&&a){var n=(0,d.param)({pageNum:a.current||0,pageSize:6,categoryId:t.categoryId,dataId:t.dataId,dataName:t.dataName,dataStatus:t.dataStatus});(0,r.default)((0,s.api)(u.url.metadataDataList,n)).then(function(t){if(console.log(t),0==t.code){i.message.success(t.msg),l=t.result;for(var a=0;a<l.data.length;a++)switch(l.data[a].dataStatus){case 1:l.data[a].dataStatus="新建";break;case 5:l.data[a].dataStatus="上架";break;case 6:l.data[a].dataStatus="下架"}e({metaDataList:l,type:c})}else i.message.error(t.msg)})}else l=[],e({metaDataList:l,type:c})},t.metadataDataListCopy=function(e,t,a){var l=void 0;if(t&&a){var n=(0,d.param)({pageNum:a.current||0,pageSize:6,categoryId:t.categoryId,dataId:t.dataId,dataName:t.dataName,dataStatus:t.dataStatus});(0,r.default)((0,s.api)(u.url.metadataDataList,n)).then(function(t){if(console.log(t),0==t.code){l=t.result;for(var a=0;a<l.data.length;a++)switch(l.data[a].dataStatus){case 1:l.data[a].dataStatus="新建";break;case 5:l.data[a].dataStatus="上架";break;case 6:l.data[a].dataStatus="下架"}e({metaDataList:l,type:c})}})}else l=[],e({metaDataList:l,type:c})});t.metadataDataEdit=function(e,t,a,l){var n=(0,d.param)(t);(0,r.default)((0,s.api)(u.url.metadataDataUpdate,n)).then(function(t){console.log(t),0==t.code?(i.message.success(t.msg),o(e,{},{})):i.message.error(t.msg)})},t.metadataDataDelete=function(e,t){var a=(0,d.param)({category_id:t});(0,r.default)((0,s.api)(u.url.metadataDataDelete,a)).then(function(t){0==t.code?(i.message.success(t.msg),o(e)):i.message.error(t.msg)})},t.metadataDataCreate=function(e,t){var a=(0,d.param)(t);(0,r.default)((0,s.api)(u.url.metadataDataCreate,a)).then(function(e){console.log(e),0==e.code?i.message.success(e.msg):i.message.error(e.msg)})}},825:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.templateDataCreate=t.templateDataDelete=t.templateDataEdit=t.queryTemplateDataCopy=t.queryTemplateData=void 0;var n=a(19),r=l(n),s=a(15),d=a(16),u=a(17),i=a(9),c="QUERY_TEMPLATE_DATA",o=(t.queryTemplateData=function(e,t,a){e({templateDataList:{tatal:20,current:1,data:[{templateId:111,templateClassify:11,templateName:"aaa",templateStatus:1},{templateId:2222,templateClassify:22,templateName:"bbb",templateStatus:2},{templateId:333,templateClassify:33,templateName:"ccc",templateStatus:3},{templateId:44,templateClassify:444,templateName:"ddd",templateStatus:4}]},type:c})},t.queryTemplateDataCopy=function(e,t,a){e({templateDataList:{data:[{templateId:111,templateClassify:11,templateName:"aaa",templateStatus:1},{templateId:2222,templateClassify:22,templateName:"bbb",templateStatus:2},{templateId:333,templateClassify:33,templateName:"ccc",templateStatus:3},{templateId:44,templateClassify:444,templateName:"ddd",templateStatus:4}]},type:c})});t.templateDataEdit=function(e,t,a,l){var n=(0,d.param)(t);(0,r.default)((0,s.api)(u.url.editTemplateData,n)).then(function(t){console.log(t),0==t.code?(i.message.success(t.msg),o(e,{},{})):i.message.error(t.msg)})},t.templateDataDelete=function(e,t){var a=(0,d.param)({category_id:t});(0,r.default)((0,s.api)(u.url.deleteTemplateData,a)).then(function(t){0==t.code?(i.message.success(t.msg),o(e)):i.message.error(t.msg)})},t.templateDataCreate=function(e,t){var a=(0,d.param)(t);(0,r.default)((0,s.api)(u.url.addTemplateData,a)).then(function(e){console.log(e),0==e.code?i.message.success(e.msg):i.message.error(e.msg)})}},961:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(6),r=l(n),s=a(7),d=l(s),u=a(2),i=l(u),c=a(5),o=l(c),m=a(4),f=l(m),p=a(3),g=l(p);a(1928);var h=a(1),y=l(h),E=(a(20),a(27)),v=l(E),C=a(965),b=l(C),k=a(963),S=l(k),N=(a(9),function(e){function t(e){(0,i.default)(this,t);var a=(0,f.default)(this,(t.__proto__||(0,d.default)(t)).call(this));return a.state={searchParams:{}},a}return(0,g.default)(t,e),(0,o.default)(t,[{key:"handleSearch",value:function(e){console.log(e),this.setState({searchParams:e})}},{key:"render",value:function(){this.props.buttonList;return y.default.createElement("div",{className:"page"},y.default.createElement(v.default,{title:"合同模板维护"}),y.default.createElement(b.default,{onSearch:this.handleSearch.bind(this)}),y.default.createElement(S.default,(0,r.default)({},this.props,{searchParams:this.state.searchParams})))}}]),t}(h.Component));t.default=N},962:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(46),r=l(n),s=a(6),d=l(s),u=a(7),i=l(u),c=a(2),o=l(c),m=a(5),f=l(m),p=a(4),g=l(p),h=a(3),y=l(h);a(1929);var E=a(1),v=l(E),C=a(20),b=a(9),k=(a(26),a(98)),S=a(68),N=b.Form.Item,I=b.Select.Option,D=b.Input.TextArea,_=0,w=function(e){function t(e){(0,o.default)(this,t);var a=(0,g.default)(this,(t.__proto__||(0,i.default)(t)).call(this,e));return a.handleSubmit=function(e){e.preventDefault(),a.props.form.validateFields(function(e,t){if(!e){console.log(t),t=(0,d.default)({},t,{attrArr:[]});for(var l=1;l<t.keys.length+1;l++)t.attrArr.push({attrId:t["attrId"+l]||"",attrVar:t["attrVar"+l],attrName:t["attrName"+l],attrValue:t["attrValue"+l]});var n={dataId:a.props.preInfo.dataId+"",categoryId:t.categoryId+"",dataName:t.dataName,dataLable:t.dataLable,dataAbstract:t.dataAbstract,dataDesc:t.dataDesc,dataPrice:t.dataPrice+"",dataFormat:t.dataFormat,dataCharSet:t.dataCharSet,dataFrequency:t.dataFrequency,dataFrequencyUnit:t.dataFrequencyUnit,dataSave:t.dataSave,dataSaveUnit:t.dataSaveUnit,dataType:t.dataType,dataSize:t.dataSize,dataSizeUnit:t.dataSizeUnit,dataAddress:t.dataAddress,attributeList:t.attrArr};console.log("Received values of form: ",n);var s={dataParams:(0,r.default)(n)};console.log(s),a.props.form.resetFields(),a.props.submitCreate(s),a.props.onOk()}})},a.remove=function(e){var t=a.props.form,l=t.getFieldValue("keys");1!==l.length&&t.setFieldsValue({keys:l.filter(function(t){return t!==e})})},a.add=function(){_++;var e=a.props.form,t=e.getFieldValue("keys"),l=t.concat(_);e.setFieldsValue({keys:l})},a.checkPrice=function(e,t,a){return t.number>0?void a():void a("Price must greater than zero!")},a.state={},a}return(0,y.default)(t,e),(0,f.default)(t,[{key:"componentDidMount",value:function(){this.props.fetchCategory("all"),this.render()}},{key:"render",value:function(){var e=this,t=this.props,a=t.preInfo,l=t.metaGategoryList;console.log(l),l=l.data||[],console.log(a);var n=this.props.form,r=n.getFieldDecorator,s=n.getFieldValue,u={labelCol:{xs:{span:24},sm:{span:6}},wrapperCol:{xs:{span:24},sm:{span:14}}},i={wrapperCol:{xs:{span:24,offset:0},sm:{span:14,offset:6}}},c={labelCol:{span:9},wrapperCol:{span:15}},o={labelCol:{span:0},wrapperCol:{span:12}},m={wrapperCol:{xs:{span:24,offset:0},sm:{span:14,offset:6}}},f=a.attributeList;r("keys",{initialValue:f});var p=s("keys");console.log(f);var g=p.map(function(t,a){return v.default.createElement("div",{className:"attrForm"},v.default.createElement(b.Row,null,v.default.createElement(b.Col,{span:6},v.default.createElement(N,(0,d.default)({},m,{label:"",required:!1,key:t+"Id"}),r("attrId"+(a+1),{validateTrigger:["onChange","onBlur"],initialValue:t.attrId})(v.default.createElement(b.Input,{readOnly:!0,placeholder:"ID不可修改！",style:{width:"75%",marginRight:3}})),p.length>1?v.default.createElement(b.Icon,{className:"dynamic-delete-button",type:"minus-circle-o",disabled:1===p.length,onClick:function(){return e.remove(t)}}):null)),v.default.createElement(b.Col,{span:6},v.default.createElement(N,(0,d.default)({},m,{label:"",required:!1,key:t+"var"}),r("attrVar"+(a+1),{validateTrigger:["onChange","onBlur"],rules:[{required:!0,whitespace:!0,message:"请输入属性标识"}],initialValue:t.attrVar})(v.default.createElement(b.Input,{placeholder:"属性标识"+(a+1),style:{width:"75%",marginRight:3}})),p.length>1?v.default.createElement(b.Icon,{className:"dynamic-delete-button",type:"minus-circle-o",disabled:1===p.length,onClick:function(){return e.remove(t)}}):null)),v.default.createElement(b.Col,{span:6},v.default.createElement(N,(0,d.default)({},m,{label:"",required:!1,key:t+"name"}),r("attrName"+(a+1),{validateTrigger:["onChange","onBlur"],rules:[{required:!0,whitespace:!0,message:"请输入属性名称"}],initialValue:t.attrName})(v.default.createElement(b.Input,{placeholder:"属性名称"+(a+1),style:{width:"75%",marginRight:3}})),p.length>1?v.default.createElement(b.Icon,{className:"dynamic-delete-button",type:"minus-circle-o",disabled:1===p.length,onClick:function(){return e.remove(t)}}):null)),v.default.createElement(b.Col,{span:6},v.default.createElement(N,(0,d.default)({},m,{label:"",required:!1,key:t+"value"}),r("attrValue"+(a+1),{validateTrigger:["onChange","onBlur"],rules:[{required:!0,whitespace:!0,message:"请输入属性值"}],initialValue:t.attrValue})(v.default.createElement(b.Input,{placeholder:"属性值"+(a+1),style:{width:"75%",marginRight:3}})),p.length>1?v.default.createElement(b.Icon,{className:"dynamic-delete-button",type:"minus-circle-o",disabled:1===p.length,onClick:function(){return e.remove(t)}}):null))))}),h=[];return l.forEach(function(e,t){h.push(v.default.createElement(I,{key:t,value:e.categoryId+""},e.categoryName))}),v.default.createElement(b.Form,{onSubmit:this.handleSubmit},v.default.createElement("p",{className:"fontP"},"数据基本属性："),v.default.createElement(N,(0,d.default)({},u,{label:"数据分类",hasFeedback:!0}),v.default.createElement("div",{className:"input-wrap"},r("categoryId",{rules:[{required:!0,message:"请选择数据分类"}],initialValue:a.categoryId})(v.default.createElement(b.Select,null,h)))),v.default.createElement(N,(0,d.default)({},u,{label:"数据名称",hasFeedback:!0}),v.default.createElement("div",{className:"input-wrap"},r("dataName",{rules:[{required:!0,message:"请输入数据名称"}],initialValue:a.dataName})(v.default.createElement(b.Input,{name:"name",key:"name"})))),v.default.createElement(N,(0,d.default)({},u,{label:"数据标签",hasFeedback:!0}),v.default.createElement("div",{className:"input-wrap"},r("dataLable",{rules:[{required:!0,message:"请输入数据标签"}],initialValue:a.dataLable})(v.default.createElement(b.Input,{name:"name",key:"name"})))),v.default.createElement(N,(0,d.default)({},u,{label:"数据摘要",hasFeedback:!0}),v.default.createElement("div",{className:"input-wrap"},r("dataAbstract",{rules:[{required:!0,message:"请输入数据摘要"}],initialValue:a.dataAbstract})(v.default.createElement(D,{name:"note",key:"note"})))),v.default.createElement(N,(0,d.default)({},u,{label:"数据描述",hasFeedback:!0}),v.default.createElement("div",{className:"input-wrap"},r("dataDesc",{rules:[{required:!0,message:"请输入数据描述"}],initialValue:a.dataDesc})(v.default.createElement(D,{name:"note",key:"note"})))),v.default.createElement(N,(0,d.default)({},u,{label:"数据价格(分)",hasFeedback:!0}),v.default.createElement("div",{className:"input-wrap"},r("dataPrice",{rules:[{required:!0,message:"请输入数据价格"}],initialValue:a.dataPrice})(v.default.createElement(b.Input,{name:"name",key:"name"})))),v.default.createElement(N,(0,d.default)({},u,{label:"数据格式",hasFeedback:!0}),v.default.createElement("div",{className:"input-wrap"},r("dataFormat",{rules:[{required:!0,message:"请输入数据数据格式"}],initialValue:a.dataFormat})(v.default.createElement(b.Select,null,v.default.createElement(I,{value:"basic"},"audio/basic"),v.default.createElement(I,{value:"jpeg"},"image/jpeg"),v.default.createElement(I,{value:"png"},"image/png"),v.default.createElement(I,{value:"mpeg"},"video/mpeg"),v.default.createElement(I,{value:"xml"},"text/xml"),v.default.createElement(I,{value:"plain"},"text/plain"),v.default.createElement(I,{value:"json"},"application/json"))))),v.default.createElement(N,(0,d.default)({},u,{label:"数据编码",hasFeedback:!0}),v.default.createElement("div",{className:"input-wrap"},r("dataCharSet",{rules:[{required:!0,message:"请选择数据编码"}],initialValue:a.dataCharSet})(v.default.createElement(b.Select,null,v.default.createElement(I,{value:"utf8"},"utf8"),v.default.createElement(I,{value:"gb2312"},"gb2312"),v.default.createElement(I,{value:"latin1"},"latin1"))))),v.default.createElement(b.Row,{gutter:20},v.default.createElement(b.Col,{span:16},v.default.createElement(N,(0,d.default)({},c,{label:"数据更新频率",hasFeedback:!0}),v.default.createElement("div",{className:"input-wrap"},r("dataFrequency",{rules:[{required:!0,message:"请选择数据更新频率"}],initialValue:a.dataFrequency})(v.default.createElement(b.InputNumber,{min:1,style:{width:"100%"}}))))),v.default.createElement(b.Col,{span:8},v.default.createElement(N,(0,d.default)({},o,{label:"",hasFeedback:!0}),v.default.createElement("div",{className:"input-wrap"},r("dataFrequencyUnit",{rules:[{required:!0,message:"请选择单位"}],initialValue:a.dataFrequencyUnit})(v.default.createElement(b.Select,null,v.default.createElement(I,{value:"year"},"年"),v.default.createElement(I,{value:"month"},"月"),v.default.createElement(I,{value:"day"},"日"),v.default.createElement(I,{value:"hour"},"时"),v.default.createElement(I,{value:"minute"},"分"),v.default.createElement(I,{value:"second"},"秒"))))))),v.default.createElement(b.Row,{gutter:20},v.default.createElement(b.Col,{span:16},v.default.createElement(N,(0,d.default)({},c,{label:"数据留存时间",hasFeedback:!0}),v.default.createElement("div",{className:"input-wrap"},r("dataSave",{rules:[{required:!0,message:"请选择数据留存时间"}],initialValue:a.dataSave})(v.default.createElement(b.InputNumber,{min:1,style:{width:"100%"}}))))),v.default.createElement(b.Col,{span:8},v.default.createElement(N,(0,d.default)({},o,{label:"",hasFeedback:!0}),v.default.createElement("div",{className:"input-wrap"},r("dataSaveUnit",{rules:[{required:!0,message:"请选择单位"}],initialValue:a.dataSaveUnit})(v.default.createElement(b.Select,null,v.default.createElement(I,{value:"year"},"年"),v.default.createElement(I,{value:"month"},"月"),v.default.createElement(I,{value:"day"},"日"),v.default.createElement(I,{value:"hour"},"时"),v.default.createElement(I,{value:"minute"},"分"),v.default.createElement(I,{value:"second"},"秒"))))))),v.default.createElement(N,(0,d.default)({},u,{label:"数据类型",hasFeedback:!0}),v.default.createElement("div",{className:"input-wrap"},r("dataType",{rules:[{required:!0,message:"请选择数据类型"}],initialValue:a.dataType})(v.default.createElement(b.Select,null,v.default.createElement(I,{value:"text"},"文本"),v.default.createElement(I,{value:"image"},"图片"),v.default.createElement(I,{value:"video"},"视频"))))),v.default.createElement(b.Row,{gutter:20},v.default.createElement(b.Col,{span:16},v.default.createElement(N,(0,d.default)({},c,{label:"数据大小",hasFeedback:!0}),v.default.createElement("div",{className:"input-wrap"},r("dataSize",{rules:[{required:!0,message:"请输入数据大小"}],initialValue:a.dataSize})(v.default.createElement(b.InputNumber,{min:1,style:{width:"100%"}}))))),v.default.createElement(b.Col,{span:8},v.default.createElement(N,(0,d.default)({},o,{label:"",hasFeedback:!0}),v.default.createElement("div",{className:"input-wrap"},r("dataSizeUnit",{rules:[{required:!0,message:"请选择单位"}],initialValue:a.dataSizeUnit})(v.default.createElement(b.Select,null,v.default.createElement(I,{value:"B"},"B"),v.default.createElement(I,{value:"KB"},"KB"),v.default.createElement(I,{value:"MB"},"MB"),v.default.createElement(I,{value:"GB"},"GB"),v.default.createElement(I,{value:"TB"},"TB"),v.default.createElement(I,{value:"PB"},"PB"))))))),v.default.createElement(N,(0,d.default)({},u,{label:"数据路径",hasFeedback:!0}),v.default.createElement("div",{className:"input-wrap"},r("dataAddress",{rules:[{required:!0,message:"请输入数据路径"}],initialValue:a.dataAddress})(v.default.createElement(b.Input,{name:"name",key:"name"})))),v.default.createElement("hr",null),v.default.createElement("p",{className:"fontP"},"扩展属性信息："),v.default.createElement(b.Row,{style:{marginBottom:"15px",marginTop:"15px"}},v.default.createElement(b.Col,{span:6},v.default.createElement("p",{style:{textAlign:"center"}},"属性ID")),v.default.createElement(b.Col,{span:6},v.default.createElement("p",{style:{textAlign:"center"}},"属性标识")),v.default.createElement(b.Col,{span:6},v.default.createElement("p",{style:{textAlign:"center"}},"属性名称")),v.default.createElement(b.Col,{span:6},v.default.createElement("p",{style:{textAlign:"center"}},"属性值"))),g,v.default.createElement(N,m,v.default.createElement(b.Button,{type:"dashed",onClick:this.add,style:{width:"60%"}},v.default.createElement(b.Icon,{type:"plus"}),"添加扩展属性")),v.default.createElement(N,i,v.default.createElement(b.Button,{type:"primary",htmlType:"submit",style:{marginLeft:"33%"}},"更新")))}}]),t}(v.default.Component),x=function(e){return(0,d.default)({},e.metaGategoryList)},V=function(e){return{submitCreate:function(t){(0,k.metadataDataEdit)(e,t)},fetchCategory:function(t){(0,S.metadataCategoryListCopy)(e,{},{},t)}}},F=b.Form.create()(w);t.default=(0,C.connect)(x,V)(F)},963:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(6),r=l(n),s=a(7),d=l(s),u=a(2),i=l(u),c=a(5),o=l(c),m=a(4),f=l(m),p=a(3),g=l(p);a(1930);var h=a(1),y=l(h),E=a(20),v=a(9),C=a(19),b=l(C),k=a(15),S=a(17),N=a(16),I=a(962),D=l(I),_=a(964),w=l(_),x=a(825),V=v.Modal.confirm,F=(v.Table.Columns,function(e){function t(e){(0,i.default)(this,t);var a=(0,f.default)(this,(t.__proto__||(0,d.default)(t)).call(this,e));return a.handleEditOk=function(e){a.setState({editVisible:!1})},a.handleEditCancel=function(e){a.setState({editVisible:!1})},a.handleDetailOk=function(e){a.setState({detailVisible:!1})},a.handleDetailCancel=function(e){a.setState({detailVisible:!1})},a.handleTableChange=function(e,t,l){console.log(a.state.searchParams);var n=(0,r.default)({},a.state.pagination);n.current=e.current,a.setState({pagination:n},function(){console.log(a.state),a.props.fetchDataCopy(a.state.searchParams,a.state.pagination)})},a.state={editWidth:600,searchParams:{},editVisible:!1,detailVisible:!1,preInfo:{},id:"",total:20,loading:!1,pagination:{current:1,total:0,pageSize:6}},a}return(0,g.default)(t,e),(0,o.default)(t,[{key:"handlePublish",value:function(e,t){var a=this;V({title:"您确定要发布此模板?",content:"发布此模板",okText:"确定",okType:"danger",cancelText:"取消",onOk:function(){console.log(t);var e=(0,N.param)({dataId:t.dataId});(0,b.default)((0,k.api)(S.url.publishTemplateData,e)).then(function(e){console.log(e),0==e.code?(v.message.success(e.msg),a.props.fetchDataCopy(a.state.searchParams,a.state.pagination)):v.message.error(e.msg)})},onCancel:function(){console.log("Cancel")}})}},{key:"handleOffline",value:function(e,t){var a=this;V({title:"您确定要下线此模板?",content:"下线此模板",okText:"确定",okType:"danger",cancelText:"取消",onOk:function(){console.log(t);var e=(0,N.param)({dataId:t.dataId});(0,b.default)((0,k.api)(S.url.offTemplateData,e)).then(function(e){console.log(e),0==e.code?(v.message.success(e.msg),a.props.fetchDataCopy(a.state.searchParams,a.state.pagination)):v.message.error(e.msg)})},onCancel:function(){console.log("Cancel")}})}},{key:"handelDelete",value:function(e,t){var a=this;V({title:"您确定要删除此商品?",content:"删除此商品",okText:"确定",okType:"danger",cancelText:"取消",onOk:function(){console.log(t);var e=(0,N.param)({dataId:t.dataId});(0,b.default)((0,k.api)(S.url.deleteTemplateData,e)).then(function(e){console.log(e),0==e.code?(v.message.success(e.msg),a.props.fetchDataCopy(a.state.searchParams,a.state.pagination)):v.message.error(e.msg)})},onCancel:function(){console.log("Cancel")}})}},{key:"getDataEdit",value:function(e){var t=this,a=(0,N.param)({dataId:e});(0,b.default)((0,k.api)(S.url.getBaseDataDetail,a)).then(function(e){console.log(e),0==e.code&&t.setState({editVisible:!0,preInfo:e.result})})}},{key:"handelUpdate",value:function(e,t){console.log(t),this.getDataEdit(t.dataId)}},{key:"getDatadetail",value:function(e){var t=this,a=(0,N.param)({dataId:e});(0,b.default)((0,k.api)(S.url.getBaseDataDetail,a)).then(function(e){console.log(e),0==e.code&&t.setState({detailVisible:!0,preInfo:e.result})})}},{key:"handleDetail",value:function(e,t){this.getDatadetail(t.dataId)}},{key:"componentDidMount",value:function(){this.props.fetchDataCopy(),this.render()}},{key:"componentWillReceiveProps",value:function(e){console.log(e.searchParams),this.setState({searchParams:e.searchParams})}},{key:"render",value:function(){var e=this,t=this.props,a=t.templateDataList,l=(t.buttonList,[{title:"模板分类",dataIndex:"templateClassify",key:"templateClassify",width:"10%"},{title:"模板编码",dataIndex:"templateId",key:"templateId",width:"10%"},{title:"模板名称",dataIndex:"templateName",key:"templateName",width:"10%"},{title:"模板状态",dataIndex:"templateStatus",key:"templateStatus",width:"10%"},{title:"操作",dataIndex:"handle",width:"20%",render:function(t,a,l){return y.default.createElement("span",null,y.default.createElement("a",{onClick:e.handleDetail.bind(e,t,a)},"详细"),y.default.createElement("span",{className:"ant-divider"}),y.default.createElement("a",{onClick:e.handelUpdate.bind(e,t,a)},"编辑"),y.default.createElement("span",{className:"ant-divider"}),y.default.createElement("a",{onClick:e.handelDelete.bind(e,t,a)},"删除"),y.default.createElement("span",{className:"ant-divider"}),y.default.createElement("a",{onClick:e.handlePublish.bind(e,t,a)},"发布"),y.default.createElement("span",{className:"ant-divider"}),y.default.createElement("a",{onClick:e.handleOffline.bind(e,t,a)},"下线"))}}]);return y.default.createElement("div",null,y.default.createElement(v.Table,{columns:l,rowKey:function(e){return e.registered},dataSource:a.data,pagination:(0,r.default)({},this.state.pagination,{total:a.total,current:a.pageNum}),loading:this.state.loading,onChange:this.handleTableChange.bind(this)}),y.default.createElement(v.Modal,{footer:null,title:"查看详细",visible:this.state.detailVisible,onOk:this.handleDetailOk,onCancel:this.handleDetailCancel,okText:"确定",cancelText:"取消",ref:"detailModal"},y.default.createElement(w.default,{preInfo:this.state.preInfo})),y.default.createElement(v.Modal,{footer:null,title:"编辑",width:this.state.editWidth,visible:this.state.editVisible,onOk:this.handleEditOk,onCancel:this.handleEditCancel,okText:"确定",cancelText:"取消",ref:"editModal"},y.default.createElement(D.default,{onOk:this.handleEditOk,preInfo:this.state.preInfo,search:this.state.searchParams,pag:this.state.pagination})))}}]),t}(h.Component)),T=function(e){return(0,r.default)({},e.templateData)},q=function(e){return{fetchData:function(t,a){queryTemplateDatay(e,t,a)},fetchDataCopy:function(t,a){(0,x.queryTemplateDataCopy)(e,t,a)}}};t.default=(0,E.connect)(T,q)(F)},964:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(7),r=l(n),s=a(2),d=l(s),u=a(5),i=l(u),c=a(4),o=l(c),m=a(3),f=l(m);a(1931);var p=a(1),g=l(p),h=a(19),y=(l(h),a(9)),E=(a(15),a(16),a(17),function(e){function t(){var e,a,l,n;(0,d.default)(this,t);for(var s=arguments.length,u=Array(s),i=0;i<s;i++)u[i]=arguments[i];return a=l=(0,o.default)(this,(e=t.__proto__||(0,r.default)(t)).call.apply(e,[this].concat(u))),l.state={pagination:!1,loading:!1,data:{}},n=a,(0,o.default)(l,n)}return(0,f.default)(t,e),(0,i.default)(t,[{key:"render",value:function(){var e=this.props.preInfo;console.log(e);switch(e.dataStatus){case 1:e.dataStatus="新建";break;case 5:e.dataStatus="上架";break;case 6:e.dataStatus="下架"}switch(e.dataFrequencyUnit){case"year":e.dataFrequencyUnit="年";break;case"month":e.dataFrequencyUnit="月";break;case"day":e.dataFrequencyUnit="日";break;case"hour":e.dataFrequencyUnit="小时";break;case"minute":e.dataFrequencyUnit="分";break;case"second":e.dataFrequencyUnit="秒"}switch(e.dataSaveUnit){case"year":e.dataSaveUnit="年";break;case"month":e.dataSaveUnit="月";break;case"day":e.dataSaveUnit="日";break;case"hour":e.dataSaveUnit="小时";break;case"minute":e.dataSaveUnit="分";break;case"second":e.dataSaveUnit="秒"}var t=[{title:"序号",dataIndex:"attrId",key:"attrId",width:"10%"},{title:"属性标识",dataIndex:"attrVar",key:"attrVar",width:"10%"},{title:"属性名称",dataIndex:"attrName",key:"attrName",width:"10%"},{title:"属性值",dataIndex:"attrValue",key:"attrValue",width:"10%"}];return g.default.createElement("div",{className:"flowCon"},g.default.createElement(y.Row,null,g.default.createElement(y.Col,{span:22,offset:1},g.default.createElement("span",{className:"infokeyWidth left"},"基本属性信息")),g.default.createElement(y.Col,{span:22,offset:1},g.default.createElement("span",{className:"infokeyWidth"},"数据编码："),g.default.createElement("span",{className:"infoValue"},e.dataCharSet)),g.default.createElement(y.Col,{span:22,offset:1},g.default.createElement("span",{className:"infokeyWidth"},"数据分类："),g.default.createElement("span",{className:"infoValue"},e.categoryName)),g.default.createElement(y.Col,{span:22,offset:1},g.default.createElement("span",{className:"infokeyWidth"},"数据名称："),g.default.createElement("span",{className:"infoValue"},e.dataName)),g.default.createElement(y.Col,{span:22,offset:1},g.default.createElement("span",{className:"infokeyWidth"},"数据供应方："),g.default.createElement("span",{className:"infoValue"},e.username)),g.default.createElement(y.Col,{span:22,offset:1},g.default.createElement("span",{className:"infokeyWidth"},"数据摘要："),g.default.createElement("span",{className:"infoValue"},e.dataAbstract)),g.default.createElement(y.Col,{span:22,offset:1},g.default.createElement("span",{className:"infokeyWidth"},"数据描述："),g.default.createElement("span",{className:"infoValue"},e.dataDesc)),g.default.createElement(y.Col,{span:22,offset:1},g.default.createElement("span",{className:"infokeyWidth"},"数据价格："),g.default.createElement("span",{className:"infoValue"},e.dataPrice)),g.default.createElement(y.Col,{span:22,offset:1},g.default.createElement("span",{className:"infokeyWidth"},"数据状态："),g.default.createElement("span",{className:"infoValue"},e.dataStatus)),g.default.createElement(y.Col,{span:22,offset:1},g.default.createElement("span",{className:"infokeyWidth"},"数据格式："),g.default.createElement("span",{className:"infoValue"},e.dataFormat)),g.default.createElement(y.Col,{span:22,offset:1},g.default.createElement("span",{className:"infokeyWidth"},"数据更新频率："),g.default.createElement("span",{className:"infoValue"},e.dataFrequency+e.dataFrequencyUnit)),g.default.createElement(y.Col,{span:22,offset:1},g.default.createElement("span",{className:"infokeyWidth"},"数据留存时间："),g.default.createElement("span",{className:"infoValue"},e.dataSave+e.dataSaveUnit)),g.default.createElement(y.Col,{span:22,offset:1},g.default.createElement("span",{className:"infokeyWidth"},"数据类型："),g.default.createElement("span",{className:"infoValue"},e.dataType)),g.default.createElement(y.Col,{span:22,offset:1},g.default.createElement("span",{className:"infokeyWidth"},"数据大小："),g.default.createElement("span",{className:"infoValue"},e.dataSize+e.dataSizeUnit)),g.default.createElement(y.Col,{span:22,offset:1},g.default.createElement("span",{className:"infokeyWidth"},"数据路径："),g.default.createElement("span",{className:"infoValue"},e.dataAddress)),g.default.createElement(y.Col,{span:22,offset:1},g.default.createElement("span",{className:"infokeyWidth left"},"扩展属性信息")),g.default.createElement(y.Col,{span:22,offset:1},g.default.createElement(y.Table,{columns:t,rowKey:function(e){return e.attrId},dataSource:e.attributeList,pagination:!1}))))}}]),t}(g.default.Component));t.default=E},965:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(6),r=l(n),s=a(18),d=l(s),u=a(7),i=l(u),c=a(2),o=l(c),m=a(5),f=l(m),p=a(4),g=l(p),h=a(3),y=l(h);a(1932);var E=a(1),v=l(E),C=a(20),b=a(9),k=a(98),S=a(68),N=b.Select.Option,I=[{name:"",key:"templateClassify",label:"合同模板分类",id:"templateClassify",type:"templateClassify"},{name:"",key:"templateStatus",label:"合同模板状态",id:"templateStatus",type:"templateStatus"},{name:"",key:"templateName",label:"合同模板名称",id:"templateName",type:"templateName"},{name:"",key:"templateId",label:"合同模板编号",id:"templateId",type:"templateId"}],D=[{id:"1",name:"新建"},{id:"5",name:"上架"},{id:"6",name:"下架"}],_=function(e){function t(e){(0,o.default)(this,t);var a=(0,g.default)(this,(t.__proto__||(0,i.default)(t)).call(this));return a.handleReset=function(){a.props.form.resetFields(),a.setState({templateClassify:"",templateId:"",templateName:"",templateStatus:""}),a.props.fetchData()},a.state={templateClassify:"",templateId:"",templateName:"",templateStatus:""},a}return(0,y.default)(t,e),(0,f.default)(t,[{key:"render",value:function(){var e=this,t=this.props.metaGategoryList;t.data&&(t=t.data),console.log(t);var a=this.props.form.getFieldDecorator,l=[];return t.forEach(function(e,t){l.push(v.default.createElement(N,{key:t,value:e.categoryId+""},e.categoryName))}),v.default.createElement(b.Form,{horizontal:!0,style:{marginTop:"15px",marginBottom:"30px"},className:"bill-search-form",onSubmit:this.handleSearch.bind(this)},v.default.createElement(b.Row,{gutter:10},I.map(function(t,n){return v.default.createElement(b.Col,{span:12,key:t.key},v.default.createElement(b.Form.Item,{
label:t.label,labelCol:{span:5},wrapperCol:{span:16}},a(t.id)("templateClassify"===t.type?v.default.createElement(b.Select,{onChange:e.handleChange.bind(e,t)},l):"templateStatus"===t.type?v.default.createElement(b.Select,{onChange:e.handleChange.bind(e,t)},D.map(function(e,t){return v.default.createElement(N,{key:e.id,value:e.id},e.name)})):v.default.createElement(b.Input,{onChange:e.handleChange.bind(e,t),placeholder:""}))))})),v.default.createElement(b.Row,null,v.default.createElement(b.Col,{span:24,key:"submit",style:{textAlign:"right"}},v.default.createElement(b.Button,{type:"primary",onClick:this.handleReset,style:{marginRight:"20px"}},"清空"),v.default.createElement(b.Button,{type:"primary",htmlType:"submit"},"查询"))))}},{key:"handleChange",value:function(e,t){switch(e.type){case"templateClassify":this.setState((0,d.default)({},e.key,t));break;case"templateStatus":this.setState((0,d.default)({},e.key,t));break;default:this.setState((0,d.default)({},e.key,t.target.value))}}},{key:"handleSearch",value:function(e){e.preventDefault(),this.props.onSearch(this.state),this.props.fetchData(this.state,{current:1})}},{key:"componentDidMount",value:function(){this.props.fetchCategory("all")}}]),t}(E.Component),w=function(e){return(0,r.default)({},e.metaGategoryList)},x=function(e){return{fetchData:function(t,a){(0,k.metadataDataListCopy)(e,t,a)},fetchCategory:function(t){(0,S.metadataCategoryListCopy)(e,{},{},t)}}},V=b.Form.create()(_);t.default=(0,C.connect)(w,x)(V)},1358:function(e,t,a){t=e.exports=a(11)(),t.push([e.id,"",""])},1359:function(e,t,a){t=e.exports=a(11)(),t.push([e.id,".attrForm input.ant-input-lg{padding-left:0}.attrForm .ant-col-sm-14{width:80%}",""])},1360:function(e,t,a){t=e.exports=a(11)(),t.push([e.id,"",""])},1361:function(e,t,a){t=e.exports=a(11)(),t.push([e.id,".infokeyWidth{line-height:30px;width:150px;text-Align:right;padding-right:10px;display:inline-block;font-weight:700}.left{text-align:left}.infoValue{padding-left:10px;display:inline-block}.infolist{padding-left:20px;line-height:30px}.infolist p span:first-child{width:350px;display:inline-block;padding-left:60px}.flowCon{height:500px;overflow-y:auto}",""])},1362:function(e,t,a){t=e.exports=a(11)(),t.push([e.id,"",""])},1928:function(e,t,a){var l=a(1358);"string"==typeof l&&(l=[[e.id,l,""]]);a(12)(l,{});l.locals&&(e.exports=l.locals)},1929:function(e,t,a){var l=a(1359);"string"==typeof l&&(l=[[e.id,l,""]]);a(12)(l,{});l.locals&&(e.exports=l.locals)},1930:function(e,t,a){var l=a(1360);"string"==typeof l&&(l=[[e.id,l,""]]);a(12)(l,{});l.locals&&(e.exports=l.locals)},1931:function(e,t,a){var l=a(1361);"string"==typeof l&&(l=[[e.id,l,""]]);a(12)(l,{});l.locals&&(e.exports=l.locals)},1932:function(e,t,a){var l=a(1362);"string"==typeof l&&(l=[[e.id,l,""]]);a(12)(l,{});l.locals&&(e.exports=l.locals)}});
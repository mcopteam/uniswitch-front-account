webpackJsonp([18,21],{27:function(e,a,t){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(a,"__esModule",{value:!0});var r=t(7),n=l(r),u=t(2),d=l(u),s=t(5),c=l(s),o=t(4),i=l(o),m=t(3),f=l(m);t(34);var p=t(1),g=l(p),y=function(e){function a(){return(0,d.default)(this,a),(0,i.default)(this,(a.__proto__||(0,n.default)(a)).apply(this,arguments))}return(0,f.default)(a,e),(0,c.default)(a,[{key:"render",value:function(){var e=this.props.title;return g.default.createElement("h2",{className:"page-title"},e)}}]),a}(p.Component);a.default=y},33:function(e,a,t){a=e.exports=t(11)(),a.push([e.id,".page-title{border-left:2px solid #fa7a27;padding:0 10px;line-height:22px}",""])},34:function(e,a,t){var l=t(33);"string"==typeof l&&(l=[[e.id,l,""]]);t(12)(l,{});l.locals&&(e.exports=l.locals)},46:function(e,a,t){e.exports={default:t(58),__esModule:!0}},58:function(e,a,t){var l=t(31),r=l.JSON||(l.JSON={stringify:JSON.stringify});e.exports=function(e){return r.stringify.apply(r,arguments)}},68:function(e,a,t){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(a,"__esModule",{value:!0}),a.metadataCategoryCreate=a.metadataCategoryDelete=a.metadataCategoryEdit=a.metadataCategoryListCopy=a.metadataCategoryList=void 0;var r=t(19),n=l(r),u=t(15),d=t(16),s=t(17),c=t(9),o="METADATA_CATEGORY_LIST",i=(a.metadataCategoryList=function(e,a,t){var l=void 0;if(a&&t){var r=(0,d.param)({pageNum:t.current||1,pageSize:6,categoryId:a.categoryId,categoryName:a.categoryName});(0,n.default)((0,u.api)(s.url.getMetadataCategoryList,r)).then(function(a){console.log(a),0==a.code?(c.message.success(a.msg),l=a.result,e({metaGategoryList:l,type:o})):c.message.error(a.msg)})}else l=[],e({metaGategoryList:l,type:o})},a.metadataCategoryListCopy=function(e,a,t,l){var r=void 0;if(a&&t){if("all"==l)var c=(0,d.param)({pageNum:t.current||1,pageSize:100,categoryId:a.categoryId,categoryName:a.categoryName});else var c=(0,d.param)({pageNum:t.current||1,pageSize:6,categoryId:a.categoryId,categoryName:a.categoryName});(0,n.default)((0,u.api)(s.url.getMetadataCategoryList,c)).then(function(a){console.log(a),0==a.code&&(r=a.result,e({metaGategoryList:r,type:o}))})}else r=[],e({metaGategoryList:r,type:o})});a.metadataCategoryEdit=function(e,a,t,l){var r=(0,d.param)(a);(0,n.default)((0,u.api)(s.url.getMetadataCategoryEdit,r)).then(function(a){console.log(a),0==a.code?(c.message.success(a.msg),i(e,{},{})):c.message.error(a.msg)})},a.metadataCategoryDelete=function(e,a){var t=(0,d.param)({categoryId:a});(0,n.default)((0,u.api)(s.url.getMetadataCategoryDelete,t)).then(function(a){console.log(a),0==a.code?(c.message.success(a.msg),i(e)):c.message.error(a.msg)})},a.metadataCategoryCreate=function(e,a){var t=(0,d.param)(a);(0,n.default)((0,u.api)(s.url.getMetadataCategoryCreate,t)).then(function(a){console.log(a),0==a.code?(c.message.success(a.msg),i(e,{},{})):c.message.error(a.msg)})}},98:function(e,a,t){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(a,"__esModule",{value:!0}),a.metadataDataCreate=a.metadataDataDelete=a.metadataDataEdit=a.metadataDataListCopy=a.metadataDataList=void 0;var r=t(19),n=l(r),u=t(15),d=t(16),s=t(17),c=t(9),o="METADATA_DATA_LIST",i=(a.metadataDataList=function(e,a,t){var l=void 0;if(a&&t){var r=(0,d.param)({pageNum:t.current||0,pageSize:6,categoryId:a.categoryId,dataId:a.dataId,dataName:a.dataName,dataStatus:a.dataStatus});(0,n.default)((0,u.api)(s.url.metadataDataList,r)).then(function(a){if(console.log(a),0==a.code){c.message.success(a.msg),l=a.result;for(var t=0;t<l.data.length;t++)switch(l.data[t].dataStatus){case 1:l.data[t].dataStatus="新建";break;case 5:l.data[t].dataStatus="上架";break;case 6:l.data[t].dataStatus="下架"}e({metaDataList:l,type:o})}else c.message.error(a.msg)})}else l=[],e({metaDataList:l,type:o})},a.metadataDataListCopy=function(e,a,t){var l=void 0;if(a&&t){var r=(0,d.param)({pageNum:t.current||0,pageSize:6,categoryId:a.categoryId,dataId:a.dataId,dataName:a.dataName,dataStatus:a.dataStatus});(0,n.default)((0,u.api)(s.url.metadataDataList,r)).then(function(a){if(console.log(a),0==a.code){l=a.result;for(var t=0;t<l.data.length;t++)switch(l.data[t].dataStatus){case 1:l.data[t].dataStatus="新建";break;case 5:l.data[t].dataStatus="上架";break;case 6:l.data[t].dataStatus="下架"}e({metaDataList:l,type:o})}})}else l=[],e({metaDataList:l,type:o})});a.metadataDataEdit=function(e,a,t,l){var r=(0,d.param)(a);(0,n.default)((0,u.api)(s.url.metadataDataUpdate,r)).then(function(a){console.log(a),0==a.code?(c.message.success(a.msg),i(e,{},{})):c.message.error(a.msg)})},a.metadataDataDelete=function(e,a){var t=(0,d.param)({category_id:a});(0,n.default)((0,u.api)(s.url.metadataDataDelete,t)).then(function(a){0==a.code?(c.message.success(a.msg),i(e)):c.message.error(a.msg)})},a.metadataDataCreate=function(e,a){var t=(0,d.param)(a);(0,n.default)((0,u.api)(s.url.metadataDataCreate,t)).then(function(e){console.log(e),0==e.code?c.message.success(e.msg):c.message.error(e.msg)})}},939:function(e,a,t){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(a,"__esModule",{value:!0});var r=t(7),n=l(r),u=t(2),d=l(u),s=t(5),c=l(s),o=t(4),i=l(o),m=t(3),f=l(m);t(1908);var p=t(1),g=l(p),y=(t(20),t(27)),E=l(y),v=t(940),h=l(v),b=t(9),C=function(e){function a(){return(0,d.default)(this,a),(0,i.default)(this,(a.__proto__||(0,n.default)(a)).apply(this,arguments))}return(0,f.default)(a,e),(0,c.default)(a,[{key:"render",value:function(){this.props.buttonList;return g.default.createElement("div",{className:"page"},g.default.createElement(E.default,{title:"数据产品添加"}),g.default.createElement(b.Row,{style:{marginTop:"10px",marginBottom:"10px"}},g.default.createElement(b.Col,{span:20,offset:2},g.default.createElement(h.default,null))))}}]),a}(p.Component);a.default=C},940:function(e,a,t){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(a,"__esModule",{value:!0});var r=t(46),n=l(r),u=t(6),d=l(u),s=t(7),c=l(s),o=t(2),i=l(o),m=t(5),f=l(m),p=t(4),g=l(p),y=t(3),E=l(y);t(1909);var v=t(1),h=l(v),b=t(9),C=t(98),k=t(68),N=t(20),S=b.Form.Item,w=b.Input.TextArea,_=0,x=b.Select.Option,I=function(e){function a(e){(0,i.default)(this,a);var t=(0,g.default)(this,(a.__proto__||(0,c.default)(a)).call(this));return t.handleSubmit=function(e){e.preventDefault(),t.props.form.validateFields(function(e,a){if(!e){a=(0,d.default)({},a,{attrArr:[]});for(var l=0;l<a.keys.length;l++)a.attrArr.push({attrVar:a["attrVar"+a.keys[l]],attrName:a["attrName"+a.keys[l]],attrValue:a["attrValue"+a.keys[l]]});var r={categoryId:a.categoryId,dataName:a.dataName,dataLable:a.dataLable,dataAbstract:a.dataAbstract,dataDesc:a.dataDesc,dataPrice:a.dataPrice,dataFormat:a.dataFormat,dataCharSet:a.dataCharSet,dataFrequency:a.dataFrequency,dataFrequencyUnit:a.dataFrequencyUnit,dataSave:a.dataSave,dataSaveUnit:a.dataSaveUnit,dataType:a.dataType,dataSize:a.dataSize,dataSizeUnit:a.dataSizeUnit,dataAddress:a.dataAddress,attributeList:a.attrArr};console.log("Received values of form: ",r);var u={dataParams:(0,n.default)(r)};console.log(u),t.props.submitCreate(u)}})},t.remove=function(e){var a=t.props.form,l=a.getFieldValue("keys");1!==l.length&&a.setFieldsValue({keys:l.filter(function(a){return a!==e})})},t.add=function(){_++;var e=t.props.form,a=e.getFieldValue("keys"),l=a.concat(_);e.setFieldsValue({keys:l})},t.checkPrice=function(e,a,t){return a.number>0?void t():void t("Price must greater than zero!")},t.state={},t}return(0,E.default)(a,e),(0,f.default)(a,[{key:"render",value:function(){var e=this,a=this.props.metaGategoryList;a.data&&(a=a.data),console.log(a);var t=this.props.form,l=t.getFieldDecorator,r=t.getFieldValue,n={labelCol:{xs:{span:12},sm:{span:6}},wrapperCol:{xs:{span:12},sm:{span:14}}},u={labelCol:{span:9},wrapperCol:{span:15}},s={labelCol:{span:0},wrapperCol:{span:12}},c={wrapperCol:{xs:{span:12,offset:0},sm:{span:12,offset:6}}},o=[];a.forEach(function(e,a){o.push(h.default.createElement(x,{key:a,value:e.categoryId+""},e.categoryName))});var i={wrapperCol:{xs:{span:24,offset:0},sm:{span:14,offset:6}}};l("keys",{initialValue:[]});var m=r("keys"),f=m.map(function(a,t){return h.default.createElement("div",null,h.default.createElement(b.Row,null,h.default.createElement(b.Col,{span:8},h.default.createElement(S,(0,d.default)({},i,{label:"",required:!1,key:a+"var"}),l("attrVar"+a,{validateTrigger:["onChange","onBlur"],rules:[{required:!0,whitespace:!0,message:"请输入属性标识"}]})(h.default.createElement(b.Input,{placeholder:"属性标识"+a,style:{width:"80%",marginRight:8}})),m.length>1?h.default.createElement(b.Icon,{className:"dynamic-delete-button",type:"minus-circle-o",disabled:1===m.length,onClick:function(){return e.remove(a)}}):null)),h.default.createElement(b.Col,{span:8},h.default.createElement(S,(0,d.default)({},i,{label:"",required:!1,key:a+"name"}),l("attrName"+a,{validateTrigger:["onChange","onBlur"],rules:[{required:!0,whitespace:!0,message:"请输入属性名称"}]})(h.default.createElement(b.Input,{placeholder:"属性名称"+a,style:{width:"80%",marginRight:8}})),m.length>1?h.default.createElement(b.Icon,{className:"dynamic-delete-button",type:"minus-circle-o",disabled:1===m.length,onClick:function(){return e.remove(a)}}):null)),h.default.createElement(b.Col,{span:8},h.default.createElement(S,(0,d.default)({},i,{label:"",required:!1,key:a+"value"}),l("attrValue"+a,{validateTrigger:["onChange","onBlur"],rules:[{required:!0,whitespace:!0,message:"请输入属性值"}]})(h.default.createElement(b.Input,{placeholder:"属性值"+a,style:{width:"80%",marginRight:8}})),m.length>1?h.default.createElement(b.Icon,{className:"dynamic-delete-button",type:"minus-circle-o",disabled:1===m.length,onClick:function(){return e.remove(a)}}):null))))});return h.default.createElement(b.Form,{onSubmit:this.handleSubmit},h.default.createElement("p",{className:"fontP"},"基本属性信息："),h.default.createElement(S,(0,d.default)({},n,{label:"数据分类",hasFeedback:!0}),h.default.createElement("div",{className:"input-wrap"},l("categoryId",{rules:[{required:!0,message:"请选择数据分类"}]})(h.default.createElement(b.Select,null,o)))),h.default.createElement(S,(0,d.default)({},n,{label:"数据名称",hasFeedback:!0}),h.default.createElement("div",{className:"input-wrap"},l("dataName",{rules:[{required:!0,message:"请输入数据名称"}]})(h.default.createElement(b.Input,{name:"name",key:"name"})))),h.default.createElement(S,(0,d.default)({},n,{label:"数据标签",hasFeedback:!0}),h.default.createElement("div",{className:"input-wrap"},l("dataLable",{rules:[{required:!0,message:"请输入数据标签"}]})(h.default.createElement(b.Input,{name:"name",key:"name"})))),h.default.createElement(S,(0,d.default)({},n,{label:"数据摘要",hasFeedback:!0}),h.default.createElement("div",{className:"input-wrap"},l("dataAbstract",{rules:[{required:!0,message:"请输入数据摘要"}]})(h.default.createElement(w,{name:"note",key:"note"})))),h.default.createElement(S,(0,d.default)({},n,{label:"数据描述",hasFeedback:!0}),h.default.createElement("div",{className:"input-wrap"},l("dataDesc",{rules:[{required:!0,message:"请输入数据描述"}]})(h.default.createElement(w,{name:"note",key:"note"})))),h.default.createElement(S,(0,d.default)({},n,{label:"数据价格(分)",hasFeedback:!0}),h.default.createElement("div",{className:"input-wrap"},l("dataPrice",{rules:[{required:!0,message:"请输入数据价格"}]})(h.default.createElement(b.Input,{name:"name",key:"name"})))),h.default.createElement(S,(0,d.default)({},n,{label:"数据格式",hasFeedback:!0}),h.default.createElement("div",{className:"input-wrap"},l("dataFormat",{rules:[{required:!0,message:"请输入数据数据格式"}]})(h.default.createElement(b.Select,null,h.default.createElement(x,{value:"basic"},"audio/basic"),h.default.createElement(x,{value:"jpeg"},"image/jpeg"),h.default.createElement(x,{value:"png"},"image/png"),h.default.createElement(x,{value:"mpeg"},"video/mpeg"),h.default.createElement(x,{value:"xml"},"text/xml"),h.default.createElement(x,{value:"plain"},"text/plain"),h.default.createElement(x,{value:"json"},"application/json"))))),h.default.createElement(S,(0,d.default)({},n,{label:"数据编码",hasFeedback:!0}),h.default.createElement("div",{className:"input-wrap"},l("dataCharSet",{rules:[{required:!0,message:"请选择数据编码"}]})(h.default.createElement(b.Select,null,h.default.createElement(x,{value:"utf8"},"utf8"),h.default.createElement(x,{value:"gb2312"},"gb2312"),h.default.createElement(x,{value:"latin1"},"latin1"))))),h.default.createElement(b.Row,{gutter:20},h.default.createElement(b.Col,{span:16},h.default.createElement(S,(0,d.default)({},u,{label:"数据更新频率",hasFeedback:!0}),h.default.createElement("div",{className:"input-wrap"},l("dataFrequency",{rules:[{required:!0,message:"请选择数据更新频率"}]})(h.default.createElement(b.InputNumber,{min:1,style:{width:"100%"}}))))),h.default.createElement(b.Col,{span:8},h.default.createElement(S,(0,d.default)({},s,{label:"",hasFeedback:!0}),h.default.createElement("div",{className:"input-wrap"},l("dataFrequencyUnit",{rules:[{required:!0,message:"请选择单位"}]})(h.default.createElement(b.Select,null,h.default.createElement(x,{value:"year"},"年"),h.default.createElement(x,{value:"month"},"月"),h.default.createElement(x,{value:"day"},"日"),h.default.createElement(x,{value:"hour"},"小时"),h.default.createElement(x,{value:"minute"},"分"),h.default.createElement(x,{value:"second"},"秒"))))))),h.default.createElement(b.Row,{gutter:20},h.default.createElement(b.Col,{span:16},h.default.createElement(S,(0,d.default)({},u,{label:"数据留存时间",hasFeedback:!0}),h.default.createElement("div",{className:"input-wrap"},l("dataSave",{rules:[{required:!0,message:"请选择数据留存时间"}]})(h.default.createElement(b.InputNumber,{min:1,style:{width:"100%"}}))))),h.default.createElement(b.Col,{span:8},h.default.createElement(S,(0,d.default)({},s,{label:"",hasFeedback:!0}),h.default.createElement("div",{className:"input-wrap"},l("dataSaveUnit",{rules:[{required:!0,message:"请选择单位"}]})(h.default.createElement(b.Select,null,h.default.createElement(x,{value:"year"},"年"),h.default.createElement(x,{value:"month"},"月"),h.default.createElement(x,{value:"day"},"日"),h.default.createElement(x,{value:"hour"},"小时"),h.default.createElement(x,{value:"minute"},"分"),h.default.createElement(x,{value:"second"},"秒"))))))),h.default.createElement(S,(0,d.default)({},n,{label:"数据类型",hasFeedback:!0}),h.default.createElement("div",{className:"input-wrap"},l("dataType",{rules:[{required:!0,message:"请选择数据类型"}]})(h.default.createElement(b.Select,null,h.default.createElement(x,{value:"text"},"文本"),h.default.createElement(x,{value:"image"},"图片"),h.default.createElement(x,{value:"video"},"视频"))))),h.default.createElement(b.Row,{gutter:20},h.default.createElement(b.Col,{span:16},h.default.createElement(S,(0,d.default)({},u,{label:"数据大小",hasFeedback:!0}),h.default.createElement("div",{className:"input-wrap"},l("dataSize",{rules:[{required:!0,message:"请输入数据大小"}]})(h.default.createElement(b.InputNumber,{min:1,style:{width:"100%"}}))))),h.default.createElement(b.Col,{span:8},h.default.createElement(S,(0,d.default)({},s,{label:"",hasFeedback:!0}),h.default.createElement("div",{className:"input-wrap"},l("dataSizeUnit",{rules:[{required:!0,message:"请选择单位"}]})(h.default.createElement(b.Select,null,h.default.createElement(x,{value:"B"},"B"),h.default.createElement(x,{value:"KB"},"KB"),h.default.createElement(x,{value:"MB"},"MB"),h.default.createElement(x,{value:"GB"},"GB"),h.default.createElement(x,{value:"TB"},"TB"),h.default.createElement(x,{value:"PB"},"PB"))))))),h.default.createElement(S,(0,d.default)({},n,{label:"数据路径",hasFeedback:!0}),h.default.createElement("div",{className:"input-wrap"},l("dataAddress",{rules:[{required:!0,message:"请输入数据路径"}]})(h.default.createElement(b.Input,{name:"name",key:"name"})))),h.default.createElement("hr",null),h.default.createElement("p",{className:"fontP"},"扩展属性信息："),h.default.createElement(b.Row,{style:{marginBottom:"20px"}},h.default.createElement(b.Col,{span:8},h.default.createElement("p",{style:{textAlign:"center"}},"属性标识")),h.default.createElement(b.Col,{span:8},h.default.createElement("p",{style:{textAlign:"center"}},"属性名称")),h.default.createElement(b.Col,{span:8},h.default.createElement("p",{style:{textAlign:"center"}},"属性值"))),f,h.default.createElement(S,i,h.default.createElement(b.Button,{type:"dashed",onClick:this.add,style:{width:"60%"}},h.default.createElement(b.Icon,{type:"plus"}),"添加扩展属性")),h.default.createElement(S,c,h.default.createElement(b.Button,{type:"primary",htmlType:"submit",style:{marginLeft:"33%"}},"添加")))}},{key:"componentDidMount",value:function(){this.props.fetchCategory("all"),this.render()}}]),a}(h.default.Component),D=function(e){return(0,d.default)({},e.metaGategoryList)},F=function(e){return{submitCreate:function(a){(0,C.metadataDataCreate)(e,a)},fetchCategory:function(a){(0,k.metadataCategoryListCopy)(e,{},{},a)}}},L=b.Form.create()(I);a.default=(0,N.connect)(D,F)(L)},1338:function(e,a,t){a=e.exports=t(11)(),a.push([e.id,"",""])},1339:function(e,a,t){a=e.exports=t(11)(),a.push([e.id,".anticon-close-circle{position:absolute;right:7px;top:7px;cursor:pointer;color:#ccc;transition:color .3s;font-size:12px}.ant-input-affix-wrapper{position:relative;display:inline-block}.anticon-close-circle:hover{color:#999}.anticon-close-circle:active{color:#666}.ant-input-prefix{left:7px;top:7px;z-index:2}input.ant-input{padding-left:24px}.fontP{margin-top:20px;font-size:14px;font-weight:700}",""])},1908:function(e,a,t){var l=t(1338);"string"==typeof l&&(l=[[e.id,l,""]]);t(12)(l,{});l.locals&&(e.exports=l.locals)},1909:function(e,a,t){var l=t(1339);"string"==typeof l&&(l=[[e.id,l,""]]);t(12)(l,{});l.locals&&(e.exports=l.locals)}});
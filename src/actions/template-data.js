const QUERY_TEMPLATE_DATA='QUERY_TEMPLATE_DATA';
import reqwest from 'reqwest';
import {
	api,
} from '../common/api_server'
import {
	param,
}from '../common/param'
import {
	url,
}from '../common/url_api'
import { Button, Modal, message } from 'antd';
//分类列表
export const queryTemplateData = (dispatch, search, pag) => {
  let templateDataList

  dispatch({
      templateDataList:{
				"tatal":20,
				"current":1,
				data:[
					{
							"templateId":111,
							"templateClassify":11,
							"templateName":"aaa",
							"templateStatus":1,
					},
					{
							"templateId":2222,
							"templateClassify":22,
							"templateName":"bbb",
							"templateStatus":2,
					},
					{
							"templateId":333,
							"templateClassify":33,
							"templateName":"ccc",
							"templateStatus":3,
					},
					{
							"templateId":44,
							"templateClassify":444,
							"templateName":"ddd",
							"templateStatus":4,
					},
				],
			},
      type: QUERY_TEMPLATE_DATA
  })
	// if(!search||!pag){
	// 	templateDataList=[]
	// 	dispatch({
	// 			templateDataList,
	// 			type: QUERY_TEMPLATE_DATA
	// 	})
	// }else{
	//   var par=param({
	// 		"pageNum": pag.current||0,
	// 		"pageSize": 6,
	// 		"categoryId":search.categoryId,
	// 		"dataId":search.dataId,
	// 		"dataName":search.dataName,
	// 		"dataStatus":search.dataStatus,
	// 	})
	//   reqwest(
	//   	api(url.queryTemplateList,par)
	//   ).then((req) => {
	//   	console.log(req)
	//   	if (req.code == 0) {
	//   		message.success(req.msg);
	//       templateDataList=req.result;
	// 			for (var i = 0; i < templateDataList.data.length; i++) {
	// 		    switch(templateDataList.data[i].dataStatus){
	// 		      case 1:
	// 						templateDataList.data[i].dataStatus="新建";
	// 		        break
	// 		      case 5:
	// 						templateDataList.data[i].dataStatus="上架";
	// 		        break
	// 		      case 6:
	// 						templateDataList.data[i].dataStatus="下架";
	// 		        break
	// 		      default:
	// 						break
	// 		    }
	// 			}
	//       dispatch({
	//           templateDataList,
	//           type: QUERY_TEMPLATE_DATA
	//       })
	//   	}else{
	//   		message.error(req.msg);
	//   	}
	//   });
	// }
}
//分类列表
export const queryTemplateDataCopy = (dispatch, search, pag) => {
  let templateDataList

    dispatch({
        templateDataList:{
					data:[
	          {
	              "templateId":111,
	              "templateClassify":11,
	              "templateName":"aaa",
	              "templateStatus":1,
	          },
	          {
	              "templateId":2222,
	              "templateClassify":22,
	              "templateName":"bbb",
	              "templateStatus":2,
	          },
	          {
	              "templateId":333,
	              "templateClassify":33,
	              "templateName":"ccc",
	              "templateStatus":3,
	          },
	          {
	              "templateId":44,
	              "templateClassify":444,
	              "templateName":"ddd",
	              "templateStatus":4,
	          },
	        ],
				},
        type: QUERY_TEMPLATE_DATA
    })
	// if(!search||!pag){
	// 	templateDataList=[]
	// 	dispatch({
	// 			templateDataList,
	// 			type: QUERY_TEMPLATE_DATA
	// 	})
	// }else{
	//   var par=param({
	// 		"pageNum": pag.current||0,
	// 		"pageSize": 6,
	// 		"categoryId":search.categoryId,
	// 		"dataId":search.dataId,
	// 		"dataName":search.dataName,
	// 		"dataStatus":search.dataStatus,
	// 	})
	//   reqwest(
	//   	api(url.queryTemplateList,par)
	//   ).then((req) => {
	//   	console.log(req)
	//   	if (req.code == 0) {
	//   		// message.success(req.msg);
	//       templateDataList=req.result;
	// 			for (var i = 0; i < templateDataList.data.length; i++) {
	// 		    switch(templateDataList.data[i].dataStatus){
	// 		      case 1:
	// 						templateDataList.data[i].dataStatus="新建";
	// 		        break
	// 		      case 5:
	// 						templateDataList.data[i].dataStatus="上架";
	// 		        break
	// 		      case 6:
	// 						templateDataList.data[i].dataStatus="下架";
	// 		        break
	// 		      default:
	// 						break
	// 		    }
	// 			}
	//       dispatch({
	//           templateDataList,
	//           type: QUERY_TEMPLATE_DATA
	//       })
	//   	}else{
	//   		// message.error(req.msg);
	//   	}
	//   });
	// }
}
// 分类编辑
export const templateDataEdit = (dispatch, info,search,pag) => {
  var par=param(info)
  reqwest(
  	api(url.editTemplateData,par)
  ).then((req) => {
		console.log(req);
  	if (req.code == 0) {
  		message.success(req.msg);
      queryTemplateDataCopy(dispatch,{},{})
  	}else{
  		message.error(req.msg);
  	}
  });
}
// 分类删除
export const templateDataDelete = (dispatch, info) => {
  var par=param({
    "category_id":info,
  })
  reqwest(
  	api(url.deleteTemplateData,par)
  ).then((req) => {
  	if (req.code == 0) {
  		message.success(req.msg);
      queryTemplateDataCopy(dispatch)
  	}else{
  		message.error(req.msg);
  	}
  });
}
// 分类添加
export const templateDataCreate = (dispatch, info) => {
  var par=param(info)
  reqwest(
  	api(url.addTemplateData,par)
  ).then((req) => {
		console.log(req);
  	if (req.code == 0) {
  		message.success(req.msg);
      // metadataDataListCopy(dispatch,{"current":1},null)
  	}else{
  		message.error(req.msg);
  	}
  });
}

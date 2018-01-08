const METADATA_DATA_LIST='METADATA_DATA_LIST';
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
export const metadataDataList = (dispatch, search, pag) => {
  let metaDataList
	if(!search||!pag){
		metaDataList=[]
		dispatch({
				metaDataList,
				type: METADATA_DATA_LIST
		})
	}else{
	  var par=param({
			"pageNum": pag.current||0,
			"pageSize": 6,
			"categoryId":search.categoryId,
			"dataId":search.dataId,
			"dataName":search.dataName,
			"dataStatus":search.dataStatus,
		})
	  reqwest(
	  	api(url.metadataDataList,par)
	  ).then((req) => {
	  	console.log(req)
	  	if (req.code == 0) {
	  		message.success(req.msg);
	      metaDataList=req.result;
				for (var i = 0; i < metaDataList.data.length; i++) {
			    switch(metaDataList.data[i].dataStatus){
			      case 1:
							metaDataList.data[i].dataStatus="新建";
			        break
			      case 5:
							metaDataList.data[i].dataStatus="上架";
			        break
			      case 6:
							metaDataList.data[i].dataStatus="下架";
			        break
			      default:
							break
			    }
				}
	      dispatch({
	          metaDataList,
	          type: METADATA_DATA_LIST
	      })
	  	}else{
	  		message.error(req.msg);
	  	}
	  });
	}
}
//分类列表
export const metadataDataListCopy = (dispatch, search, pag) => {
  let metaDataList
	if(!search||!pag){
		metaDataList=[]
		dispatch({
				metaDataList,
				type: METADATA_DATA_LIST
		})
	}else{
	  var par=param({
			"pageNum": pag.current||0,
			"pageSize": 6,
			"categoryId":search.categoryId,
			"dataId":search.dataId,
			"dataName":search.dataName,
			"dataStatus":search.dataStatus,
		})
	  reqwest(
	  	api(url.metadataDataList,par)
	  ).then((req) => {
	  	console.log(req)
	  	if (req.code == 0) {
	  		// message.success(req.msg);
	      metaDataList=req.result;
				for (var i = 0; i < metaDataList.data.length; i++) {
			    switch(metaDataList.data[i].dataStatus){
			      case 1:
							metaDataList.data[i].dataStatus="新建";
			        break
			      case 5:
							metaDataList.data[i].dataStatus="上架";
			        break
			      case 6:
							metaDataList.data[i].dataStatus="下架";
			        break
			      default:
							break
			    }
				}
	      dispatch({
	          metaDataList,
	          type: METADATA_DATA_LIST
	      })
	  	}else{
	  		// message.error(req.msg);
	  	}
	  });
	}
}
// 分类编辑
export const metadataDataEdit = (dispatch, info,search,pag) => {
  var par=param(info)
  reqwest(
  	api(url.metadataDataUpdate,par)
  ).then((req) => {
		console.log(req);
  	if (req.code == 0) {
  		message.success(req.msg);
      metadataDataListCopy(dispatch,{},{})
  	}else{
  		message.error(req.msg);
  	}
  });
}
// 分类删除
export const metadataDataDelete = (dispatch, info) => {
  var par=param({
    "category_id":info,
  })
  reqwest(
  	api(url.metadataDataDelete,par)
  ).then((req) => {
  	if (req.code == 0) {
  		message.success(req.msg);
      metadataDataListCopy(dispatch)
  	}else{
  		message.error(req.msg);
  	}
  });
}
// 分类添加
export const metadataDataCreate = (dispatch, info) => {
  var par=param(info)
  reqwest(
  	api(url.metadataDataCreate,par)
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

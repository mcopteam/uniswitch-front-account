const METADATA_CATEGORY_LIST='METADATA_CATEGORY_LIST';
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
export const metadataCategoryList = (dispatch, search, pag) => {
  let metaGategoryList
	if(!search||!pag){
		metaGategoryList=[]
		dispatch({
				metaGategoryList,
				type: METADATA_CATEGORY_LIST
		})
	}else{
	  var par=param({
			"pageNum": pag.current||1,
			"pageSize": 6,
			"categoryId":search.categoryId,
			"categoryName":search.categoryName,
		})
	  reqwest(
	  	api(url.getMetadataCategoryList,par)
	  ).then((req) => {
	  	console.log(req)
	  	if (req.code == 0) {
	  		message.success(req.msg);
	      metaGategoryList=req.result;
	      dispatch({
	          metaGategoryList,
	          type: METADATA_CATEGORY_LIST
	      })
	  	}else{
	  		message.error(req.msg);
	  	}
	  });
	}
}
//分类列表
export const metadataCategoryListCopy = (dispatch, search, pag, type) => {
  let metaGategoryList
	if(!search||!pag){
		metaGategoryList=[]
		dispatch({
				metaGategoryList,
				type: METADATA_CATEGORY_LIST
		})
	}else{
		if (type=='all') {
		  var par=param({
				"pageNum": pag.current||1,
				"pageSize": 100,
				"categoryId":search.categoryId,
				"categoryName":search.categoryName,
			})
		}else{
		  var par=param({
				"pageNum": pag.current||1,
				"pageSize": 6,
				"categoryId":search.categoryId,
				"categoryName":search.categoryName,
			})
		}
	  reqwest(
	  	api(url.getMetadataCategoryList,par)
	  ).then((req) => {
	  	console.log(req)
	  	if (req.code == 0) {
	  		// message.success(req.msg);
	      metaGategoryList=req.result;
	      dispatch({
	          metaGategoryList,
	          type: METADATA_CATEGORY_LIST
	      })
	  	}else{
	  		// message.error(req.msg);
	  	}
	  });
	}
}
// 分类编辑
export const metadataCategoryEdit = (dispatch, info,search,pag) => {
  var par=param(info)
  reqwest(
  	api(url.getMetadataCategoryEdit,par)
  ).then((req) => {
		console.log(req);
  	if (req.code == 0) {
  		message.success(req.msg);
      metadataCategoryListCopy(dispatch,{},{})
  	}else{
  		message.error(req.msg);
  	}
  });
}
// 分类删除
export const metadataCategoryDelete = (dispatch, info) => {
  var par=param({
    "categoryId":info,
  })
  reqwest(
  	api(url.getMetadataCategoryDelete,par)
  ).then((req) => {
		console.log(req);
  	if (req.code == 0) {
  		message.success(req.msg);
      metadataCategoryListCopy(dispatch)
  	}else{
  		message.error(req.msg);
  	}
  });
}
// 分类添加
export const metadataCategoryCreate = (dispatch, info) => {
  var par=param(info)
  reqwest(
  	api(url.getMetadataCategoryCreate,par)
  ).then((req) => {
		console.log(req);
  	if (req.code == 0) {
  		message.success(req.msg);
      metadataCategoryListCopy(dispatch,{},{})
  	}else{
  		message.error(req.msg);
  	}
  });
}

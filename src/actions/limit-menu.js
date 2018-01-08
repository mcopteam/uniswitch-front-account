import {
    ACTION_MENU_LIST,
} from './reducers-type'
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
//角色列表
export const actionLimitMenuSearch = (dispatch, search, pag) => {
    let menuList
    if (search) {
      var par=param({
        "pageNum": pag.current||1,
        "pageSize": pag.pageSize||6,
        "id":search.id,
        "name":search.name,
      })
      reqwest(
      	api(url.limitMenuList,par)
      ).then((req) => {
      	console.log(req)
      	if (req.code == 0) {
      		message.success(req.msg);
          dispatch({
              menuList:req.result,
              type: ACTION_MENU_LIST
          })
      	}else{
      		message.error(req.msg);
      	}
      });
    } else {
      dispatch({
          menuList:[],
          type: ACTION_MENU_LIST
      })
    }
}
//角色列表Copy
export const actionLimitMenuSearchCopy = (dispatch, search, pag) => {
    let menuList
    console.log(search);
    if (search) {
      var par=param({
        "pageNum": pag.current||1,
        "pageSize": pag.pageSize||6,
        "id":search.id,
        "name":search.name,
      })
      reqwest(
      	api(url.limitMenuList,par)
      ).then((req) => {
      	console.log(req)
      	if (req.code == 0) {
          dispatch({
              menuList:req.result,
              type: ACTION_MENU_LIST
          })
      	}else{
      	}
      });
    } else {
      dispatch({
          menuList:[],
          type: ACTION_MENU_LIST
      })
    }
}

//角色资源删除
export const actionLimitMenuDelete = (dispatch, id, search, pag) => {
    var par=param({
      "id":id,
    })
    reqwest(
    	api(url.limitMenuDelete,par)
    ).then((req) => {
    	console.log(req)
    	if (req.code == 0) {
    		message.success(req.msg);
        actionLimitMenuSearchCopy(dispatch, search, pag)
    	}else{
    		message.error(req.msg);
    	}
    });
}
//菜单资源创建
export const actionLimitMenuCreate= (dispatch, search) => {
    let menuList
    var par=param({
      "key":search.key,
      "name":search.name,
      "fullName":search.fullName,
      "link":search.link,
      "parentId":search.parentId,
      "orderNum":search.orderNum,
      "note":search.note,
    })
    reqwest(
    	api(url.limitMenuCreate,par)
    ).then((req) => {
    	console.log(req)
    	if (req.code == 0) {
    		message.success(req.msg);
        actionLimitMenuSearchCopy(dispatch,{},{})
    	}else{
    		message.error(req.msg);
    	}
    });
}
// 菜单资源编辑
export const actionMenuEdit = (dispatch, info, search, pag) => {
  console.log(info);
  var par=param({
    "id":info.id,
    "key":info.key,
    "name":info.name,
    "fullName":info.fullName,
    "link":info.link,
    "parentId":info.parentId,
    "orderNum":info.orderNum,
    "note":info.note,
  })
  reqwest(
    api(url.limitMenuListDetail,par)
  ).then((req) => {
    console.log(req)
    if (req.code == 0) {
      message.success(req.msg);
      actionLimitMenuSearchCopy(dispatch, search, pag)
    }else{
      message.error(req.msg);
    }
  });
}

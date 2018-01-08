import {
    ACTION_ROLE_LIST,
} from './reducers-type'
const ACTION_ROLE_LIMIT_DATA_LIST = 'ACTION_ROLE_LIMIT_DATA_LIST';
const ACTION_ROLE_LIMIT_FUN_LIST = 'ACTION_ROLE_LIMIT_FUN_LIST';
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
export const actionLimitRoleSearch = (dispatch, search, pag) => {
  var pag=pag||{
    "pageNum":1,
  }
  let roleList
  if(search){
    par=param({
      "pageNum": pag.current,
      "pageSize": 6,
      "id":search.roleSelect,
    })
    reqwest(
    	api(url.limitRoleList,par)
    ).then((req) => {
      console.log(req);
    	if (req.code == 0) {
    		message.success(req.msg);
        roleList=req.result;
        if (!search) {
          req.result.total=0;
        }
        dispatch({
            roleList,
            type: ACTION_ROLE_LIST
        })
    	}else{
    		message.error(req.msg);
    	}
    });
  }else{
    var par=param({
      "pageSize":100,
    })
    reqwest(
    	api(url.limitRoleList,par)
    ).then((req) => {
      console.log(req);
    	if (req.code == 0) {
    		message.success(req.msg);
        roleList=req.result.data;
        dispatch({
            roleList,
            type: ACTION_ROLE_LIST
        })
    	}else{
    		message.error(req.msg);
    	}
    });
  }
}
//角色列表
export const actionLimitRoleSearchCopy = (dispatch, search, pag) => {
  var pag=pag||{
    "pageNum":1,
  }
  let roleList
  if(search){
    par=param({
      "pageNum": pag.current,
      "pageSize": 6,
      "id":search.roleSelect,
    })
    reqwest(
    	api(url.limitRoleList,par)
    ).then((req) => {
      console.log(req);
    	if (req.code == 0) {
    		// message.success(req.msg);
        roleList=req.result;
        if (!search) {
          req.result.total=0;
        }
        dispatch({
            roleList,
            type: ACTION_ROLE_LIST
        })
    	}else{
    		// message.error(req.msg);
    	}
    });
  }else{
    var par=param({
      "pageSize":100,
    })
    reqwest(
    	api(url.limitRoleList,par)
    ).then((req) => {
      console.log(req);
    	if (req.code == 0) {
    		// message.success(req.msg);
        roleList=req.result.data;
        dispatch({
            roleList,
            type: ACTION_ROLE_LIST
        })
    	}else{
    		// message.error(req.msg);
    	}
    });
  }
}
// 角色编辑
export const actionRoleEdit = (dispatch, info,search,pag) => {
  let roleList
  var par=param({
    "id":info.id,
    "name":info.name,
    "note":info.note,
  })
  reqwest(
  	api(url.limitRoleListUpdate,par)
  ).then((req) => {
  	if (req.code == 0) {
  		message.success(req.msg);
      actionLimitRoleSearchCopy(dispatch,search,pag)
  	}else{
  		message.error(req.msg);
  	}
  });
}
// 角色删除
export const actionRoleDelete = (dispatch, info) => {
  var par=param({
    "id":info,
  })
  reqwest(
  	api(url.limitRoleListDelete,par)
  ).then((req) => {
  	if (req.code == 0) {
  		message.success(req.msg);
      actionLimitRoleSearchCopy(dispatch)
  	}else{
  		message.error(req.msg);
  	}
  });
}
// 角色添加
export const actionRoleCreate = (dispatch, info) => {
  var par=param({
    "name":info.name,
    "note":info.note,
  })
  reqwest(
  	api(url.limitRoleListCreate,par)
  ).then((req) => {
  	if (req.code == 0) {
  		message.success(req.msg);
      actionLimitRoleSearchCopy(dispatch,{"current":1},null)
  	}else{
  		message.error(req.msg);
  	}
  });
}
// 权限查询
export const actionRoleLimitData = (dispatch, info) => {
  let priviDataList
  var par=param({
    "role":info
  })
  reqwest(
  	api(url.limitRoleListData,par)
  ).then((req) => {
  	console.log(req)
  	if (req.code == 0) {
  		message.success(req.msg);
      priviDataList=req.result;
      dispatch({
          priviDataList,
          type: ACTION_ROLE_LIMIT_DATA_LIST
      })
  	}else{
  		message.error(req.msg);
  	}
  });
}
// 权限查询2
export const actionRoleLimitFun = (dispatch, info) => {
  console.log(info);
  let priviFunList
  var par=param({
    "role":info
  })
  reqwest(
  	api(url.limitRoleListFun,par)
  ).then((req) => {
  	console.log(req)
  	if (req.code == 0) {
  		message.success(req.msg);
      priviFunList=req.result;
      console.log("----------------list---------------------");
      console.log(priviFunList);
      console.log("----------------list---------------------");
      dispatch({
          priviFunList,
          type: ACTION_ROLE_LIMIT_FUN_LIST
      })
  	}else{
  		message.error(req.msg);
  	}
  });
}

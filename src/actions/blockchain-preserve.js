import {
  ACTION_BLOCKCHAIN_LIST,
  ACTION_BLOCKCHAIN_OPTION,
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
//区块链列表
export const actionBlockchainSearch = (dispatch,init) => {
  let blockchainList
  if (init) {
    dispatch({
        blockchainList:[],
        type: ACTION_BLOCKCHAIN_LIST
    })
  }else{
    var par=param({})
    reqwest(
    	api(url.blockchainList,par)
    ).then((req) => {
      console.log(req);
    	if (req.code == 0) {
    		message.success(req.msg);
        blockchainList=req.result;
        for (var i = 0; i < blockchainList.length; i++) {
          blockchainList[i].storeContract=blockchainList[i].storeContract?"是":"否";
          blockchainList[i].valid=blockchainList[i].valid?"是":"否";
        }
        dispatch({
            blockchainList,
            type: ACTION_BLOCKCHAIN_LIST
        })
    	}else{
    		message.error(req.msg);
    	}
    });
  }
}
//区块链列表
export const actionBlockchainSearchCopy = (dispatch) => {
  let blockchainList
    var par=param({})
    reqwest(
    	api(url.blockchainList,par)
    ).then((req) => {
      console.log(req);
    	if (req.code == 0) {
        blockchainList=req.result;
        for (var i = 0; i < blockchainList.length; i++) {
          blockchainList[i].storeContract=blockchainList[i].storeContract?"是":"否";
          blockchainList[i].valid=blockchainList[i].valid?"是":"否";
        }
        console.log(blockchainList);
        dispatch({
            blockchainList,
            type: ACTION_BLOCKCHAIN_LIST
        })
    	}else{
    	}
    });
}
// 区块链编辑
export const actionBlockchainEdit = (dispatch, info, id) => {
  info.storeContract=info.storeContract=="1"?true:info.storeContract=="0"?false:null;
  info.valid=info.valid=="1"?true:info.valid=="0"?false:null;
  var par=param({
    "id":id,
    "type":info.type,
    "name":info.name,
    "description":info.description,
    "ip":info.ip,
    "port":info.port,
    "storeContract":info.storeContract,
    "valid":info.valid,
  })
  console.log(info);
  reqwest(
  	api(url.blockchainEdit,par)
  ).then((req) => {
  	if (req.code == 0) {
  		message.success(req.msg);
      actionBlockchainSearchCopy(dispatch)
  	}else{
  		message.error(req.msg);
  	}
  });
}
// 区块链删除
export const actionBlockchainDelete = (dispatch, id) => {
  var par=param({
    "id":id,
  })
  reqwest(
  	api(url.blockchainDelete,par)
  ).then((req) => {
  	if (req.code == 0) {
  		message.success(req.msg);
      actionBlockchainSearchCopy(dispatch)
  	}else{
  		message.error(req.msg);
  	}
  });
}
// 区块链添加
export const actionBlockchainCreate = (dispatch, info) => {
  info.storeContract=info.storeContract=="1"?true:false;
  info.valid=info.valid=="1"?true:false;
  var par=param({
    "type":info.type,
    "name":info.name,
    "description":info.description,
    "ip":info.ip,
    "port":info.port,
    "storeContract":info.storeContract,
    "valid":info.valid,
  })
  reqwest(
  	api(url.blockchainAdd,par)
  ).then((req) => {
  	if (req.code == 0) {
  		message.success(req.msg);
      actionBlockchainSearchCopy(dispatch)
  	}else{
  		message.error(req.msg);
  	}
  });
}
// 区块链测试
export const actionBlockchainTest = (dispatch, id) => {
  var par=param({
    "id":id,
  })
  reqwest(
  	api(url.blockchainTest,par)
  ).then((req) => {
    console.log(req);
  	if (req.code == 0) {
  		message.success(req.msg);
  	}else{
  		message.error(req.msg);
  	}
  });
}

//区块链下拉列表
export const actionBlockchainOption = (dispatch,init) => {
  let blockchainOption
  if (init) {
    dispatch({
        blockchainOption:[],
        type: ACTION_BLOCKCHAIN_OPTION
    })
  }else{
    var par=param({})
    reqwest(
    	api(url.blockchainOption,par)
    ).then((req) => {
      console.log(req);
    	if (req.code == 0) {
    		// message.success(req.msg);
        blockchainOption=req.result;
        dispatch({
            blockchainOption,
            type: ACTION_BLOCKCHAIN_OPTION
        })
    	}else{
    		// message.error(req.msg);
    	}
    });
  }
}

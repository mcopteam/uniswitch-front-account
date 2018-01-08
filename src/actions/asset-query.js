const ASSET_QUERY_LIST='ASSET_QUERY_LIST';
const ASSET_QUERY_AMOUNT='ASSET_QUERY_AMOUNT';
const ASSET_KEYPAIRS='ASSET_KEYPAIRS';
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
//记录列表
export const assetQueryList = (dispatch, search, pag) => {
  let assetList
	if(!search||!pag){
		assetList={
			"total":0,
			"data":[]
		}
		dispatch({
				assetList,
				type: ASSET_QUERY_LIST
		})
	}else{
	  var par=param({
			"pageNum": pag.current,
			"pageSize": 6,
			"user":search.user,
			"pubkey":search.pubkey,
			"blockChainId":search.blockChainId,
		})
	  reqwest(
	  	api(url.assetRecordQueryList,par)
	  ).then((req) => {
	  	console.log(req)
	  	if (req.code == 0) {
	  		message.success(req.msg);
	      assetList=req.result;
	      dispatch({
	          assetList,
	          type: ASSET_QUERY_LIST
	      })
	  	}else{
	  		message.error(req.msg);
	  	}
	  });
	}
}
//记录列表
export const assetQueryListCopy = (dispatch, search, pag) => {
  let assetList
	if(!search||!pag){
		assetList={
			"total":0,
			"data":[]
		}
		dispatch({
				assetList,
				type: ASSET_QUERY_LIST
		})
	}else{
	  var par=param({
			"pageNum": pag.current,
			"pageSize": 6,
			"user":search.user,
			"pubkey":search.pubkey,
			"blockChainId":search.blockChainId,
		})
	  reqwest(
	  	api(url.assetRecordQueryList,par)
	  ).then((req) => {
	  	console.log(req)
	  	if (req.code == 0) {
	  		// message.success(req.msg);
	      assetList=req.result;
	      dispatch({
	          assetList,
	          type: ASSET_QUERY_LIST
	      })
	  	}else{
	  		// message.error(req.msg);
	  	}
	  });
	}
}
//账号余额
export const assetQueryAmount = (dispatch, search) => {
  let amount
	if(!search){
		amount=0;
		dispatch({
				amount,
				type: ASSET_QUERY_AMOUNT
		})
	}else {
	  var par=param({
			"user":search.user,
			"pubkey":search.pubkey,
			"blockChainId":search.blockChainId,
		})
	  reqwest(
	  	api(url.assetRecordQueryAmount,par)
	  ).then((req) => {
	  	console.log(req)
	  	if (req.code == 0) {
	  		message.success(req.msg);
	      amount=req.result;
	      dispatch({
	          amount,
	          type: ASSET_QUERY_AMOUNT
	      })
	  	}else{
	  		message.error(req.msg);
	  	}
	  });
	}
}
//账号余额
export const assetQueryAmountCopy = (dispatch, search) => {
  let amount
	if(!search){
		amount=0;
		dispatch({
				amount,
				type: ASSET_QUERY_AMOUNT
		})
	}else {
	  var par=param({
			"user":search.user,
			"pubkey":search.pubkey,
			"blockChainId":search.blockChainId,
		})
	  reqwest(
	  	api(url.assetRecordQueryAmount,par)
	  ).then((req) => {
	  	console.log(req)
	  	if (req.code == 0) {
	  		// message.success(req.msg);
	      amount=req.result;
	      dispatch({
	          amount,
	          type: ASSET_QUERY_AMOUNT
	      })
	  	}else{
	  		// message.error(req.msg);
	  	}
	  });
	}
}
//账号list
export const assetKeyPairs = (dispatch,search) => {
  let keyPairs
  var par=param({
			"username":search,
	})
  reqwest(
  	api(url.accountKeypairList,par)
  ).then((req) => {
  	console.log(req)
  	if (req.code == 0) {
  		// message.success(req.msg);
      keyPairs=req.result;
      dispatch({
          keyPairs,
          type: ASSET_KEYPAIRS
      })
  	}else{
  		// message.error(req.msg);
  	}
  });
}

const PRE_LIST='PRE_LIST'
const ACCOUNT_RECORD='ACCOUNT_RECORD'
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
import moment from 'moment'
import {base_constants,} from '../common/base_constants'
import { Button, Modal, message } from 'antd';
export const preList = (dispatch,search,pag) => {
		let preList
		let data
		var par=param({
			pageSize: 0,
		})
		if (search) {
			if (search.effectSelect) {
				if (search.effectSelect=="1") {
					search.effectSelect=true;
				}else if (search.effectSelect=="0") {
					search.effectSelect=false;
				}
			}
	    var par=param({
				"pageNum": pag.current,
				"pageSize": pag.pageSize||6,
				"username":search.username,
				"role":search.roleSelect,
				"status":search.statusSelect,
				"validFlag":search.effectSelect,
			})
	    reqwest(
	    	api(url.accountPreserveQuery,par)
	    ).then((req) => {
	    	console.log(req)
	    	if (req.code == 0) {
	    		message.success(req.msg);
	        data=req.result.data;
	        for (var i = 0; i < data.length; i++) {
						if (data[i].role) {
							data[i].rolename=data[i].role.name;
							data[i].roleId=data[i].role.id;
						}
	          var keyList=data[i].keyPairs
	          var relate='---';
	          for (var j = 0; j < keyList.length; j++) {
	            if (keyList[j].status==0) {
	              relate=keyList[j].publicKey
	            }
	          }
	          data[i].relate=relate;
	        }
					if (!search) {
						req.result.total=0;
					}
	        console.log(data);
	        dispatch({
	            preList:req.result,
	            type: PRE_LIST
	        })
	    	}else{
	    		message.error(req.msg);
	    	}
	    });
		}else{
      dispatch({
          preList:[],
          type: PRE_LIST
      })
		}
}

export const preListCopy = (dispatch,search,pag) => {
		let preList
		let data
		var par=param({
			pageSize: 0,
		})
		if (search) {
			if (search.effectSelect) {
				if (search.effectSelect=="1") {
					search.effectSelect=true;
				}else if (search.effectSelect=="0") {
					search.effectSelect=false;
				}
			}
	    var par=param({
				"pageNum": pag.current,
				"pageSize": pag.pageSize||6,
				"username":search.username,
				"role":search.roleSelect,
				"status":search.statusSelect,
				"validFlag":search.effectSelect,
			})
	    reqwest(
	    	api(url.accountPreserveQuery,par)
	    ).then((req) => {
	    	console.log(req)
	    	if (req.code == 0) {
	    		// message.success(req.msg);
	        data=req.result.data;
	        for (var i = 0; i < data.length; i++) {
						if (data[i].role) {
							data[i].rolename=data[i].role.name;
							data[i].roleId=data[i].role.id;
						}
	          var keyList=data[i].keyPairs
	          var relate='---';
	          for (var j = 0; j < keyList.length; j++) {
	            if (keyList[j].status==0) {
	              relate=keyList[j].publicKey
	            }
	          }
	          data[i].relate=relate;
	        }
					if (!search) {
						req.result.total=0;
					}
	        console.log(data);
	        dispatch({
	            preList:req.result,
	            type: PRE_LIST
	        })
	    	}else{
	    		// message.error(req.msg);
	    	}
	    });
		}else{
      dispatch({
          preList:[],
          type: PRE_LIST
      })
		}
}

export const actionPreEdit = (dispatch,search,id,searchParams,pag) => {
	console.log(id);
	console.log(search);
	if (search.validFlag=="1"||search.validFlag=="有效") {
		search.validFlag=true;
	}else if (search.validFlag=="0"||search.validFlag=="无效") {
		search.validFlag=false;
	}
    var par=param({
			"id":id,
			"role":search.role,
			"validFlag":search.validFlag,
		})
    reqwest(
    	api(url.accountPreserveReset,par)
    ).then((req) => {
    	console.log(req)
    	if (req.code == 0) {
    		message.success(req.msg);
				preListCopy(dispatch,searchParams,pag)
    	}else{
    		message.error(req.msg);
    	}
    });
}
export const accountRecord = (dispatch,search) => {
	let recordList
	console.log(search);
  var par=param({
		"username":search,
	})
  reqwest(
  	api(url.accountPreserveQueryRecord,par)
  ).then((req) => {
  	console.log(req)
  	if (req.code == 0) {
  		message.success(req.msg);
			var result = JSON.parse(req.result);
			var data=result.data;
			for (var i = 0; i < data.length; i++) {
				data[i].status=base_constants.user_status[data[i].status+6];
				var time=Number(data[i].timestamp)
				data[i].timestamp=moment(time).format("YYYY-MM-DD HH:mm:ss")
			}
			console.log(data);
			dispatch({
					recordList:data,
					type: ACCOUNT_RECORD,
			})
  	}else{
  		message.error(req.msg);
  	}
  });
}

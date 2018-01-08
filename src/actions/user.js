import fetch from '../utils/fetch'
import config from '../config'
export const REQUEST_USER_INFO = 'REQUEST_USER_INFO'
export const RECEIVE_USER_INFO_SUCCESS = 'RECEIVE_USER_INFO_SUCCESS'
export const RECEIVE_USER_INFO_FAIL = 'RECEIVE_USER_INFO_FAIL'
export const RECEIVE_AUTH_INFO_SUEECESS = 'RECEIVE_AUTH_INFO_SUEECESS'
export const REQUEST_MENU_LIST = 'REQUEST_MENU_LIST'
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
import $ from 'jquery';
import { Button, Modal, message } from 'antd';

// import {polyfill} from 'es6-promise'
// import originFetch from 'isomorphic-fetch'
// import Promise from 'promise'
// polyfill()
//
// function fetch(url, options) {
//   return new Promise((resolve, reject) => {
//     originFetch(url, {
//       headers: {
//         'Content-Type': 'application/json',
//         'X-Requested-With': 'XMLHttpRequest',
// 	    	"token": sessionStorage.token,
//       },
//       credentials: 'same-origin',
//       ...options,
//     }).then((res) => {
//       return res.json()
//     }).then((res) => {
// 			console.log(res);
//     }).catch((e) => {
//       message.error('服务端异常！')
//       throw e
//     })
//   })
// }

export function requestMenuList(dispatch) {
    let menuList
		// let parm={
		// 	"sign":12,
		// 	"timestamp":11,
		// 	"role":1,
		// }
		// console.log(JSON.stringify(parm));
		// fetch("http://172.17.7.183:8091/privilege/findMenuTreePrivilege?"+reqwest.toQueryString(parm))
		var par=param({
			"role":sessionStorage.role,
		})
		reqwest(
			api(url.requireMenuList,par)
		).then((req) => {
			console.log(req)
			if (req.code == 0) {
				// message.success(req.msg);
		    menuList=req.result;
		    dispatch({
		        menuList,
		        type: REQUEST_MENU_LIST,
		    })
			}else{
		    dispatch({
		        menuList:[],
		        type: REQUEST_MENU_LIST,
		    })
				// message.error(req.msg);
			}
		});
		// console.log(sessionStorage.token);
		// let parm={
		// 	"sign":12,
		// 	"timestamp":11,
		// 	"role":1,
		// }
    // $.ajax({
    //     type : "POST",
    //     // contentType : "application/json",
    //     dataType : "json",
    //     // beforeSend: function(request) {
    //     //      request.setRequestHeader("token", sessionStorage.token);
    //     // },
		// 		headers: {
		// 	    	"token": sessionStorage.token,
		// 				"Access-Control-Allow-Origin":"token",
		// 	  },
    //     data : JSON.stringify(parm), //以json格式传递
    //     success : function(res) {
		// 			console.log(res);
    //     }
    // });
}


export function requestUserInfo() {
  return {
    type: REQUEST_USER_INFO,
  }
}

export function receiveUserInfoSuccess(userInfo) {
  return {
    type: RECEIVE_USER_INFO_SUCCESS,
    ...userInfo,
  }
}

export function receiveAuthInfoSuccess(userInfo) {
  return {
    type: RECEIVE_AUTH_INFO_SUEECESS,
    ...userInfo
  }
}

export function receiveUserInfoFail() {
  return {
    type: RECEIVE_USER_INFO_FAIL,
  }
}
//
//export function fetchUserInfo() {
//	return function() {
//		return fetch('http://172.17.7.109:9088/login').then(res) => {
//			if( res.code == 200 ){
//				var user={
//					"name"=
//				}
//			}
//		}
//	}
//}

export function fetchUserInfo() {
  return function(dispath) {
    dispath(requestUserInfo())
    return fetch('/platform-buyer/api/platform/page/getMenu').then((res) => {
      if (res && res.errorCode === 0) {
        let result = res.result
        let menues = result.menu.map((item) => {
            return  {
              name: item.title,
              key: item.className,
              link: item.list.length === 1 ? item.list[0].url : '',
              icon: '',
              subMenues: item.list.length > 1 ? item.list.map((sub, i) => {
                return {
                  name: sub.title,
                  key: sub.cur + i,
                  link: sub.url,
                  icon: '',
                }
              }) : null
            }
        })
        dispath(receiveUserInfoSuccess({
          user: {
            id: result.uid,
            name: result.userName,
          },
          role: {
            id: result.roleId,
            title: result.roleTitle,
          },
          menues: menues,
        }))
        if (result.roleId) {
          return fetch('/permission/role/queryDrns?appId=1&token=1&logId=1&roleId=' + result.roleId).then((ruthRes) => {
            if (ruthRes && ruthRes.errorCode === 0) {
              dispath(receiveAuthInfoSuccess({
                authes: ruthRes.drnInfos
              }))
            }
          })
        }
      }
    })
  }
}

export function logout(){
  console.log('logout')
  window.location = config.logoutUrl
}

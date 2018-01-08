const BUTTON_LIST='BUTTON_LIST';
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
//按钮数组
export const queryButtonList = (dispatch) => {
  let buttonList
  var par=param({
		"role":sessionStorage.role,
  })
  reqwest(
  	api(url.requireButtonList,par)
  ).then((req) => {
  	console.log(req)
  	if (req.code == 0) {
  		// message.success(req.msg);
      buttonList=req.result;
      dispatch({
          buttonList,
          type: BUTTON_LIST
      })
  	}else{
  		// message.error(req.msg);
  	}
  });
}

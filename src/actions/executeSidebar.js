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
const EXECUTE_SIDEBAR='EXECUTE_SIDEBAR'
const EXE_SID_CON='EXE_SID_CON'
export function executeSidebar(dispatch,id,contractId) {
  let data=[];
	let conData={};
  let msg='';
	console.log(id);
  console.log(contractId);
  var par=param({
    "contractId": contractId+''
  })
  reqwest(
    api(url.executeQueryLog,par)
  ).then((req) => {
    console.log(req)
    req.sesult = req.sesult ||  []
    if (req.code==0) {
			if (req.result) {
	      data=req.result.data;
	      msg=req.msg;
	      dispatch({
	        data,
	        msg,
	        type:EXECUTE_SIDEBAR,
	      })
			}
    }
  });
console.log(contractId);
  var par1=param({
    "contractId": contractId+''
  })
  reqwest(
    api(url.executeQueryContent,par1)
  ).then((req) => {
    console.log(req)
    req.sesult = req.sesult ||  ''
  	var dd = eval('(' + req.result + ')');
    if (req.code==0) {
      conData=dd.ContractBody;
			if (conData.CreateTime.length==13) {
				var CreateTime=Number(conData.CreateTime)
				conData.CreateTime=moment(CreateTime).format("YYYY-MM-DD HH:mm:ss")
				var StartTime=Number(conData.StartTime)
				conData.StartTime=moment(StartTime).format("YYYY-MM-DD HH:mm:ss")
				var EndTime=Number(conData.EndTime)
				conData.EndTime=moment(EndTime).format("YYYY-MM-DD HH:mm:ss")
			}
      msg=req.msg;
      dispatch({
        conData,
        msg,
        type:EXE_SID_CON,
      })
    }
  });
}

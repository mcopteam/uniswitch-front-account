import reqwest from 'reqwest';
import {port,} from './port'
export  function api(urls,param,data) {
	param=param||{};
	data=data||'';
	// console.log(data, '--')
	// console.log(sessionStorage.token, '--==?-')
	console.log(reqwest.toQueryString(param))
	console.log(sessionStorage.token);
	return(
		{
			url: port+urls+'?'+reqwest.toQueryString(param),
			// url: 'http://localhost:8081/'+urls+'?'+reqwest.toQueryString(param),
			// url: 'http://172.17.7.166:8081/'+urls+'?'+reqwest.toQueryString(param),
			method: 'post',
			headers: {
		    	'token': sessionStorage.token,
		  },
			// contentType:'application/x-www-form-urlencoded',
			// contentType:'application/json',
			data:data,
			type: 'json',
		}
	)
}

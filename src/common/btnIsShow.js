export  function btnIsShow(btnList,btnKey) {
  var dispaly='';
  var arr=[]
  for (var i = 0; i < btnList.length; i++) {
    if (btnKey==btnList[i].buttonKey) {
      arr.push(btnList[i].buttonKey)
    }
  }
  if (arr.length==1) {
    dispaly=true;
  }else{
    dispaly=false;
  }
	return dispaly
}

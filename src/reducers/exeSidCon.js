export default (state = {
  conData:{},
  msg:'',
}, action) => {
  const {
    type,
    conData,
    msg,
    ...other,
  } = action
  switch(type){
    case 'EXE_SID_CON':
      return {
        ...other,
        conData,
        msg,
      }
    default:
      return state
  }
}

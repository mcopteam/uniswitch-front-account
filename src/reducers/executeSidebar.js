export default (state = {
  data:[],
  msg:'',
}, action) => {
  const {
    type,
    data,
    msg,
    ...other,
  } = action
  switch(type){
    case 'EXECUTE_SIDEBAR':
      return {
        ...other,
        data,
        msg,
      }
    default:
      return state
  }
}

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
    case 'PRODUCT_SIDEBAR':
      return {
        ...other,
        data,
        msg,
      }
    default:
      return state
  }
}

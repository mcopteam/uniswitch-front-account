export default (state = {
  priviFunList:[],
}, action) => {
  const {
    type,
    priviFunList,
    ...other,
  } = action
  switch(type){
    case 'ACTION_ROLE_LIMIT_FUN_LIST':
      return {
        ...other,
        priviFunList,
      }
    default:
      return state
  }
}

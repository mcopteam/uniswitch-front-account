export default (state = {
  recordList:[],
}, action) => {
  const {
    type,
    recordList,
    ...other,
  } = action
  switch(type){
    case 'ACCOUNT_RECORD':
      return {
        ...other,
        recordList,
      }
    default:
      return state
  }
}

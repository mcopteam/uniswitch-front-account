export default (state = {
  priviDataList:[],
}, action) => {
  const {
    type,
    priviDataList,
    ...other,
  } = action
  switch(type){
    case 'ACTION_ROLE_LIMIT_DATA_LIST':
      return {
        ...other,
        priviDataList,
      }
    default:
      return state
  }
}

export default (state = {
  preList:[],
}, action) => {
  const {
    type,
    preList,
    ...other,
  } = action
  switch(type){
    case 'PRE_LIST':
      return {
        ...other,
        preList,
      }
    default:
      return state
  }
}

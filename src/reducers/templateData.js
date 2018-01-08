export default (state = {
  templateDataList:{},
}, action) => {
  const {
    type,
    templateDataList,
    ...other,
  } = action
  switch(type){
    case 'QUERY_TEMPLATE_DATA':
      return {
        ...other,
        templateDataList,
      }
    default:
      return state
  }
}

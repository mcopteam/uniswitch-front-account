export default (state = {
  metaGategoryList:[],
}, action) => {
  const {
    type,
    metaGategoryList,
    ...other,
  } = action
  switch(type){
    case 'METADATA_CATEGORY_LIST':
      return {
        ...other,
        metaGategoryList,
      }
    default:
      return state
  }
}

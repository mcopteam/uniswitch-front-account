export default (state = {
  metaDataList:[],
}, action) => {
  const {
    type,
    metaDataList,
    ...other,
  } = action
  switch(type){
    case 'METADATA_DATA_LIST':
      return {
        ...other,
        metaDataList,
      }
    default:
      return state
  }
}

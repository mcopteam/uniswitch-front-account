export default (state = {
  assetList:[],
}, action) => {
  const {
    type,
    assetList,
    ...other,
  } = action
  switch(type){
    case 'ASSET_QUERY_LIST':
      return {
        ...other,
        assetList,
      }
    default:
      return state
  }
}

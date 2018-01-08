export default (state = {
  blockchainList:[],
}, action) => {
  const {
    type,
    blockchainList,
    ...other,
  } = action
  switch(type){
    case 'ACTION_BLOCKCHAIN_LIST':
      return {
        ...other,
        blockchainList,
      }
    default:
      return state
  }
}

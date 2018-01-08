export default (state = {
  blockchainOption:[],
}, action) => {
  const {
    type,
    blockchainOption,
    ...other,
  } = action
  switch(type){
    case 'ACTION_BLOCKCHAIN_OPTION':
      return {
        ...other,
        blockchainOption,
      }
    default:
      return state
  }
}

export default (state = {
  amount:'',
}, action) => {
  const {
    type,
    amount,
    ...other,
  } = action
  switch(type){
    case 'ASSET_QUERY_AMOUNT':
      return {
        ...other,
        amount,
      }
    default:
      return state
  }
}

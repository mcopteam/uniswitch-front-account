export default (state = {
  buttonList:[],
}, action) => {
  const {
    type,
    buttonList,
    ...other,
  } = action
  switch(type){
    case 'BUTTON_LIST':
      return {
        ...other,
        buttonList,
      }
    default:
      return state
  }
}

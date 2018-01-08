import {DETAIL_TEST} from '../actions/test'
export default (state = {
  count:11,
}, action) => {
  const {
    type,
    count,
    ...other,
  } = action
  switch(type){
    case DETAIL_TEST:
      return {
        ...other,
        count:count+1,
      }
    default:
      return state
  }
}

import {
    ACTION_BTN_LIST,
} from '../actions/reducers-type'

export default (state = {
    btnList: [],
}, action) => {
    const {
        type,
        btnList,
        ...other,
    } = action

    switch (type) {
        case ACTION_BTN_LIST:
            return {
                ...other,
                btnList,
            }
        default:
            return state
    }
}
import {
    ACTION_MENU_LIST,
} from '../actions/reducers-type'

export default (state = {
    menuList: [],
}, action) => {
    const {
        type,
        menuList,
        ...other,
    } = action

    switch (type) {
        case ACTION_MENU_LIST:
            return {
                ...other,
                menuList,
            }
        default:
            return state
    }
}
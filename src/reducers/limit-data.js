import {
    ACTION_DATA_LIST,
} from '../actions/reducers-type'

export default (state = {
    dataList: [],
}, action) => {
    const {
        type,
        dataList,
        ...other,
    } = action

    switch (type) {
        case ACTION_DATA_LIST:
            return {
                ...other,
                dataList,
            }
        default:
            return state
    }
}
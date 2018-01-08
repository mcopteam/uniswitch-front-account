import {
    ASSET_KEYPAIRS,
} from '../actions/asset-query'

export default (state = {
    keyPairs: [],
}, action) => {
    const {
        type,
        keyPairs,
        ...other,
    } = action

    switch (type) {
        case ASSET_KEYPAIRS:
            return {
                ...other,
                keyPairs,
            }
        default:
            return state
    }
}

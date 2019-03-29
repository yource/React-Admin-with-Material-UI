export default (state=[], action) => {
    switch (action.type) {
        case 'SET_VERSIONTAGS':
            return action.param;

        default:
            return state
    }
}
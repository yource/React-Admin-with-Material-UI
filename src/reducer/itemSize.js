export default (state={
    size:[],
    unit:[]
}, action) => {
    switch (action.type) {
        case 'SET_SIZE':
            return Object.assign({},state,{
                size:action.param
            });

        case 'SET_UNIT':
            return Object.assign({},state,{
                unit:action.param
            });

        default:
            return state
    }
}
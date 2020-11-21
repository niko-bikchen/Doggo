export const createReducer = ({reducers,initialState,ACTION_TYPES})=>{
    return (state = initialState, action) => {
        if(reducers[action.type]){
            return reducers[action.type]({state,...action})
        }else {
            return reducers[ACTION_TYPES.DEFAULT]({state})
        }
    }
}

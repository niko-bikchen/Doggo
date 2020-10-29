export const createReducer = ({reducers,initialState,ACTION_TYPES})=>{
    return (state = initialState, action) => {
        console.log("at "+action.type)
        if(reducers[action.type]){
            console.log(action)
            return reducers[action.type]({state,...action})
        }else {
            return reducers[ACTION_TYPES.DEFAULT]({state})
        }
    }
}

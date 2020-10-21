import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

let store

const initialState = {
    jwt:''
}
export const ACTION_TYPES = {
    TEST: 'TEST',
    DEFAULT: 'DEFAULT',
    SET_JWT: 'SET_JWT'
}
export const ACTIONS = {
    [ACTION_TYPES.TEST]:()=>({type:ACTION_TYPES.TEST}),
    [ACTION_TYPES.SET_JWT]:({jwt})=>({type:ACTION_TYPES.SET_JWT,jwt}),
    [ACTION_TYPES.DEFAULT]:()=>({type:ACTION_TYPES.DEFAULT}),
}
class Reducers{
    [ACTION_TYPES.TEST]({state}){
        console.log("test_action")
        return {...state}
    }
    [ACTION_TYPES.SET_JWT]({state,jwt}){
        console.log(jwt)
        return {...state,jwt}
    }
    [ACTION_TYPES.DEFAULT]({state}){
        return {...state}
    }
}
const reducers = new Reducers();
const reducer = (state = initialState, action) => {
    console.log("at "+action.type)
    if(reducers[action.type]){
        console.log(action)
        return reducers[action.type]({state,...action})
    }else {
        return reducers[ACTION_TYPES.DEFAULT]({state})
    }

}

function initStore(preloadedState = initialState) {
    return createStore(
        reducer,
        preloadedState,
        composeWithDevTools(applyMiddleware())
    )
}

export const initializeStore = (preloadedState) => {
    let _store = store ?? initStore(preloadedState)

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        })
        // Reset the current store
        store = undefined
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
    // Create the store once in the client
    if (!store) store = _store

    return _store
}

export function useStore(initialState) {
    const store = useMemo(() => initializeStore(initialState), [initialState])
    return store
}

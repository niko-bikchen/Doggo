import { useMemo } from 'react'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
let index
import {jwtReducer} from "./jwt"
import {marketplaceReducer} from "./marketplace_store";


function initStore(preloadedState = {}) {
    return createStore(
        combineReducers({jwt:jwtReducer,marketplace:marketplaceReducer}),
        preloadedState,
        composeWithDevTools(applyMiddleware(thunk))
    )
}

export const initializeStore = (preloadedState={}) => {
    let _store = index ?? initStore(preloadedState)

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && index) {
        _store = initStore({
            ...index.getState(),
            ...preloadedState,
        })
        // Reset the current store
        index = undefined
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
    // Create the store once in the client
    if (!index) index = _store

    return _store
}

export function useStore(initialState) {
    const store = useMemo(() => initializeStore(), [])
    return store
}

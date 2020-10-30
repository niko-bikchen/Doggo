import {createReducer} from "../lib/redux";
import gql from "graphql-tag";
import Client from "../lib/apollo"

export const initialState = {
    dogwalkers: new Array()
}
export const ACTION_TYPES = {
    TEST: 'TEST',
    DEFAULT: 'DEFAULT',
    SET_DOGWALKERS: 'SET_DOGWALKERS',
    FETCH_DOGWALKERS: 'FETCH_DOGWALKERS'
}


const QUERY = gql`
    query{
        dogwalkers{
            name,
            avatar{
                url
            },
            contacts{
                type,
                value
            },
            region{
                lat,
                lng,
                radius,
                name
            }
        }
    }
`

export const ACTIONS = {
    [ACTION_TYPES.DEFAULT]:()=>({type:ACTION_TYPES.DEFAULT}),
    [ACTION_TYPES.TEST]:()=>({type:ACTION_TYPES.TEST}),
    [ACTION_TYPES.SET_DOGWALKERS]:({dogwalkers})=>({type:ACTION_TYPES.SET_DOGWALKERS,dogwalkers}),
    [ACTION_TYPES.FETCH_DOGWALKERS]: ()=>{
        return (dispatch)=>{
            Client.query({query:QUERY}).then(({data})=>{
                dispatch(ACTIONS[ACTION_TYPES.SET_DOGWALKERS]({...data}))
            })
        }
    }

}
class Reducers{
    [ACTION_TYPES.TEST]({state}){
        return {...state}
    }
    [ACTION_TYPES.SET_DOGWALKERS]({state,dogwalkers}){
        return {...state,dogwalkers}
    }
    [ACTION_TYPES.DEFAULT]({state}){
        return {...state}
    }
}
const reducers = new Reducers();
export const marketplaceReducer = createReducer({reducers, initialState, ACTION_TYPES})

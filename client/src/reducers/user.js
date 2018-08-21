import {UPDATE_USER_LIST} from '../constants';
const initialState = {
    users: []
}

export function user(state = initialState, action){
    switch(action.type){
        case UPDATE_USER_LIST:
            return Object.assign({}, state, {
                users: action.users
            })
        default:
            return state
    }
    return state;
}
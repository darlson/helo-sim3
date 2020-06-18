import axios from 'axios'

const initialState = {
    user: {
        username: '',
        profilePic: '',
        userId: 0
    },
    isLoggedIn: false
}

const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'
const GET_USER = 'GET_USER'
// const UPDATE_PW = 'UPDATE_PW'

export function loginUser(user) {
    return {
        type: LOGIN_USER,
        payload: user
    }
}

export function logoutUser(user) {
    return {
        type: LOGOUT_USER,
        payload: initialState
    }
}

export function getUser() {
    const user = axios.get('/auth/user')
    return {
        type: GET_USER,
        payload: user
    }
}

// export function updatePass() {
//     const newPass = axios.put('/auth/update')
//     return {
//         type: UPDATE_PW,
//         payload: newPass
//     }
// }

export default function (state = initialState, action) {
    switch(action.type) {
        case LOGIN_USER:
            return {...state, user: action.payload, isLoggedIn: true}
        case LOGOUT_USER:
            return {...state, ...action.payload}
        case GET_USER + '_PENDING':
            return state
        case GET_USER + '_FULFILLED':
            return {...state, user: action.payload.data, isLoggedIn: true}
        case GET_USER + '_REJECTED':
            return initialState
        // case UPDATE_PW:
        //     return {...state, ...action.payload}
        default:
            return initialState
    }
}
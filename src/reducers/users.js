import {RECEIVE_USERS, UPDATE_USER} from "../actions/users";

export default function users ( state = {}, action) {

    switch (action.type) {

        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
        }
        case UPDATE_USER:
            const { author , id } = action.question
            return {
                ...state,
                [author]: {
                    ...state[author],
                    questions: state[author].questions.concat([id])
                }
        }
        default:
            return state
    }
}
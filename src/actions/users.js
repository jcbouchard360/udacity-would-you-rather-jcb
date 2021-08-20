export const RECEIVE_USERS = 'RECEIVE_USERS'
export const UPDATE_USER_ANSWER = 'UPDATE_USER_ANSWER'
export const UPDATE_USER_QUESTION = 'UPDATE_USER_QUESTION'

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}

export function updateUserQuestion(question) {
    return {
        type: UPDATE_USER_QUESTION,
        question,
    }
}

export function updateUserAnswer(authedUser, qid, answer) {
    return {
        type: UPDATE_USER_ANSWER,
        authedUser,
        qid,
        answer
    }
}

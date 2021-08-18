import { getInitialData , saveQuestion } from '../utils/api'
import { addQuestion , receiveQuestions } from "./questions";
import { receiveUsers , updateUser } from "./users";
import { setAuthedUser } from "./authedUser";
import { showLoading , hideLoading } from "react-redux-loading";

const AUTHED_ID = 'davidhasselhoff'

/**
 * call the data from the DB
 * then, dispatch the actions passing the data
 */
export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({users , questions} ) => {
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
                dispatch(setAuthedUser(AUTHED_ID))
                dispatch(hideLoading())
            })
    }
}

export function handleAddQuestion(question) {
    return (dispatch) => {
        dispatch(showLoading())
        return saveQuestion(question)
            .then((question) => {
                dispatch(updateUser(question))
                dispatch(addQuestion(question))
                dispatch(hideLoading())
            })
    }
}
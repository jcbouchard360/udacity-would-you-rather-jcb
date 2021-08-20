import {hideLoading, showLoading} from "react-redux-loading";
import {saveQuestion , saveQuestionAnswer} from "../utils/api";
import {updateUserQuestion , updateUserAnswer} from "./users";

export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'

export function answerQuestion(authedUser, qid, answer) {
    return {
        type: ANSWER_QUESTION,
        authedUser,
        qid,
        answer
    }
}

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

export function handleAddQuestion(question) {
    return (dispatch) => {
        dispatch(showLoading())
        return saveQuestion(question)
            .then((question) => {
                dispatch(updateUserQuestion(question))
                dispatch(addQuestion(question))
                dispatch(hideLoading())
            })
    }
}

export function handleAnswerQuestion(authedUser, qid , answer) {
    return (dispatch) => {
        dispatch(showLoading())
        return saveQuestionAnswer( {
                authedUser,
                qid,
                answer}
            )
            .then(() => {
                dispatch(answerQuestion(authedUser, qid , answer))
                dispatch(updateUserAnswer(authedUser, qid , answer))
                dispatch(hideLoading())
            })
    }
}

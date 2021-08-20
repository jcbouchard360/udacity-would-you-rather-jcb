import React, { Component } from 'react'
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'
import ProgressBar from "@ramonak/react-progress-bar";
import {handleAnswerQuestion} from "../../actions/questions";

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: ""
        };
    }
    handleOptionChange = (e) => {
        this.setState({
            answer: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault()
        const { answer } = this.state
        const { dispatch, authedUser , qid } = this.props

        dispatch(handleAnswerQuestion(authedUser.id, qid , answer))

           this.setState(() => ({
               answer: ''
           }))
    }

    isDisabled = () => {
        return this.state.answer === ''
    }

    render() {
        const { answer } = this.state
        const { authedUser, question, users , qid } = this.props

        if(!question) return <Redirect to='/404'/>

        const opt1length = question.optionOne.votes.length
        const opt2length = question.optionTwo.votes.length
        const totalNbAnswers = opt1length + opt2length


        return (
            <div>
                <div style={{border: "1px solid black" }}>
                    <div style={{background: "deeppink"}}>
                        {users[question['author']].name} asked
                    </div>
                    <div style={{display: "flex"}}>
                        <div>
                            <img src={users[question['author']].avatarURL} alt={users[question['author']].name}/>
                        </div>

                        {authedUser.answers[qid]
                            ? <div>
                                <h2>Results</h2>
                                <div>
                                    {question['optionOne'].text}
                                    {authedUser.answers[qid] === 'optionOne' && <span> YOUR ANSWER</span>}
                                    <br/>
                                    {opt1length} out of {totalNbAnswers} votes
                                    <br/>
                                    <ProgressBar bgColor="deeppink" completed={Math.round(opt1length / totalNbAnswers * 100)} />
                                </div>
                                <br/>
                                <div>
                                    {question['optionTwo'].text}
                                    {authedUser.answers[qid] === 'optionTwo' && <span> YOUR ANSWER</span>}
                                    <br/>
                                    {opt2length} out of {totalNbAnswers} votes
                                    <br/>
                                    <ProgressBar bgColor="deeppink" completed={Math.round(opt2length / totalNbAnswers * 100)} />
                                </div>
                                <br/>
                            </div>
                            :  <div>
                                <h2>Would You Rather</h2>
                                <form onSubmit={this.handleSubmit}>
                                    <input type="radio"
                                           id="optionOne"
                                           name="options"
                                           checked={answer === "optionOne"}
                                           onChange={this.handleOptionChange}
                                           value="optionOne"/>
                                    <label htmlFor="optionOne">{question.optionOne.text}</label>
                                    <br/>
                                    or
                                    <br/>
                                    <input type="radio"
                                           id="optionTwo"
                                           name="options"
                                           checked={answer === "optionTwo"}
                                           onChange={this.handleOptionChange}
                                           value="optionTwo"/>
                                    <label htmlFor="optionTwo">{question.optionTwo.text}</label>
                                    <br/>
                                    <br/>
                                    <button className='btn'
                                            type='submit'
                                            disabled={this.isDisabled()}>
                                        submit
                                    </button>
                                </form>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}



function mapStateToProps({ authedUser, questions, users }, props) {
    const { id } = props.match.params

    return {
        authedUser: users[authedUser],
        qid: id,
        question : questions[id]
            ? questions[id]
            : null,
        users

    }
}

export default connect(mapStateToProps)(Question)

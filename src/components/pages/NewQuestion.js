import React, { Component } from 'react'
import {connect} from "react-redux";
import { handleAddQuestion } from "../../actions/shared";
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {

    state = {
        question: {
            optionOneText: '',
            optionTwoText: '',
            author: this.props.authedUser
        },
        toHome: false
    }

    handleChange =(e) => {
        const { name, value } = e.target;

        this.setState(currState => ({
            ...currState,
            question: {
                ...currState.question,
                [name]: value,
            },
        }));
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { question } = this.state
        const { dispatch } = this.props

        dispatch(handleAddQuestion(question))

        this.setState(() => ({
            optionOneText: '',
            optionTwoText: '',
            toHome: true
        }))
    }

    isDisabled = () => {
        const { optionOneText, optionTwoText } = this.state.question
        return optionOneText !== '' && optionTwoText !== ''
    }

    render() {
        const { toHome } = this.state
        const { optionOneText, optionTwoText } = this.state.question

        if(toHome === true ) {
            return <Redirect to='/'/>
        }

        return (
          <div>
             <h1>NewQuestion</h1>
              <form onSubmit={this.handleSubmit}>
                  <input type="text" name="optionOneText" value={optionOneText} placeholder="Question One" onChange={this.handleChange} />
                  <input type="text" name='optionTwoText' value={optionTwoText} placeholder="Question Two" onChange={this.handleChange} />

                  <button className='btn'
                          type='submit'
                          disabled={!this.isDisabled()}>
                      submit
                  </button>
              </form>
          </div>
        )
    }
}



function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(NewQuestion)

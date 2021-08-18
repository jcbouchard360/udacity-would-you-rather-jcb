import React, { Component } from 'react'
import { connect } from "react-redux";

import { withRouter } from 'react-router-dom'


class QuestionPreviewCard extends Component {

    toDetail = (e, id) => {
        e.preventDefault()
        this.props.history.push(`/question/${id}`)
    }
    render() {
        const { question } = this.props

        return (
          <div>
             <h1>{question.optionOne.text} TEXTE PREVIEW</h1>
              <button onClick={(e) => this.toDetail(e, question.id)}>
                  to this Question
              </button>
          </div>

        )
    }
}

function mapStateToProps ({authedUser}) {
    return {
        authedUser
    }
}

export default withRouter(connect(mapStateToProps)(QuestionPreviewCard))

import React, { Component } from 'react'
import {connect} from "react-redux";


class Leaderboard extends Component {

    render() {
        const { users } = this.props
        return (
          <div>
             <h1>Leaderboard</h1>
              <ol>
                  {users.map((user) => (
                      <li key={user.id}>
                          {user.name}
                          <br/>
                          nb Answers: {Object.keys(user.answers).length}
                          <br/>
                          nbQuestions: {user.questions.length}
                          <br/>
                          total: {user.questions.length + Object.keys(user.answers).length}
                      </li>
                  ))}
              </ol>
          </div>
        )
    }
}



function mapStateToProps({ users }) {

    const sortedUsers = Object.values(users).sort((a, b) => (b.questions.length + Object.keys(b.answers).length) - (a.questions.length + Object.keys(a.answers).length) )

    return {
        users: sortedUsers
    }
}

export default connect(mapStateToProps)(Leaderboard)
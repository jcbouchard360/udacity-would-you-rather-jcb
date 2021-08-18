import React, { Component  } from 'react'
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import {setAuthedUser} from "../actions/authedUser";

class Nav extends Component {
    constructor(props) {
        super(props);

        this.clearAuthedUser = this.clearAuthedUser.bind(this)
    }

    clearAuthedUser() {
        const { dispatch } = this.props
        dispatch(setAuthedUser(''))
    }

    render() {
        const { authedUser } = this.props
        return (
          <nav>
              <ul>
                  <li><Link className="close-search" to="/">Home</Link></li>
                  <li><Link className="close-search" to="/new">New Question</Link></li>
                  <li><Link className="close-search" to="/leaderboard">Leaderboard</Link></li>
              </ul>

             {authedUser &&
                 <ul>
                     <li>
                         <img src={authedUser.avatarURL} alt={authedUser.name}/>
                         {authedUser.name}
                     </li>
                     <li>
                         <Link to='/' onClick={this.clearAuthedUser}>Log Out</Link>
                     </li>
                 </ul>
             }
          </nav>
        )
    }
}

function mapStateToProps({authedUser , users}) {
    return {
        authedUser: users[authedUser]
            ? users[authedUser]
            : null
    }
}

export default connect(mapStateToProps)(Nav)
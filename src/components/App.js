import React, { Component , Fragment } from 'react'
import { BrowserRouter as Router, Route , Switch} from "react-router-dom";
import { connect} from "react-redux";
import Home from "./pages/Home";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading";
import Nav from "./Nav";
import NewQuestion from "./pages/NewQuestion";
import Question from "./pages/Question";
import Page404 from "./pages/Page404";
import {setAuthedUser} from "../actions/authedUser";
import Leaderboard from "./pages/Leaderboard";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {optionValue: this.props.authedUser};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { dispatch  } = this.props
        const { optionValue } = this.state

        optionValue !== '' && dispatch(setAuthedUser(optionValue))
    }

    handleChange(event) {
        this.setState({optionValue: event.target.value});
    }

    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        const { authedUser , users } = this.props
        const { optionValue } = this.state

        return (
            <Router>
                <Fragment>
                    <LoadingBar/>
                    {this.props.loading === true
                        ? null
                        : <div>
                            <Nav />
                            {authedUser !== ''
                                ?
                                <Switch>
                                    <Route path='/' exact component={Home} />
                                    <Route path='/question/:id' component={Question} />
                                    <Route path='/new' component={NewQuestion} />
                                    <Route path='/leaderboard' component={Leaderboard} />
                                    <Route path='*' component={Page404} />
                                </Switch>
                                : <div>LOG IN
                                    <form onSubmit={this.handleSubmit}>
                                        <select value={optionValue} onChange={this.handleChange}>
                                            <option value=''>Select a User</option>
                                            {users.map((user) => (
                                                <option value={user.id} key={user.id}>{user.name}</option>
                                            ))}
                                        </select>
                                        <button type="submit" >Submit</button>
                                    </form>
                                </div>
                            }
                        </div>
                    }
                </Fragment>
            </Router>
        )
    }
}

function mapStateToProps({ authedUser , users }) {
    return {
        loading: authedUser === null,
        users: Object.values(users),
        authedUser
    }
}

export default connect(mapStateToProps)(App)
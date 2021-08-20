import React, { Component } from 'react'
import { connect } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import QuestionPreviewCard from "../cards/QuestionPreviewCard";

class Home extends Component {
    render() {
        const { answeredQuestions , unansweredQuestions} = this.props
        return (
            <div>
                <h1>home</h1>
                <div>

                    <Tabs>
                        <TabList>
                            <Tab>Show Unanswered Questions</Tab>
                            <Tab>Show Answered Questions</Tab>
                        </TabList>

                        <TabPanel>
                            <h2>Unanswered Questions</h2>
                            <ul>
                                {unansweredQuestions.map((question) => (
                                    <li key={question.id}>
                                        <QuestionPreviewCard question={question}/>
                                    </li>
                                ))}
                            </ul>
                        </TabPanel>
                        <TabPanel>
                            <h2>Answered Questions</h2>
                            <ul>
                                {answeredQuestions.map((question) => (
                                  <li key={question.id}>
                                        <QuestionPreviewCard question={question}/>
                                    </li>
                                ))}
                            </ul>
                        </TabPanel>
                    </Tabs>

                </div>
            </div>
        )
    }
}

function mapStateToProps({authedUser , questions , users }) {
    const questionsArray = Object.values(questions)
    const answeredQuestions = questionsArray.filter((q) => q.optionOne.votes.includes(authedUser) || q.optionTwo.votes.includes(authedUser) )
    const unansweredQuestions = questionsArray.filter((q) => !q.optionOne.votes.includes(authedUser)  && !q.optionTwo.votes.includes(authedUser)).sort((a, b) => b.timestamp - a.timestamp);

    return {
        authedUser,
        answeredQuestions: answeredQuestions,
        unansweredQuestions: unansweredQuestions,
        users
    }
}

export default connect(mapStateToProps)(Home)
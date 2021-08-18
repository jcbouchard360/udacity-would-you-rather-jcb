let users = {
  davidhasselhoff: {
    id: 'davidhasselhoff',
    name: 'David Hasselhoff',
    avatarURL: 'https://pbs.twimg.com/profile_images/3592562573/0ca35e79efb32e39fa73aff7562a4bb6_200x200.jpeg',
    answers: {
      "8xf0y6ziyjabvozdd253nd": 'optionOne',
      "6ni6ok3ym7mf1p33lnez": 'optionTwo',
      "am8ehyc8byjqgar0jgpub9": 'optionTwo',
      "loxhs1bqm25b708cmbf3g": 'optionTwo'
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
  },
  boygeorge: {
    id: 'boygeorge',
    name: 'Boy George',
    avatarURL: 'https://static2.greatsong.net/artiste/96x96/boy-george-187739.jpg',
    answers: {
      "vthrdm985a262al8qx3do": 'optionOne',
      "xj352vofupe1dqz9emx13r": 'optionTwo',
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
  },
  vinceneil: {
    id: 'vinceneil',
    name: 'Vince Neil',
    avatarURL: 'https://i.pinimg.com/236x/1f/d7/ef/1fd7ef0f05eb16bb47e33be22086bc57--fan-girl-vince-neil.jpg',
    answers: {
      "xj352vofupe1dqz9emx13r": 'optionOne',
      "vthrdm985a262al8qx3do": 'optionTwo',
      "6ni6ok3ym7mf1p33lnez": 'optionTwo'
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
  }
}

let questions = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'davidhasselhoff',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['davidhasselhoff'],
      text: 'drive KITT',
    },
    optionTwo: {
      votes: [],
      text: 'date Pamela Anderson'
    }
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'vinceneil',
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: 'do cocaine',
    },
    optionTwo: {
      votes: ['vinceneil', 'davidhasselhoff'],
      text: 'get drunk'
    }
  },
  "am8ehyc8byjqgar0jgpub9": {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 'davidhasselhoff',
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: 'be an actor',
    },
    optionTwo: {
      votes: ['davidhasselhoff'],
      text: 'be a singer'
    }
  },
  "loxhs1bqm25b708cmbf3g": {
    id: 'loxhs1bqm25b708cmbf3g',
    author: 'boygeorge',
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: 'be in a boy band',
    },
    optionTwo: {
      votes: ['davidhasselhoff'],
      text: 'be a drag queen'
    }
  },
  "vthrdm985a262al8qx3do": {
    id: 'vthrdm985a262al8qx3do',
    author: 'boygeorge',
    timestamp: 1489579767190,
    optionOne: {
      votes: ['boygeorge'],
      text: 'have pink hair',
    },
    optionTwo: {
      votes: ['vinceneil'],
      text: 'be a 80s legend'
    }
  },
  "xj352vofupe1dqz9emx13r": {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'vinceneil',
    timestamp: 1493579767190,
    optionOne: {
      votes: ['vinceneil'],
      text: 'party all day, every day',
    },
    optionTwo: {
      votes: ['boygeorge'],
      text: 'write cheesy/happy song'
    }
  },
}

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function _getUsers () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...users}), 1000)
  })
}

export function _getQuestions () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...questions}), 1000)
  })
}

function formatQuestion ({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    }
  }
}

export function _saveQuestion (question) {
  return new Promise((res, rej) => {
    const authedUser = question.author;
    const formattedQuestion = formatQuestion(question);

    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion
      }

      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          questions: users[authedUser].questions.concat([formattedQuestion.id])
        }
      }

      res(formattedQuestion)
    }, 1000)
  })
}

export function _saveQuestionAnswer ({ authedUser, qid, answer }) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          answers: {
            ...users[authedUser].answers,
            [qid]: answer
          }
        }
      }

      questions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([authedUser])
          }
        }
      }

      res()
    }, 500)
  })
}

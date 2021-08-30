# Would you Rather Project

This is an App the put statuses on different books

## TL;DR

* install all project dependencies with `npm install`
* start the development server with `npm start`

## What You're Getting
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
│   ├── actions
│     ├── autherUser.js # autherUser related actions
│     ├── questions.js # questions related actions
│     ├── shared.js # shared related actions
│     └── users.js # user related actions
│   ├── components
│     ├── cards
│       ├── QuestionCards.js # a question card, with the answer or the form to answer it
│       ├── QuestionPreviewCard.js # a preview of a question card
│       └── UserCard.js # user card
│     └── pages
│       ├── Home.js # home page
│       ├── Leaderboard.js # leader board page
│       ├── NewQuestion.js # add a question page
│       ├── Page404.js # 404 page
│       └── Question.js # selected question page
│     ├── App.js # This is the root of your app.
│     └── Nav.js # navigation
│   ├── middleware
│     ├── index.js # The file where you apply the middlewares
│     └── logger.js # the logger middleware
│   ├── reducers
│     ├── authedUser.js # autherUser related reducers
│     ├── index.js # reducers combiner
│     ├── questions.js # questions related reducers
│     └── users.js # user related reducers
│   ├── utils
│     ├── _DATA.js # the data
│     └── api.js # the api to retrieve the data
│   └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

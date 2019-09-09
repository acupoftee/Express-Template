<p align="center">
<img src="https://expressjs.com/images/express-facebook-share.png" alt="Express API Template" title="Express API template">
<br>
Express API Template
</p>

> Boilerplate code for building non authenticated REST API's with Node, Express, and MongoDB.

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## Table of Contents
  - [Getting Started](#getting-started)
  - [Structure](#structure)
      - [`app`](#app)
      - [`config`](#config)
      - [`curl-scripts`](#curl-scripts)
      - [`lib`](#lib)
      - [`test`](#test)
  - [NPM Tasks](#npm-tasks)
   
## Getting Started 
1. [Download](https://github.com/acupoftee/Express-Template/archive/master.zip) template.
2. Move the .zip folder to your desired directory. If the folder is already unzipped, you can move the folder to another directory using `mv`.
3. Rename the directory from `Express-Template` -> `your-app-name`.
4. Replace all instances of `express-template` with your app name.
5. Install dependencies using `npm install`.
6. Test the API template by running `npm run server` OR `nodemon server.js`

## Structure
```
├── app
│   ├── middleware
│   │   └── removeBlankFields.js
│   ├── models
│   │   └── example.js
│   └── routes
│       ├── example_routes.js
│       └── example_routes_async.js
├── config
│   └── db.js
├── curl-scripts
│   └── examples
│       ├── create.sh
│       ├── destroy.sh
│       ├── index.sh
│       ├── show.sh
│       └── update.sh
├── lib
│   ├── customErrors.js
│   ├── errorHandlers.js
│   └── requestLogger.js
├── package-lock.json
├── package.json
├── server.js
└── test
    └── example.js
```

The main files you'll only need to interact with are in `app/models`, `app/routes`, `app/middleware` if your routes depend on them, and [`server.js`](server.js)

[`config/db.js`](/config/db.js) only needs to be edited once which is to change `express-template` to the name of your app.

### `app`
The `app` directory stores models, routes, and middleware needed to build an API.
- `models` stores Mongoose models. Refer to [`example.js`](/app/models/example.js) for a basic Mongoose model pattern. 
- `routes` stores resource routes for API models. Models should be imported into their respective route files stored here. Refer to [`example_routes.js`](/app.routes/example_routes.js) for a basic route pattern, or [`example_routes_async.js`](/app/routes/example_routes_async.js) for an async pattern.
- `middleware` stores helper functions specifically for routes. 

### `config`
This directory stores the URI for the database depending on the environemnt. 

If this is deployed to a Heroku production environment, it will use that URL.

### `curl-scripts`
This should hold curl scripts for your custom API. The `examples` directory has script templates for testing `GET`, `POST`, `PATCH`, and `DELETE` for the example resource.

### `lib`
This holds code to assist with logging and error handling used by the rest of the template. 
- [`customErrors.js`](/lib/customErrors.js) has custom Error classes. You can add your own custom error classes here if needed. the function `handle404` is used to check errors in other parts of the template. 
- [`errorHandlers.js`](/lib/errorHandlers.js) has a function that's used in all `next()`  in your routes. It sets the response code corresponding to the error thrown.

### `test`
This holds unit tests for your API. This uses Mocha for a test suite with the Chai assertion library. Refer to [`example.js`](/test/example.js) for a unit test template. 


## NPM Tasks
| Command                | Result                                                                                                      |
|------------------------|-------------------------------------------------------------------------------------------------------------|
| `npm run server`       | Starts a development server with `nodemon` in the port specified in `server.js`. This refeshes automaticaly when you change something in the code.|
| `npm test`             | Runs automated tests.                                                                                       |
| `npm run lint` | Runs JS Standard linter and outputs errors. |

* * * 
If you have any questions, comments, bugs, etc, please feel free to make a pull request! Good luck and have fun!
# InfinityBoards

## Purpose/Description

This project aims to develop an innovative customizable virtual board game platform that allows users to personalize and play their favorite board games online. The platform offers unique design templates that enhance the digital gaming experience without altering the original rules. It addresses the need for customization and diversity in virtual board games by overcoming the limitations of standard designs and facilitating access to online games without the barriers of physical distance.

link to the [project](https://proyectofservs.onrender.com/)

## How tu run the project

install dependencies

    npm install

- **To start project**:

        npm start
        https//localhost:3000

- **To start project in development mode**:

        npm run dev
        https//localhost:3000

- **To run tests**:

        npm test

## How to contribute

- **Repo/Folder structure**: [MVC pattern](https://developer.mozilla.org/en-US/docs/Glossary/MVC)

  - src
    - Controllers
    - Middlewares
    - Models
    - Routes
    - types
    - Utils
    - Views
  - public
    - styles
    - scripts

- **Tools**:
  - Typescript
  - Jest
  - HTML
  - CSS
  - JavaScript
  - Handlebars
  - Express
  - Socket.io
  - Mongoose
  - Amazon S3
  - passport
  - swagger
  - MongoDB
- **Requirements**:

  - Node.js
  - Git
  - Python: Pre-commit, we recommend to use a virtual environment

        pip install pre-commit

  - virtual environment

        python -m venv .venv

        # Windows
        source .venv/script/activate

        # Linux and MacOS
        source .venv/bin/activate

  - Repository permissions (To ask for permissions contact a code owner)

### Contribution Process

- **Commit**:

  - Use of the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)
  - Recommended to use the [gitmoji](https://gitmoji.dev/) to make the commits more readable
  - If vs code is used, the [Conventional Commits](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits) extension is recommended

- **Pull request creation**:

  - To merge something to the branches it is needed to create a pull request and that pull request have to pass all the checks and minimum one review
  - The new created branches needs to be name after the feature that is going to be working in that branch

- **Checks/Tests**:

  - conventional commits
  - Danger
  - Pre-commit
  - Tests

- **Release process**:

  - Main (Develop): This branch is going to be use for the general development of the project
  - Deploy: This branch its the main versioning for the main app

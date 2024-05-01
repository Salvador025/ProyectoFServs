# InfinityBoards

## Purpose/Description

This project aims to develop an innovative customizable virtual board game platform that allows users to personalize and play their favorite board games online. The platform offers unique design templates that enhance the digital gaming experience without altering the original rules. It addresses the need for customization and diversity in virtual board games by overcoming the limitations of standard designs and facilitating access to online games without the barriers of physical distance.

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

  - Controllers
  - Middlewares
  - Routes
  - Utils
  - Models

- **Tools**:
  - Typescript
  - Jest
  - HTML
  - CSS
  - JavaScript
  - Handlebars
  - MongoDB
- **Requirements**:

  - Node.js
  - Git
  - Python: Pre-commit

        pip install pre-commit

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
  - Linter
  - Pre-commit
- **Release process**:
  - Main (Develop): This branch is going to be use for the general development of the project
  - Test: This branch is going to be use for the system test so it enables the merge to production
  - Production: This branch its the main versioning for the main app

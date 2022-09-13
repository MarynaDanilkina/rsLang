# RS-Lang (RS School team task)

"RS Lang" is application for learning english. It consist from textbook, mini-games for studing words and statistics page which save your individual progress.

### Deployment:
https://rslang-pavelkizhlo.netlify.app/

### Server deployment:
https://rs-lang-kdz.herokuapp.com

### Available scripts
- `npm start` - Runs the app in the development mode. Open http://localhost:8080 to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

- `npm build` - Builds the app for production to the build folder. It correctly bundles typescript in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.

- `npm lint` - Run formatting and linting of project with eslint. Check for, fix and lint errors by running.

### App structure
- Main page
- Team page
- Textbook
  - 6 sections with words divided by difficulty (30 pages for each section)
- "Audiocall" game
  - you able to choose one from 6 difficulty levels (if you go from main page)
  - you can play only given levrl (if you go from specific level of textbook)
- "Sprint" game
  - you able to choose one from 6 difficulty levels (if you go from main page)
  - you can play only given levrl (if you go from specific level of textbook)
- Statistics 
- Authorization
  - enter form
  - registration form

### Sourse data
Collection "4000 essential English words" contains 3600 frequently used English words. The words in the collection are sorted from simpler and more famous to more complex. The first 400 most frequently used words were not included in the collection. It is believed that this is the basic stock of an adult left over from school / university or previous attempts to learn a language. The words are divided into groups of 20 words. The whole collection is divided into six parts of 600 words each

### Technologies used in project
- `Webpack` (for project bundling)
- `TypeScript` (for strict type checking and minimizing possible errors)
- `SASS` (for speed up work with styles)
- `Eslint` (for writing code according specified rules)
- `Prettier` (for writing code according specified codeguide)
- Heroku (for deploying of given server app)
- Netlify (for automatic project deploy during development)
- GitHub Projects (for tasks distribution and tracking the process of their realization by all contributors)
- Discord (for discussion work issues, sharing useful materials and tasks planning)
- Microsoft Teams (for calls and meetings)

### Workflow organizing
Working application was located in the branch `develop`, to which the contributors made a Pull Requests. For PR verification agreement of all participants were needed. Development realized by working in different branches using `git`.

- GitGraph screenshot:

<img width="550" alt="Снимок экрана 2022-09-13 в 23 50 54" src="https://user-images.githubusercontent.com/94741768/190006911-864b8407-5dca-4a95-9fbe-f617f33237f9.png">

- RACI Matrix:

<img width="841" alt="Снимок экрана 2022-09-14 в 01 06 23" src="https://user-images.githubusercontent.com/94741768/190017860-5c61dab8-c725-4edd-af5f-2003ac950656.png">

- Kanban board in GitHub Projects:

<img width="750" alt="Снимок экрана 2022-09-13 в 23 57 59" src="https://user-images.githubusercontent.com/94741768/190009756-2e76dce2-db9f-45f9-9714-a107ffd81961.png">

- Discord server:

<img width="750" alt="Снимок экрана 2022-09-13 в 23 58 53" src="https://user-images.githubusercontent.com/94741768/190009843-f23d4c14-6ab8-483c-87e2-38d95f052f55.png">


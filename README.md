# Spotifiuby Backoffice Admin

---
* [Project Set Up](#project-set-up)
* [Available Scripts](#available-scripts)
    * [start](#npm-start)
    * [test](#npm-test)
    * [build](#npm-run-build)
    * [start-prod](#npm-run-start-prod)
    * [eject](#npm-run-eject)
* [Run App Locally](#run-app-locally)
* [Learn More](#learn-more)

---
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Set Up

To set up the environment you should follow this steps:

1. Run `npm install`
2. Add file `.env.local` at project root with following environment variables:
    ```
    REACT_APP_SERVER_BASE_URI=http://localhost:8080
    GATEWAY_URI=<GATEWAY_URI>
    REACT_APP_GATEWAY_URI=<GATEWAY_URI>
    REACT_APP_FIREBASE_API_KEY=<FIREBASE_APP_API_KEY>
    REACT_APP_FIREBASE_APP_ID=<FIREBASE_APP_ID>
    ```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run start-prod`

Runs the app in the production mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

The page will not reload when you make changes.\
This will start the app using local environment variables, for production you may add `NODE_ENV=production` to load production environment variables.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Run App Locally

Before this, make sure you already did the [project set up](#project-set-up). Now, if everything is settle up you can start the local app by doing the next steps:

1. Run `npm run start-dev` to start local dev server.
2. Run `npm run start` to start react ui app.
3. Go to [localhost:3000](http://localhost:8080) to start navigating through the app.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

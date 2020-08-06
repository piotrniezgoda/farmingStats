
# Farming Stats



## Overview

Farming stats is a web application created for a quick check basic stats from farming simulator server. Together with friends have wanted to have a possibility to see stats without open the game and joining to server.



## How does it works?



the assumption was simple - Using API delivered by game developers, I'd have access to XML files which contains server settings and current state of the server like online players, money, owned vehicles etc. Then I'd add some style and would display these data. But it's more complicated, the app is using backend server written in node.js + express for access the API data without mixed-content-error.



## Tech stack

For developing this project I'm using:

- React(light, fast, very helpful), with React Router. I'm using React Create App.
- Node.js + express
- Figma(the design has been created by me)
- Netlify for hosting the front-end
- Heroku for hosting the backend



## Encountered problems

Like always problems and bugs must make life difficult, this app isn't an exception. What is/was the biggest problems?

-  [x] [solved] API http protocol - The game developer provides API by HTTP protocol. I use the Netlify hosting which uses https protocol. Fetching data causes the mixed content error. Problem solved by using a backend server which sends requests to the API. My web application requests the node.js backend server and retrieves the stats data.



## how to fire up this app?

Visit [FarmStatsApp](https://farmstats.netlify.app/) or, clone this repository and run it locally.



### `git clone https://github.com/piotrniezgoda/farmingStats.git`

### `npm start`



Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) at the browser.



The page will reload automatically if you do any changes.



### `npm run build`



Builds the app for production to the `build` folder.<br />

It correctly bundles React in production mode and optimizes the build for the best performance.



The build is minified and ready to deploy<br />



## What in the future?

The app still needs some work, I want to add a few stats modules showing more data.
I'll consider any suggestions reported to me.
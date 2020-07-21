# Farming Stats

## Overview
Farming stats is a web application created for a quick check basic stats from farming simulator server. Together with friends have wanted to have a possibility to see stats without open the game and joining to server.

## How does it works?

It is pretty simple. Using API delivered by game developers, I have access to XML files which contains server settings and current state of the server like online players, money, owned vehicles etc.

## Tech stack
For developing this project I'm using:
- React(light, fast, very helpful), with React Router. I'm using React Create App.
- Figma. The design has been created by me.

## Encountered problems
Like always problems and bugs must make life difficult, this app isn't an exception.
- API http protocol - The game developer provides API by http protocol. I use the Netlify hosting which use https protocol. Fetching data causes mixed content error. Currently app works only on localhost(which uses http).

## how to fire up this app?
As I mentioned before currently the app works only on localhost, so You have to clone this repository and run it using commands below:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
The app should be ready to be deployed!

## What in the future?
The app still needs some work, I want to add a few more modules showing stats like owned vehicles, installed mods on the server, or meybe even add a map shownig current position of vehicles.

The realisation of these plans will begin when only I'll solve the problem with the mixed content error.
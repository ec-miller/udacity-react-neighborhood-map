# Neighborhood Map React App
### Udacity Front-End Web Developer Nanodegree program

This app is Project 7 in the Udacity Front-End Web Developer Nanodegree program. In this project we were tasked with creating an SPA in React that displays a map of an interesting neighborhood. The neighborhood I chose is Europe. Using the Google Maps Javascript API, I display a number of locations that I have visited in Europe. The app allows you to click on location markers to display images sourced via the Flickr API. A sidebar allows users to filter the list of locations and select from the filtered list. Enjoy exploring Europe!

## Post-Nanodegree Enhancements
- Multiple user profiles, ability to create a new user profile
- Ability to add new trips to a profile, GeoCodes acquired via Google Maps GeoCode API
- Ability to add and edit trip notes, delete trips
- Local storage for a user's data

## How to Use

### Development
1. Save a local copy with `git clone https://github.com/ec-miller/udacity-react-neighborhood-map.git`

2. Install all project dependencies with `npm install` 

3. Start the development server with `npm start`, `localhost:3000` will launch in your default browser once it is ready!

*Note that the service worker is configured to run only when in the production build.*

### Production
1. In the project folder enter the command `npm run build` to create a production build of the app in the `./build` directory

2. To serve locally using [serve](https://www.npmjs.com/package/serve/v/6.5.6) run `serve -s build` and navigate to `localhost:5000` in your browser

## Technologies
- React
- JSX
- google-maps-react
- Material UI Core and Icons
- Google Maps Javascript API
- Flickr API
- JavaScript (particularly ES6)
- CSS
- HTML

## History
Repository created September 28th, 2018

## Credits
Grow with Google and Udacity Front End Scholarship Program

The [Google Maps Javascipt API](https://developers.google.com/maps/documentation/javascript/tutorial) is kick-ass!

The [Flickr API](https://www.flickr.com/services/api/) is convenient and easy to use!

### Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

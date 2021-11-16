# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to run locally
- Clone this repo
- `npm i` to install all required dependencies
- `npm start` to start local server
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Backend
Source code of backend server (nest.js) available in `will be soon`
To change API URL go to `src/api.ts` and edit API_URL

## Functionality
- Register / Sign in via JWT
- Logout after jwt token expiration
- Logout button under user profile
- Get movies from backend
- Movies sort by date and rating
- Update movie statuses (isFavorite, isInWatchlist, isWatched) for user
- Get, create and delete comments on movies
- Movie statistic section for user (watched movies count, total duration of movies, top genre)
- Count and filter movies by statuses for user

## Routes
- Main page (`/`)
  - List of movies
  - List of top rated movies
  - List of most commented movies
  - Update movie status buttons on each movie
  - Movies filter and sort
  - Button to show next 5 movies
  - Register / Login / Logout buttons
  - User profile (name, rank)
- Movie page (`/movies/:movieId`)
  - Update movie status buttons
  - List of comments
  - Comment form
- Register page (`/register`)
- Login page (`/login`)
  - Store JWT token in local storage


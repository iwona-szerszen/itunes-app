# itunes-app
Appliaction bootstrapped with [Create React App](https://github.com/facebook/create-react-app), simulating itunes Apple store. 


## Table of contents
* [About the app](#about-the-app)
* [Technologies](#technologies)
* [Getting Started](#getting-started)
* [Road to next versions](#road-to-version-2)


## About the app
The project was based on React technology. For management of application's state React-Redux was used. As a data source [iTunes Search API](https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api) was used. The following functionalities below are enabled:
* searching artists/ albums/ songs by entered phrase,
* displaying artist's details and list of artist's albums after selecting artist from searching results,
* displaying album's details and list of album's songs after selecting album or song from searching results,
* adding albums and songs to basket if possible (not all albums and songs have a price),
* displaying content of basket.


## Technologies
Project created with:
* React,
* Redux,
* Bootstrap - version 5.


## Getting Started
To run this project, install it locally using npm:

```
 $ cd currency-transactions-app
 $ npm install
```
and then start the app in development mode:

```
 $ npm start
```
The application should be opened automatically in the browser on http://localhost:3000/.


## Road to next versions
TODOs for future development:
- v0.1.1 -> write unit tests for components,
- v0.1.2 -> add RWD styles for smaller devices.
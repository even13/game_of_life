[![Maintainability](https://api.codeclimate.com/v1/badges/8076ad0ba100f1cc8036/maintainability)](https://codeclimate.com/github/even13/game_of_life/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/8076ad0ba100f1cc8036/test_coverage)](https://codeclimate.com/github/even13/game_of_life/test_coverage)
[![Build Status](https://travis-ci.com/ajbacon/acebook-true-GrIT.svg?branch=master)](https://travis-ci.com/even13/game_of_life)

[Introduction](#introduction) | [Contributors](#contributors) | [Getting started](#getting-started) | [Features](#features) | [Additional features](#additional-features) | [Code style](#code-style) | [Tech used](#tech-used) | [Test coverage](#test-coverage) | [User stories](#user-stories) | [Diagram](#diagram)

## Introduction

N.E.O.N is a game based on [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life), a cellular automaton (CA) devised by the British mathematician Conway in the 1970s. Starting with that, we wanted to go beyond the checkered grids, and terminal stars and dashes, so we built something that would allow the public to engage with this fascinating concept in an accessible and entertaining manner. The result is a two-player, Capture the Flag-CA mix, with Vaporwave styling.

The application is deployed [here](https://neon-simulation.herokuapp.com/). Hope you enjoy!

## Contributors

The team consisted of

- [Andrew Bacon](https://github.com/ajbacon)
- [Raluca Ciucu](https://github.com/IngramCapa)
- [Sam Folorunsho](https://github.com/samfolo)
- [Eve Noirault](https://github.com/even13)

## App screenshots

![Home page](./images/home_page.png)  
![Game setup](./images/game_setup.png)   
![Won game](./images/win_page.png)   

## Getting started

First, clone this repository, then:

To install dependencies:
```
npm install
```

To run the app in development mode type in your terminal
```
npm run dev
```
and visit [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Features

In order not to influence strategising (and throw in an element of suspense), we decided to only show the flags on the grid after the users finished placing their cells and clicked Run.

Users can:
- type in their name;
- choose a colour for their cells by clicking on the square next to the name box;
- choose the size of the grid, the number of flags, the number of cell iterations (game length) and the game speed;
- place single cells on the grid and create their own shapes;
- select from three preset shapes (spinner, bird, spaceship);
- play a solo game or against another player;
- players can rotate or mirror their preset shapes;
- see their scores and number of flags captured;
- stop a game halfway through;
- reset a game without changing the settings;
- go back to the home page to select new settings.


### Additional features

Had we had more time, we would have looked to implement the following features:
- users can create and save their own shapes;
- users can rotate and mirror their saved shapes;
- users can see a list of highscores.

## Code style

- OOD
- TDD
- Spiking

## Tech used

- JavaScript
- React JS
- Node.js
- Jest and Enzyme for testing

## Test coverage

- To run the tests and see code coverage, type ```npm test -- --coverage a ```in the terminal.

## Linter

- To run the linter, type ```npm run lint``` in the terminal.

## User stories

```
As a user
So that I can learn more about CA
I want to visit a website where I can manipulate cell evolution.

As a user
So that I can manipulate the environment
I want to select the size of the grid.

As a user
So that I can manipulate the environment
I want to select the number of evolutions.

As a user
So that I can manipulate the environment
I want to select how fast the cells are evolving.

As a user
So that I can create my own shapes
I want to place single cells on the grid.

As a user
So that I can populate the grid faster
I want to choose from a series of preset shapes.

As a user
So that I can plan my strategy better
I want to see how many cells I have left.

As a user
So that I can plan my strategy better
I want to rotate and mirror the preset shapes.

As a user
So that I can share the fun
I would like to play N.E.O.N with another person.

As a user
So that I can identify which player is me
I want to see my name when playing.

As a user
So that I can identify which cells are mine
I want to select from a choice of colors.

As a user
So that I can have a more exciting experience
I want the site to show me the remaining live cells after n evolutions.

As a user
So that I can compete against player 2
I want the site to show me how many flags my cells captured after n evolutions.

As a user
So that I know who won
I want the site to show me the total score for each player and notify me who won.

As a user
So that I can experiment with CA even more
I want to play multiple games against the same opponent.

As a user
So that I don't get bored
I want to be able to stop the game while running.

As a user
So that I can play against a new opponent or change settings
I want to go back to the main page.
```

## Diagram

to be added

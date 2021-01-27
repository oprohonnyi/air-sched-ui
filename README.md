# Aircraft scheduling UI

## Overview
The project is a technical assignment completed as part of interview process.
Design and implementation: @oprohonnyi

### Technical aspect
* Proposed boilerplate was used as project setup.
* It was decided to not integrate any third-party dependencies or libraries and keep the solution vanila style. In real project, it would be proposed to use components library/grid, CSS preprocessor, third-party solutions for graphs and pagination/infinite list.

### Assumptions
* Aircraft utilization time should include time scheduled for a flight and all turnaround time, between scheduled flights.
* There is no need to verify aircraft properties (e.g. base airport) while filtering flights available for rotation.

### Out of scope
* Aircraft/date selection. First aircraft from the server response is automatically preselected.
* Configuration file/logic to update bottlenecks in business logic.
* Responsive layout and cross-browser compatibility optimization. The solution was tested in Chrome 87 (MacOS 11.1 Big Sur)
* Lists pagination/lazy loading for "Aircrafts", "Rotation", "Flights" list components.
* Server error response handling for API's used to retrieve information about aircrafts and flights.
* Unit tests.

## Project setup
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
It contains everything needed to get started on our take-home challenge, so go
ahead and hack!

## Available Scripts

In the project directory, you can run:

### `npm install` or `yarn install`

To download all project dependencies before starting the project.

### `npm start` or `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.
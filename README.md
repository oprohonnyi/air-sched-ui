# Aircraft scheduling UI

## Overview

The project is a technical assignment completed as part of interview process.
Design and implementation: [https://github.com/oprohonnyi](@oprohonnyi)

## Requirements

Those are the high level requirements:

- The app shows a list of all our aircrafts to choose from.
- The app shows a list of all the flights the airline plan to operate that day, their origin, destination, departure time and arrival time.
- The purpose of the app is to allow the user to view and edit the daily rotation for each aircraft:
  - The rotation is the list of flights, in order, an individual aircraft will operate during that day.
  - Flights must be chosen by the user from our list of flights (right sidebar on the wireframe).
  - The app lets the user edit the rotation freely but enforces the following rules:
    _ All aircrafts must be on the ground at midnight.
    _ The turnaround time (minimum time between the end of a flight and the beginning of the next one) is always 20min for our airline. \* Aircrafts cannot "teleport" and cannot move without operating a flight, empty aircrafts cost too much!
- We operate one type of aircraft.
- As per aviation practice, all times are UTC (GMT), the app makes no use of local time. Airports are displayed using their four letter code.
- Utilisation: The app must display for each aircraft its utilisation in percent, i.e. the time the aircraft is on scheduled service per 24 hours (as opposed to sitting idle on the apron costing us money).
- Aircraft timeline: for the selected aircraft, a horizontal bar shows a period of 24 hours, scheduled service in green, turnaround time in purple, idle time in grey.

![image](https://user-images.githubusercontent.com/152380/51271642-fc120c80-19bf-11e9-8d08-468588aa6635.png)

Read full version: https://gist.github.com/nickbnf/77dcd76a26c57fa0d005187b6808799e#file-aircraft_scheduling-md

### Technical aspect

- Proposed boilerplate was used as project setup.
- It was decided to build the solution as minimalistic as possible, mui component library and grid system was used as a foundation for components UI/UX.

### Assumptions

- Aircraft utilization time should include time scheduled for a flight and all turnaround time, between scheduled flights.
- There is no need to verify aircraft properties (e.g. base airport) while filtering flights available for rotation.

### Out of scope

- Aircraft/date selection. First aircraft from the server response is automatically preselected.
- Configuration file/logic to update bottlenecks in business logic.
- Adaptive layout and cross-device compatibility optimization. The solution was designed using responsive material ui grid system, without adaptation for different device types.
- Lists pagination/lazy loading for "Aircrafts", "Rotation", "Flights" list components.
- Server error response handling for API's used to retrieve information about aircrafts and flights.
- Unit tests.

## Project setup

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
It contains everything needed to get started on our take-home challenge, so go
ahead and hack!

In the project directory, you can run:

### `npm install` or `yarn install`

To download all project dependencies before starting the project.

### `npm start` or `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test` or `yarn test`

To run unit tests of the project.

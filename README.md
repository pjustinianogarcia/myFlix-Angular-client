# Movie App

Movie App is an Angular application that allows users to explore a wide variety of movies. The application provides features to fetch and display movies and user profiles, with integration to various Angular Material components for dialogs and notifications.

## Features

Movie List: Fetches and displays a list of movies from an API.
User Profile: Loads and displays user profile data.
Dialog Integration: Utilizes Angular Material dialogs to enhance the user interface.
Notifications: Uses Angular Material snack bars to provide feedback to the user.

## Technologies

Angular
Angular Material
TypeScript
RxJS

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:


git clone <repository-url>

2. Navigate to the project directory:


cd <project-directory>

3. Install dependencies:


npm install

4. Serve the application:


ng serve

5. Open the app in your browser:

Visit http://localhost:4200 to see the app in action.


## Usage

Fetching Movies: The MovieCardComponent fetches a list of movies from the API on initialization using the UserRegistrationService.
Loading User Profile: The loadUser method fetches the user's profile data and logs it to the console. It handles errors gracefully by logging them.
Dialogs and Snack Bars: The application uses Angular Material's MatDialog for displaying additional content and MatSnackBar for user notifications.

## API Integration
The app communicates with a backend API to fetch movies and user data. Ensure that the API is running and accessible:

### API Endpoints:
GET /movies: Fetches all movies.
GET /users/:Username: Fetches user profile data.

## Components
MovieCardComponent: This component is responsible for displaying a list of movies and handling user interactions with movies.

### Methods:

getMovies(): Fetches all movies from the API.
loadUser(): Loads the current user's profile data.
# MyFlixAngularClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.14.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.



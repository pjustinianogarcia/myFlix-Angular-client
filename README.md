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

## Methods:

### userRegistration(userDetails)

- **Description:** Registers a new user.
- **Parameters:** userDetails (Object) - The details of the user to register.
- **Returns:** Observable<any> - The server's response.

### userLogin(userDetails)
- **Description:** Logs in a user.
- **Parameters:** userDetails (Object) - The user's login credentials.
- **Returns:** Observable<any> - The server's response.

### getAllMovies()
- **Description:** Retrieves all movies from the database.
- **Returns:** Observable<any> - An array of all movies.

### getMovie(movieId)
- **Description:** Retrieves details for a specific movie.
- **Parameters:** movieId (string) - The ID of the movie to retrieve.
- **Returns:** Observable<any> - The movie details.

### getDirector(directorId)
- **Description:** Retrieves details for a specific director.
- **Parameters:** directorId (string) - The ID of the director to retrieve.
- **Returns:** Observable<any> - The director's details.

### getGenre(genreId)
- **Description:** Retrieves details for a specific genre.
- **Parameters:** genreId (string) - The ID of the genre to retrieve.
- **Returns:** Observable<any> - The genre's details.

### getUser(username)
- **Description:** Retrieves details for a specific user.
- **Parameters:** username (string) - The username of the user to retrieve.
- **Returns:** Observable<any> - The user's details.

### getUserProfile()
- **Description:** Retrieves the profile details for the currently logged-in user.
- **Returns:** Observable<any> - The user's profile details.

### getFavoriteMovies(username)
- **Description:** Retrieves the favorite movies of a specific user.
- **Parameters:** username (string) - The username of the user.
- **Returns:** Observable<any> - An array of the user's favorite movies.

### addFavoriteMovie(username, movieId)
- **Description:** Adds a movie to a user's list of favorite movies.
- **Parameters:**
- **username (string)** - The username of the user.
- **movieId (string)** - The ID of the movie to add.
- **Returns:** Observable<any> - The server's response.

### editUser(username, userDetails)
- **Description:** Updates the details of a specific user.
- **Parameters:**
- **username (string)** - The username of the user.
- **userDetails (Object)** - The updated user details.
- **Returns:** Observable<any> - The server's response.

### deleteUser(username)
- **Description:** Deletes a specific user's account.
- **Parameters:** username (string) - The username of the user to delete.
- **Returns:** Observable<any> - The server's response.

### deleteFavoriteMovie(username, movieId)
- **Description:** Removes a movie from a user's list of favorite movies.
- **Parameters:**
- **username (string)** - The username of the user.
- **movieId (string)** - The ID of the movie to remove.
- **Returns:** Observable<any> - The server's response.

## Error Handling

The UserRegistrationService includes a private handleError method that handles HTTP errors. If an error occurs during an HTTP request, the method logs the error and returns a user-friendly message.

- **handleError(error: HttpErrorResponse):** Handles HTTP errors.
- **Parameters: error (HttpErrorResponse)** - The error response from the HTTP request.
- **Returns:** An observable error that can be subscribed to by the calling function.
## Dependencies

- **Angular:** The service uses Angular's HttpClient for making HTTP requests.
- **RxJS:** The service relies on RxJS operators such as map and catchError to handle data streams and errors.


//fetch-api-data.services.ts
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://movie-api-3jxi.onrender.com/';
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  /**
   * Injects the HttpClient module to the constructor, making it available for API requests.
   * @param http The HttpClient module used for HTTP requests.
   */
  constructor(private http: HttpClient) {
  }


  /**
   * Registers a new user.
   * @param userDetails An object containing the user's details for registration.
   * @returns An Observable containing the server's response.
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

 
   /**
   * Logs in a user.
   * @param userDetails An object containing the user's login credentials.
   * @returns An Observable containing the server's response.
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }
  /**
   * Retrieves all movies from the database.
   * @returns An Observable containing an array of all movies.
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

     /**
   * Retrieves details for a specific movie.
   * @param movieId The ID of the movie to retrieve.
   * @returns An Observable containing the movie details.
   */
    public getMovie(movieId: string): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + `movies/${movieId}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

  /**
   * Retrieves details for a specific director.
   * @param directorId The ID of the director to retrieve.
   * @returns An Observable containing the director details.
   */
  public getDirector(directorId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `directors/${directorId}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves details for a specific genre.
   * @param genreId The ID of the genre to retrieve.
   * @returns An Observable containing the genre details.
   */
    public getGenre(genreId: string): Observable<any> {
      const token = localStorage.getItem('token');
      console.log("token:", token);
      return this.http.get(apiUrl + `genres/${genreId}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }


  /**
   * Retrieves details for a specific user.
   * @param username The username of the user to retrieve.
   * @returns An Observable containing the user details.
   */
  public getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

    /**
   * Retrieves the profile details for the currently logged-in user.
   * @returns An Observable containing the user's profile details.
   */

  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    console.log("token:", token)
    return this.http.get<any>(`${apiUrl}users/profile`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      catchError(this.handleError)
    );
  }


  /**
   * Retrieves the favorite movies of a specific user.
   * @param username The username of the user whose favorite movies are to be retrieved.
   * @returns An Observable containing an array of the user's favorite movies.
   */
   public getFavoriteMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${username}/movies`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Adds a movie to a user's list of favorite movies.
   * @param username The username of the user.
   * @param movieId The ID of the movie to add to the favorites list.
   * @returns An Observable containing the server's response.
   */

    public addFavoriteMovie(username: string, movieId: string): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.post(apiUrl + `users/${username}/movies/${movieId}`, {}, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

  /**
   * Updates the details of a specific user.
   * @param username The username of the user to update.
   * @param userDetails An object containing the updated user details.
   * @returns An Observable containing the server's response.
   */
  public editUser(username: string, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + `users/${username}`, userDetails, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Deletes a specific user's account.
   * @param username The username of the user to delete.
   * @returns An Observable containing the server's response.
   */
    public deleteUser(username: string): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.delete(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      }).pipe(
        catchError(this.handleError)
      );
    }


  /**
   * Removes a movie from a user's list of favorite movies.
   * @param username The username of the user.
   * @param movieId The ID of the movie to remove from the favorites list.
   * @returns An Observable containing the server's response.
   */
  public deleteFavoriteMovie(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${username}/movies/${movieId}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Extracts response data from an HTTP response.
   * This method is used internally to handle API responses.
   * @param res The HTTP response to extract data from.
   * @returns The extracted response data, or an empty object if none exists.
   */
  private extractResponseData(res: any): any {
    return res || { };
  }

    /**
   * Handles errors from HTTP requests.
   * This method is used internally to handle API errors.
   * @param error The HTTP error response.
   * @returns An observable error that can be subscribed to by the calling function.
   */

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}


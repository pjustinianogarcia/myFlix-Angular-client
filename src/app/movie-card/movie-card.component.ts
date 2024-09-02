// src/app/movie-card/movie-card.component.ts
/**
 * @fileOverview This file defines the MovieCardComponent, which displays a list of movie cards. 
 * @module MovieCardComponent
 */
import { Component, OnInit, Inject } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; 

/**
 * @class
 * @description The MovieCardComponent class is responsible for managing the display and interaction
 * of movie cards. It retrieves movie data and user information, including the user's list of favorite movies.
 * The component allows users to view movie details in a dialog and add movies to their favorites.
 */

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  user: any;
  FavoriteMovies: any[] = [];
  userData = { Username: "", FavoriteMovies: [] };

    /**
   * @constructor
   * @param {UserRegistrationService} fetchApiData - Service for interacting with the backend API.
   * @param {MatDialog} dialog - Service for opening dialogs.
   * @param {MatSnackBar} snackBar - Service for displaying notifications.
   */

  constructor(public fetchApiData: UserRegistrationService, 
    public dialog: MatDialog, 
    private snackBar: MatSnackBar) { }

    /**
   * @method ngOnInit
   * @description Lifecycle hook that is called after Angular has initialized all data-bound properties.
   * This method calls the getMovies and loadUser methods to initialize the component.
   */

  ngOnInit(): void {
    this.getMovies();
    this.loadUser(); 
  }

    /**
   * @method getMovies
   * @description Retrieves the list of all movies from the backend API and stores it in the movies property.
   * It also calls the getFavMovies method to load the user's favorite movies.
   * @returns {void}
   */

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.getFavMovies();
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
 * @method loadUser
 * @description Loads the user data from the local storage and sets it to the `user` property. 
 * If no user data is found, a message is logged to the console.
 * @returns {void}
 */

  loadUser(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      console.log('Loaded user data:', this.user);
    } else {
      console.log('No user data found in local storage.');
    }
  }
  
    /* Favorite movies Setup */ 


/**
 * @method getFavMovies
 * @description Retrieves the user's favorite movies by fetching user data from the backend API.
 * It updates the `FavoriteMovies` and `userData.FavoriteMovies` properties with the user's favorite movies.
 * @returns {void}
 */
    getFavMovies(): void {
      const username = this.user.Username; // Or another way to get the username
this.fetchApiData.getUser(username).subscribe((user) => {
  this.user = user;
});
      this.userData.FavoriteMovies = this.user.FavoriteMovies;
      this.FavoriteMovies = this.user.FavoriteMovies;
      console.log('Users fav movies', this.FavoriteMovies);
    }
    isFavoriteMovie(movieID: string): boolean {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.FavoriteMovies.indexOf(movieID) >= 0;
    }

  /* Favorite Functions */
/**
 * @method addFavoriteMovie
 * @description Adds a movie to the user's list of favorite movies by updating the user's data in the backend API.
 * It then updates the local storage and refreshes the favorite movies list.
 * A snack bar notification is displayed to confirm the action.
 * @param {any} movie - The movie object to be added to the favorites list.
 * @returns {void}
 */
  addFavoriteMovie(movie: any): void {
    const username = this.user.Username; // Or another way to get the username
    this.fetchApiData.getUser(username).subscribe((user) => {
      this.user = user;
      this.getFavMovies();
    });
    this.userData.Username = this.user.Username;
    this.fetchApiData.addFavoriteMovie(this.user.Username, movie).subscribe((response) => {
      localStorage.setItem('user', JSON.stringify(response));
      this.getFavMovies();
      this.snackBar.open('Movie has been added to your favorites!', 'OK', {
        duration: 3000,
      });
    });
  }

  /**
 * @method deleteFavoriteMovie
 * @description Removes a movie from the user's list of favorite movies by updating the user's data in the backend API.
 * It then updates the local storage and refreshes the favorite movies list.
 * A snack bar notification is displayed to confirm the action.
 * @param {any} movie - The movie object to be removed from the favorites list.
 * @returns {void}
 */

  deleteFavoriteMovie(movie: any): void {
    const username = this.user.Username; // Or another way to get the username
this.fetchApiData.getUser(username).subscribe((user) => {
  this.user = user;
  this.getFavMovies();
});
    this.userData.Username = this.user.Username;
    this.fetchApiData.deleteFavoriteMovie(username, movie).subscribe((response) => {
      localStorage.setItem('user', JSON.stringify(response));
      this.getFavMovies();
      this.snackBar.open('Movie has been removed from your favorites!', 'OK', {
        duration: 3000,
      });
    });
  }


// get director name and info
/**
 * @method openDirectorDialog
 * @description Opens a dialog displaying the director's information for the selected movie.
 * @param {any} movie - The movie object containing the director's details.
 * @returns {void}
 */
openDirectorDialog(movie: any): void {
  this.dialog.open(DirectorDialog, {
    data: {
      Name: movie.Director.Name,
      Bio: movie.Director.Bio,
      Birth: movie.Director.Birth 
    },
  });
}

/**
 * @method openGenreDialog
 * @description Opens a dialog displaying the genre's information for the selected movie.
 * @param {any} movie - The movie object containing the genre's details.
 * @returns {void}
 */

openGenreDialog(movie: any): void {
  this.dialog.open(GenreDialog, {
    data: {
      Name: movie.Genre.Name,
      Description: movie.Genre.Description
    },
  });
}

/**
 * @method openMovieDialog
 * @description Opens a dialog displaying the movie's title and description.
 * @param {any} movie - The movie object containing the title and description.
 * @returns {void}
 */

openMovieDialog(movie: any): void {
  this.dialog.open(MovieDialog, {
    data: {
      Title: movie.Title,
      Description: movie.Description,
    },
  });
}


}

/**
 * @class MovieDialog
 * @description Component that defines the dialog for displaying movie details.
 * It receives data through dependency injection and displays the movie's title and description.
 */

// Component for Genre Dialog
@Component({
  selector: 'movie-dialog',
  template: `
    <h1 mat-dialog-title>{{data.Title}}</h1>
    <div mat-dialog-content>
      <p>{{data.Description}}</p>
     
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </div>
  `,
})
export class MovieDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

/**
 * @class GenreDialog
 * @description Component that defines the dialog for displaying genre details.
 * It receives data through dependency injection and displays the genre's name and description.
 */

@Component({
  selector: 'genre-dialog',
  template: `
    <h1 mat-dialog-title>{{data.Name}}</h1>
    <div mat-dialog-content>
      <p>{{data.Description}}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </div>
  `,
})
export class GenreDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

/**
 * @class DirectorDialog
 * @description Component that defines the dialog for displaying director details.
 * It receives data through dependency injection and displays the director's name, biography, and birth information.
 */

@Component({
  selector: 'director-dialog',
  template: `
    <h1 mat-dialog-title>{{data.Name}}</h1>
    <div mat-dialog-content>
      <p>{{data.Bio}}</p>
      <p><strong>Born:</strong> {{data.Birth}}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </div>
  `,
})
export class DirectorDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
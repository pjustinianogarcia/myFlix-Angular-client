// src/app/movie-card/movie-card.component.ts
import { Component, OnInit, Inject } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; 



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

  constructor(public fetchApiData: UserRegistrationService, 
    public dialog: MatDialog, 
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getMovies();
    this.loadUser(); 
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.getFavMovies();
      console.log(this.movies);
      return this.movies;
    });
  }

  loadUser(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      console.log('Loaded user data:', this.user);
    } else {
      console.log('No user data found in local storage.');
    }
  }
  
    /* Favorite Setup */ 
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
openDirectorDialog(movie: any): void {
  this.dialog.open(DirectorDialog, {
    data: {
      Name: movie.Director.Name,
      Bio: movie.Director.Bio,
      Birth: movie.Director.Birth 
    },
  });
}

openGenreDialog(movie: any): void {
  this.dialog.open(GenreDialog, {
    data: {
      Name: movie.Genre.Name,
      Description: movie.Genre.Description
    },
  });
}

openMovieDialog(movie: any): void {
  this.dialog.open(MovieDialog, {
    data: {
      Title: movie.Title,
      Description: movie.Description,
    },
  });
}


}



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

// Component for Director Dialog
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
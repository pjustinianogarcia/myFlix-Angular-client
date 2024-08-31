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

  constructor(public fetchApiData: UserRegistrationService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getMovies();
    this.loadUser(); 
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
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


addToFavorites(movie: any): void {
  if (this.user && this.user.Username) {
    this.fetchApiData.addFavoriteMovie(this.user.Username, movie._id).subscribe((response: any) => {
      this.snackBar.open(`${movie.Title} has been added to your favorites!`, 'OK', {
        duration: 2000,
      });
      // Optionally refresh user data to reflect the added favorite
      this.loadUser();
    }, (error: any) => {
      this.snackBar.open('Error adding movie to favorites', 'OK', {
        duration: 2000,
      });
    });
  } else {
    this.snackBar.open('User data is not loaded yet', 'OK', {
      duration: 2000,
    });
  }
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
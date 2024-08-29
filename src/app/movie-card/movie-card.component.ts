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
    this.fetchApiData.getUserProfile().subscribe(
      (userData: any) => {
        if (userData && userData.Username) {
          this.user = userData;
          console.log('User data loaded:', this.user);
        } else {
          console.error('User profile data is missing Username.');
        }
      },
      error => {
        console.error('Failed to fetch user data:', error);
      }
    );
  }
  

  openGenreDialog(genreId: string): void {
    if (!genreId) {
      console.error('Genre ID is missing.');
      return;
    }
  
    this.fetchApiData.getGenre(genreId).subscribe((genre: any) => {
      this.dialog.open(GenreDialog, {
        data: {
          Name: genre.Name,
          Description: genre.Description,
        },
      });
    }, error => {
      console.error('Failed to fetch genre:', error);
    });
  }

  openDirectorDialog(directorId: string): void {
    if (!directorId) {
      console.error('Director ID is missing.');
      return;
    }
  
    this.fetchApiData.getDirector(directorId).subscribe((director: any) => {
      this.dialog.open(DirectorDialog, {
        data: {
          Name: director.Name,
          Bio: director.Bio,
          Birth: director.Birth,
        },
      });
    }, error => {
      console.error('Failed to fetch director:', error);
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

addFavoriteMovie(movieId: string): void {
  if (!this.user) {
    console.error('User data is not loaded yet.');
    return;
  }

  const username = this.user.Username;
  if (!username) {
    console.error('Username is not defined.');
    return;
  }

  this.fetchApiData.addFavoriteMovie(username, movieId).subscribe(
    () => {
      this.snackBar.open('Movie added to favorites!', 'OK', {
        duration: 2000,
      });
    },
    (error: any) => {
      console.error('Failed to add movie to favorites:', error);
      this.snackBar.open('Failed to add movie to favorites', 'OK', {
        duration: 2000,
      });
    }
  );
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
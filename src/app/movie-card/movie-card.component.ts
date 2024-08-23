// src/app/movie-card/movie-card.component.ts
import { Component, OnInit, Inject } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'
import { MatDialog, MAT_DIALOG_DATA  } from '@angular/material/dialog';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(public fetchApiData: UserRegistrationService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
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
}


// Component for Genre Dialog
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
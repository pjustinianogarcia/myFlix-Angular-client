//profile-view.component.ts
import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
    /**
   * Holds the user's data, such as username, password, and favorite movies.
   */
  userData: any = {};
  favoriteMovies: any[] = [];

   /**
   * @param fetchApiData Service used to interact with the API for fetching and updating user data.
   * @param router Service used to navigate between routes.
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public router: Router
  ) {
    this.userData = JSON.parse(localStorage.getItem("user") || "");
  }

  ngOnInit(): void {
    this.getUser();
  }

   /**
   * Updates the user's profile with the new data.
   * After updating, it refreshes the user's favorite movies list.
   */

  updateUser(): void {
    this.fetchApiData.editUser(this.userData.Username, this.userData).subscribe((res: any) => {
      this.userData = {
        ...res,
        id: res._id,
        password: this.userData.password,
        token: this.userData.token
      };
      localStorage.setItem("user", JSON.stringify(this.userData));
      this.getfavoriteMovies();
    }, (err: any) => {
      console.error(err)
    });
  }
  resetUser(): void {
    this.userData = JSON.parse(localStorage.getItem("user") || "");
  }
  backToMovie(): void {
    this.router.navigate(["movies"]);
  }

   /**
   * Fetches all movies from the database and filters the list to include only the user's favorite movies.
   */

  getfavoriteMovies(): void {
    if (!Array.isArray(this.userData.FavoriteMovies)) {
      this.userData.FavoriteMovies = [];
    }
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      console.log('All Movies:', res);
      this.favoriteMovies = res.filter((movie: any) => {
        console.log('FavoriteMovies:', this.favoriteMovies);
        return this.userData.FavoriteMovies.includes(movie._id)
      })
    }, (err: any) => {
      console.error(err);
    });
  }

    /**
   * Fetches the user's data from the server and stores it in localStorage.
   * Also refreshes the user's favorite movies list.
   */

  getUser(): void {
    this.fetchApiData.getUser(this.userData.Username).subscribe((res: any) => {
      this.userData = {
        ...res,
        id: res._id,
        password: this.userData.password,
        token: this.userData.token,
        FavoriteMovies: res.FavoriteMovies || []
      };
      console.log('User Data:', this.userData);
      console.log('User Favorite Movies:', this.userData.FavoriteMovies);
      localStorage.setItem("user", JSON.stringify(this.userData));
      this.getfavoriteMovies();
    }, (err: any) => {
      console.error(err);
    });
  }

    /**
   * Removes a movie from the user's list of favorite movies.
   * @param movie The movie object to be removed from favorites.
   */

  removeFromFavorite(movie: any): void {
    this.fetchApiData.deleteFavoriteMovie(this.userData.id, movie._id).subscribe((res: any) => {
      this.userData.favoriteMovies = res.favoriteMovies;
      this.getfavoriteMovies();
    }, (err: any) => {
      console.error(err)
    })
  }


  /**
   * Logs out the user by navigating to the welcome screen and removing the user data from localStorage.
   */
  
  logout(): void {
    this.router.navigate(["welcome"]);
    localStorage.removeItem("user");
  }
}

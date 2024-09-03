import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  constructor(private router: Router) {}
  /**
   * Checks if the current route is the welcome page.
   * 
   * @returns {boolean} - Returns true if the current route is not the welcome page.
   */
  shouldDisplayNavBar(): boolean {
    return this.router.url !== '/welcome'; // Adjust the route if your welcome route is different
  }
   /**
   * Logs out the user by clearing their data from localStorage and redirecting to the welcome page.
   * 
   * @returns {void}
   */
   logout(): void {
    localStorage.clear(); // Clear user data from localStorage
    this.router.navigate(['/welcome']); // Redirect to the welcome page
  }
}
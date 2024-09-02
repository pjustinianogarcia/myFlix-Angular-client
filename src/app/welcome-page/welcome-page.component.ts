/**
 * @module WelcomePageComponent
 * @description 
 * This component serves as the entry point for the application. 
 * It provides options for users to either register a new account or log in to an existing one.
 * 
 * @component
 * @example
 * <app-welcome-page></app-welcome-page>
 */
import { Component, OnInit  } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
//import { MovieCardComponent } from './movie-card/movie-card.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
   /**
   * @constructor
   * @param {MatDialog} dialog - Injected Angular Material Dialog service for opening dialogs.
   */
  constructor(public dialog: MatDialog) { }
    /**
   * Lifecycle hook that is called after the component's view has been initialized.
   * This is a good place to put initialization logic.
   * 
   * @memberof WelcomePageComponent
   */
  ngOnInit(): void {
  }

    /**
   * Opens a dialog containing the user registration form.
   * 
   * @memberof WelcomePageComponent
   * @returns {void}
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

    /**
   * Opens a dialog containing the user login form.
   * 
   * @memberof WelcomePageComponent
   * @returns {void}
   */
openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}
/**
 * @module UserRegistrationFormComponent
 * @description
 * This component provides a form for users to register a new account.
 * The form captures user details such as username, password, email, and birthday.
 * Upon successful registration, the user is notified, and the registration dialog is closed.
 * 
 * @component
 * @example
 * <app-user-registration-form></app-user-registration-form>
 */
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { UserRegistrationService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

    /**
   * @property {object} userData - Object containing the user's registration details.
   * @property {string} userData.Username - The username entered by the user.
   * @property {string} userData.Password - The password entered by the user.
   * @property {string} userData.Email - The email entered by the user.
   * @property {string} userData.Birthday - The user's birthday in YYYY-MM-DD format.
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

   /**
   * @constructor
   * @param {UserRegistrationService} fetchApiData - Service for making API calls related to user registration.
   * @param {MatDialogRef<UserRegistrationFormComponent>} dialogRef - Reference to the dialog opened for user registration.
   * @param {MatSnackBar} snackBar - Service for displaying snack bar notifications to the user.
   */
constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

      /**
   * Lifecycle hook that is called after the component's view has been initialized.
   * Initialization logic can be placed here.
   * 
   * @memberof UserRegistrationFormComponent
   */
ngOnInit(): void {
}

  /**
   * Registers a new user by sending the form data to the backend API.
   * On success, the registration dialog is closed and a success message is displayed.
   * If the registration fails, an error message is displayed to the user.
   * 
   * @memberof UserRegistrationFormComponent
   * @returns {void}
   */
registerUser(): void {
  this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
// Logic for a successful user registration goes here! (To be implemented)
console.log(result)
   this.dialogRef.close(); // This will close the modal on success!
   this.snackBar.open('user resgistered succesfully!', 'OK', {
      duration: 2000
   });
  }, (result) => {
    this.snackBar.open(result, 'OK', {
      duration: 2000
    });
  });
}

}
import { Component, OnInit, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-login-form',
    templateUrl: './user-login-form.component.html',
    styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
    @Input() userData = { Username: "", Password: "" };

    constructor(
        public fetchApiData: UserRegistrationService,
        public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
        public snackBar: MatSnackBar,
        public router: Router
    ) { }
    
    ngOnInit(): void {}

    logInUser(): void {
      this.fetchApiData.userLogin(this.userData).subscribe((result) => {
        console.log(result);
        this.dialogRef.close(); // Close the modal on success
        this.snackBar.open(`Login successful, Welcome ${result.user.Username}`, 'OK', {
          duration: 2000
        });
    
        // Save user details to localStorage
        const user = {
          ...result.user,
        };
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', result.token);
        // Navigate to the movies page
        this.router.navigate(['movies']);
      }, (error) => {
        this.snackBar.open('Login failed', 'OK', {
          duration: 2000
        });
      });
    }
  }
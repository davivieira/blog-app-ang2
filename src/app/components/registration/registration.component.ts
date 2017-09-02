import { register } from 'ts-node/dist';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from '../../services/user.service';

@Component({
  moduleId: module.id,
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  registerForm: FormGroup;
  passwordMatch: boolean;
  user: User = new User();
  typingTimer: any;
  isUsernameValid: boolean;
  isFormValid: boolean;
  userIcon: string = 'fa fa-user-circle';

  constructor(formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private flashMessage: FlashMessagesService) {

    this.passwordMatch = false;
    this.flashMessage.grayOut(true);
    this.isUsernameValid = false;
    this.isFormValid = false;

    this.registerForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.compose([Validators.required])],
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])]
    },
    {
      validator: this.matchPasswords('password', 'passwordConfirm')
    });
  }

  matchPasswords(passwordKey: string, passwordConfirm: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[passwordConfirm];

      this.passwordMatch = password.value === confirmPassword.value;
      this.doFormValidation();

      return this.passwordMatch ? null : {mismatchedPasswords: true};
    }
  }

  register(event) {
    event.preventDefault();
    this.userService.registerUser(this.user).subscribe(() => {
      this.router.navigateByUrl('login');
      this.flashMessage.show('User registered successfully! You can log in now.',
        { cssClass: 'alert-success text-center app-message', timeout: 3000 });
    }, err => console.log(err));
  }

  startCounting() {
    clearTimeout(this.typingTimer);
    this.userIcon = 'fa fa-spinner fa-spin';
    this.typingTimer = setTimeout(this.doneTypingUser.bind(this), 2000);
  }

  stopCounting() {
    clearTimeout(this.typingTimer);
  }

  doneTypingUser() {
    console.log(`Buscando user ${this.user.username}`);

    if (this.user.username && this.user.username.length) {
      this.userService.getByUsername(this.user.username).subscribe(user => {

        if (user.isAvailable) {
          this.userIcon = 'fa fa-user-circle green';
          this.isUsernameValid = true;
        } else {
          this.userIcon = 'fa fa-user-circle red';
          this.isUsernameValid = false;
        }

        this.doFormValidation();
      }, err => this.userIcon = 'fa fa-user-circle red');
    } else {
      this.userIcon = 'fa fa-user-circle';
    }
  }

  validateUserField(isValid): any {
    this.isUsernameValid = isValid;
  }

  doFormValidation() {
    this.isFormValid = this.isUsernameValid && !this.registerForm.invalid && this.passwordMatch;
    console.log(this.isFormValid)
  }
}

class User {
  name: string;
  username: string;
  password: string;
  email: string;
}

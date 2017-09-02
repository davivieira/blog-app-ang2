import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userLogin: UserLogin = new UserLogin();
  loginForm: FormGroup;

  constructor(formBuilder: FormBuilder, private userService: UserService, private flashMessage: FlashMessagesService, private router:Router) {
    this.loginForm = formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  onLoginSubmit(event) {
    event.preventDefault();
    this.userService.submitLogin(this.userLogin).subscribe(data => {
      this.flashMessage.show('Logged in!', {cssClass: 'alert-success text-center app-message', timeout: 3000 });

      this.userService.storeUserAuth(data.token, data.user);
      this.router.navigateByUrl('');
    }, err => {
      this.flashMessage.show('Login failed!', {cssClass: 'alert-danger text-center app-message', timeout: 3000 });
    })
  }


}

class UserLogin {
  usename: string;
  password: string;
}

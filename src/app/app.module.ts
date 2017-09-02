import { UserSpanComponent } from './components/userspan/userspan.component';
import { UserService } from './services/user.service';
import { userInfo } from 'os';
import { APP_BASE_HREF } from '@angular/common';
import { RegistrationComponent } from './components/registration/registration.component';
import { Routing } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PostsComponent } from './components/posts/posts.component';
import { LoginComponent } from './components/login/login.component';
import { FlashMessagesModule } from 'angular2-flash-messages';

import 'rxjs/add/operator/map';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    LoginComponent,
    RegistrationComponent,
    UserSpanComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Routing,
    ReactiveFormsModule,
    FlashMessagesModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

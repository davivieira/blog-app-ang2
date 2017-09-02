import { PostsComponent } from './components/posts/posts.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    { path: '', component: PostsComponent },
    { path: 'register', component: RegistrationComponent},
    { path: 'login', component: LoginComponent},
    { path: '**', redirectTo: ''}
]

export const Routing = RouterModule.forRoot(appRoutes);
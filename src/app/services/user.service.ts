import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class UserService {
    API_BASE_URL: string = 'http://localhost:3000/';
    userToken: any;
    user: any;

    headers: Headers;

    constructor(private http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    submitLogin(loginInfo) {

        return this.http.put(this.API_BASE_URL + 'users/authenticate', loginInfo, {headers: this.headers}).map(res => res.json());
    }

    registerUser(user): Observable<Response> {
        return this.http.post(this.API_BASE_URL + 'users/register', JSON.stringify(user), {headers: this.headers});
    }

    getByUsername(username): Observable<any> {
        return this.http.put(this.API_BASE_URL + 'users/username', {username: username}, {headers: this.headers}).map(res => res.json());
    }

    storeUserAuth(token, user) {
        localStorage.setItem("id_token", token);
        localStorage.setItem("user", JSON.stringify(user));

        this.userToken = token;
        this.user = user;
    }

    logout() {
        localStorage.clear();

        this.userToken = null;
        this.user = null;
    }

    loadToken() {
        this.userToken = localStorage.getItem('id_token');
    }

    isLoggedIn() {
        return tokenNotExpired();
    }
}
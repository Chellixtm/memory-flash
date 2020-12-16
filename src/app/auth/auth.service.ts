import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthData } from './auth-data.model';

@Injectable({ providedIn: "root"})
export class AuthService {
    baseUrl = "https://memory-db.herokuapp.com/user/";

    constructor(private http: HttpClient) {}

    createUser(username: string, email: string, password: string) {
        const user: AuthData = {
            username: username,
            email: email,
            password: password
        }
        this.http.post<AuthData>(this.baseUrl + "signup", user).subscribe(res => {
            console.log(res);
        }), catchError(e => {
            return throwError(e);
        });
    }
}
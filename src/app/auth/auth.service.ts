import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthData } from './auth-data.model';

@Injectable({ providedIn: "root" })
export class AuthService {
    private isAuth = false;
    private token: string;
    private tokenTimer: NodeJS.Timer;
    private authStatusListener = new Subject<boolean>();

    private baseUrl = "https://memory-db.herokuapp.com/user/";

    constructor(private http: HttpClient, private router: Router) { }

    getToken() {
        return this.token;
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    getIsAuth() {
        return this.isAuth;
    }

    createUser(username: string, email: string, password: string) {
        const user: AuthData = {
            username: username,
            email: email,
            password: password
        }
        this.http.post<AuthData>(this.baseUrl + "signup", user).subscribe(res => {
            console.log(res);
            if(res) {
                this.router.navigate(['/login']);
            }
        }), catchError(e => {
            return throwError(e);
        });
    }

    login(username: string, password: string) {
        const user = {
            username: username,
            password: password
        }
        this.http.post<{ token: string, expiresIn: number }>(this.baseUrl + 'login', user).subscribe(res => {
            const token = res.token;
            this.token = token;
            if (token) {
                const expiresIn = res.expiresIn;
                this.setAuthTimer(expiresIn);
                this.isAuth = true;
                this.authStatusListener.next(true);
                const now = new Date();
                const expirationDate = new Date(now.getTime() + expiresIn * 1000);
                this.saveAuthData(token, expirationDate);
                this.router.navigate(['/']);
            }
        });
    }

    logout() {
        this.token = null;
        this.isAuth = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/']);
    }

    autoAuthUser() {
        const authInfo = this.getAuthData();
        if (!authInfo) {
            return;
        }
        const now = new Date();
        const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.token = authInfo.token;
            this.isAuth = true;
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        }
    }

    private setAuthTimer(duration: number) {
        console.log("Setting timer: " + duration);
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }

    private saveAuthData(token: string, expirationDate: Date) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
    }

    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
    }

    private getAuthData() {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expiration');
        if (!token || !expirationDate) {
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate)
        }
    }
}
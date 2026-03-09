import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { User } from "./types";
import { Observable, pipe, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly baseUrl: string = 'http://localhost:8080/api/auth/login';

    private httpClient = inject(HttpClient);
    private _roles = new Map();
     _authenticatedUser!: User;

    setAuthenticatedUser(user: User) {
        this._authenticatedUser = user;
    }

    public login(credentials: { email: string; password: string}): Observable<User> {
        return this.httpClient.post<User>(this.baseUrl, credentials).pipe(
            tap(user => this._authenticatedUser = user)
        );
    }

    isGranted(role: string): boolean {
        return this._authenticatedUser.role === role;
    }
}
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
     

    public login(credentials: { email: string; password: string}): Observable<User> {
        return this.httpClient.post<User>(this.baseUrl, credentials).pipe(
            tap(user => localStorage.setItem("user", JSON.stringify(user)))
        );
    }

    isGranted(role: string): boolean {
        const userJSON = localStorage.getItem("user");
        if (userJSON) {
            return JSON.parse(userJSON).role === role
        }
        return false;
    }
}
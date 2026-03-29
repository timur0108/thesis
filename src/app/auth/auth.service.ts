import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { User } from "./types";
import { Observable, pipe, tap } from "rxjs";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly baseUrl: string = `${environment.apiUrl}/auth`;

    private httpClient = inject(HttpClient);
    private _roles = new Map();
    private router = inject(Router)

    public login(credentials: { email: string; password: string}): Observable<User> {
        return this.httpClient.post<User>(this.baseUrl + "/login", credentials).pipe(
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

    refreshToken() {
        return this.httpClient.post(this.baseUrl + "/refresh", null, { withCredentials: true });
    }

    isLoggedIn() {
        const userJSON = localStorage.getItem("user");
        if (userJSON) {
            return true
        }
        return false;
    }

    logOut() {
        localStorage.removeItem("user");
        this.router.navigate(['/login']);
    }

    getEmail(): string {
        const userJSON = localStorage.getItem("user");
        return JSON.parse(userJSON!).email;
    }

    getRole(): string {
        const userJSON = localStorage.getItem("user");
        return JSON.parse(userJSON!).role;
    }
}
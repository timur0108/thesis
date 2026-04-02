import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, pipe, tap } from "rxjs";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

import { Session } from "./session";

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    private readonly baseUrl: string = `${environment.apiUrl}/session`;

    private httpClient = inject(HttpClient);
    
    public getAll(): Observable<Session[]> {
        return this.httpClient.get<Session[]>(this.baseUrl + '/all');
    }

   
}
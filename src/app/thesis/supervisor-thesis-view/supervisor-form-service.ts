import { inject, Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SupervisorForm } from "./supervisor-form";



@Injectable({
    providedIn: 'root'
})
export class SupervisorFormService {


    private readonly baseUrl: string = 'http://localhost:8080/api/supervisor-form';

    private httpClient: HttpClient = inject(HttpClient);

    getSupervisorForm(thesisId: number): Observable<SupervisorForm> {
        return this.httpClient.get<SupervisorForm>(this.baseUrl + "/" + thesisId);
    }
}
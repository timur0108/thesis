import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Thesis } from "../thesis/thesis";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ThesisesService {
    private readonly baseURL = "http://localhost:8080/api/thesis";

    private httpClient: HttpClient = inject(HttpClient);

    public getAllThesises(): Observable<Thesis[]> {
        return this.httpClient.get<Thesis[]>(this.baseURL + "/all");
    }
}
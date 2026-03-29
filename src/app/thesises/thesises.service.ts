import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Thesis } from "../thesis/thesis";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ThesisesService {
    private readonly baseURL = `${environment.apiUrl}/thesis`;

    private httpClient: HttpClient = inject(HttpClient);

    public getAllThesises(): Observable<Thesis[]> {
        return this.httpClient.get<Thesis[]>(this.baseURL + "/all");
    }
}
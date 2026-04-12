import { inject, Injectable } from "@angular/core";
import { NewThesisDTO, Thesis } from "./thesis";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ThesisCreateDTO } from "../add-thesis-dialog/thesis-create-dto";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ThesisService {

    private readonly baseUrl: string = `${environment.apiUrl}/thesis`;
    private httpClient = inject(HttpClient);

    public getThesisById(id: number): Observable<Thesis> {
        return this.httpClient.get<Thesis>(this.baseUrl  + "/" + id);
    }

    public createThesis(dto: ThesisCreateDTO): Observable<void> {
        return this.httpClient.post<void>(this.baseUrl, dto);
    }

    public getAssignedReviews(): Observable<Thesis[]> {
        return this.httpClient.get<Thesis[]>(this.baseUrl + '/review');
    }

    public getSupervised(): Observable<Thesis[]> {
        return this.httpClient.get<Thesis[]>(this.baseUrl + '/supervised');
    }

    public getCommittee(): Observable<Thesis[]> {
        return this.httpClient.get<Thesis[]>(this.baseUrl + '/committee');
    }

    public getAssigned(): Observable<Thesis[]> {
        return this.httpClient.get<Thesis[]>(this.baseUrl + '/all/assigned')
    }

    public addToSession(dto: NewThesisDTO): Observable<void> {
        return this.httpClient.post<void>(this.baseUrl + '/add-to-session', dto);
        }
}
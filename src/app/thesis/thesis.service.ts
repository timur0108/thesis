import { inject, Injectable } from "@angular/core";
import { Thesis } from "./thesis";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ThesisCreateDTO } from "../add-thesis-dialog/thesis-create-dto";

@Injectable({
    providedIn: 'root'
})
export class ThesisService {

    private readonly baseUrl: string = 'http://localhost:8080/api/thesis';
    private httpClient = inject(HttpClient);

    public getThesisById(id: number): Observable<Thesis> {
        return this.httpClient.get<Thesis>(this.baseUrl  + "/" + id);
    }

    public createThesis(dto: ThesisCreateDTO): Observable<void> {
    return this.httpClient.post<void>(this.baseUrl, dto);
  }
}
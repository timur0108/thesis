import { inject, Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { catchError, of } from 'rxjs';
import { environment } from "../../../environments/environment";
import { Student } from "./student";


@Injectable({
    providedIn: 'root'
})
export class StudentService {


    private readonly baseUrl: string = `${environment.apiUrl}/student`;

    private httpClient: HttpClient = inject(HttpClient);

   public getAll(): Observable<Student[]> {
        return this.httpClient.get<Student[]>(this.baseUrl + '/all');
   }
}
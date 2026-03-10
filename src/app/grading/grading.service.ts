import { inject, Injectable } from "@angular/core";
import { ReviewerGrade } from "./grade";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GradingService {


    private readonly baseUrl: string = 'http://localhost:8080/api/grade';

    private httpClient: HttpClient = inject(HttpClient);

    submitReviewerGrade(grade: ReviewerGrade): Observable<ReviewerGrade> {
        return this.httpClient.post<ReviewerGrade>(this.baseUrl + '/reviewer', grade);
    }

    getReviewerGrade(theisId: number): Observable<ReviewerGrade> {
        return this.httpClient.get<ReviewerGrade>(this.baseUrl + "/reviewer/" + theisId);
    }
}
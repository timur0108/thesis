import { inject, Injectable } from "@angular/core";
import { ReviewerGrade } from "./grade";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class GradingService {


    private readonly baseUrl: string = 'http://localhost:8080/api/grade';

    private httpClient: HttpClient = inject(HttpClient);

    submitReviewerGrade(grade: ReviewerGrade) {
        return this.httpClient.post(this.baseUrl + '/reviewer', grade);
    }
}
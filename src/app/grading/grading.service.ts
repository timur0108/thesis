import { inject, Injectable } from "@angular/core";
import { FinalGrade, ReviewerGrade } from "./grade";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CommitteeMemberGrade } from "../thesis/committee-member-thesis-view/committee.member.grade";
import { SupervisorForm } from "../thesis/supervisor-thesis-view/supervisor-form";
import { catchError, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GradingService {


    private readonly baseUrl: string = 'http://localhost:8080/api/grade';
    private readonly finalGradeBaseUrL: string = 'http://localhost:8080/api/final-grade';

    private httpClient: HttpClient = inject(HttpClient);

    submitReviewerGrade(grade: ReviewerGrade): Observable<ReviewerGrade> {
        return this.httpClient.post<ReviewerGrade>(this.baseUrl + '/reviewer', grade);
    }

    getReviewerGrade(theisId: number): Observable<ReviewerGrade> {
        return this.httpClient.get<ReviewerGrade>(this.baseUrl + "/reviewer/" + theisId);
    }

    getCommitteeMemberOwnnGrade(thesisId: number): Observable<CommitteeMemberGrade> {
        return this.httpClient.get<CommitteeMemberGrade>(this.baseUrl + "/committee-member/own-grade/" + thesisId);
    }

    getCommitteeMemberGradesOfOtherMembers(theisId: number): Observable<CommitteeMemberGrade[]> {
        return this.httpClient.get<CommitteeMemberGrade[]>(this.baseUrl + "/committee-member/other-members/" + theisId);
    }

    submitCommitteeMemberGrade(grade: CommitteeMemberGrade) {
        return this.httpClient.post<CommitteeMemberGrade>(this.baseUrl + "/committee-member", grade);
    }

    getAllCommitteeMemberGrades(thesidId: number): Observable<CommitteeMemberGrade[]> {
        return this.httpClient.get<CommitteeMemberGrade[]>(this.baseUrl + "/committee-member/" + thesidId + "/all");
    }

    makeGradesVisible(thesisId: number): Observable<CommitteeMemberGrade[]> {
        return this.httpClient.post<CommitteeMemberGrade[]>(this.baseUrl + "/make-visible/" + thesisId, null);
    }

    hideGrades(thesisId: number): Observable<CommitteeMemberGrade[]> {
        return this.httpClient.post<CommitteeMemberGrade[]>(this.baseUrl + "/hide/" + thesisId, null);
    }

    changeGrade(grade: CommitteeMemberGrade): Observable<CommitteeMemberGrade> {
        return this.httpClient.put<CommitteeMemberGrade>(this.baseUrl + "/committee-member", grade);
    }

    submitFinalGrade(finalGrade: FinalGrade): Observable<FinalGrade> {
        return this.httpClient.post<FinalGrade>(this.finalGradeBaseUrL, finalGrade);
    }

    getFinalGrade(thesisId: number): Observable<FinalGrade | null> {
    return this.httpClient.get<FinalGrade>(`${this.finalGradeBaseUrL}/${thesisId}`).pipe(
        catchError(err => {
        if (err.status === 404) {
            return of(null);
        }
        throw err;
        })
    );
    }
}
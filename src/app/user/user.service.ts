import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./user";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly baseURL = `${environment.apiUrl}/user`;

    private httpClient: HttpClient = inject(HttpClient);

    public getAll(): Observable<User[]> {
        return this.httpClient.get<User[]>(this.baseURL + "/all");
    }

    getUnsubmittedCommitteeMembers(thesisId: number): Observable<User[]> {
        return this.httpClient.get<User[]>(this.baseURL + "/committee-members/unsubmitted/" + thesisId);
    }

    getCommitteeMembersBySession(sessionId: number): Observable<User[]> {
        return this.httpClient.get<User[]>(this.baseURL + '/committee-members/for-session/' + sessionId);
    }

    getHeadOfCommitteeBySession(sessionId: number): Observable<User> {
        return this.httpClient.get<User>(this.baseURL + '/head-of-committee/for-session/' + sessionId);
    } 
}
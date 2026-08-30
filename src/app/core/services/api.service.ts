import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environment/environment';
import { LetterOfCredit } from '../models/letter-of-credit.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getLettersOfCredit(): Observable<LetterOfCredit[]> {
    return this.http.get<LetterOfCredit[]>(`${this.baseUrl}/lettersofcredit`)
      .pipe(catchError(this.handleError));
  }

  submitLetterOfCredit(payload: LetterOfCredit): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/lettersofcredit`, payload)
      .pipe(catchError(this.handleError));
  }

  login(payload: { loginId: string; password: string }): Observable<any> {
  return this.http.post(`${this.baseUrl}/auth/login`, payload)
    .pipe(catchError(this.handleError));
}

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred.';
    if (error.status === 0) {
      errorMessage = 'Cannot reach the server. Please check your connection.';
    } else if (error.status === 400) {
      errorMessage = 'Bad request — please check your input.';
    } else if (error.status === 401) {
      errorMessage = 'Unauthorized — please log in again.';
    } else if (error.status === 500) {
      errorMessage = 'Server error — please try again later.';
    }
    return throwError(() => new Error(errorMessage));
  }
}
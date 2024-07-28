// src/app/services/todo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'https://joldibaev.uz/api/todos';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private get headers() {
    return new HttpHeaders({
      'Authorization': `Token ${this.authService.getToken()}`
    });
  }

  getTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  getTodo(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  createTodo(todo: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, todo, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  updateTodo(id: string, todo: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, todo, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  deleteTodo(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error.message || 'Server error');
  }
}

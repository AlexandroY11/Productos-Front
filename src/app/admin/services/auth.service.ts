import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = 'http://localhost/api'; // Cambia esto por la URL de tu API Laravel
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token); // Almacena el token JWT en localStorage
          this.loggedIn.next(true); // Marca como autenticado
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token'); // Elimina el token JWT del localStorage
    this.loggedIn.next(false); // Marca como no autenticado
    this.router.navigate(['/']); // Redirige al usuario a la página principal o a donde desees
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}

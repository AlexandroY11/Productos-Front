import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService) { }

  login(): void {
    const { email, password } = this.loginData; // Extrae email y password del objeto loginData
    this.authService.login(email, password).subscribe({
      next: () => {
        // Aquí puedes redirigir a la página de productos o a donde desees después del login
      },
      error: (error) => {
        // Manejo de errores, por ejemplo, mostrar un mensaje al usuario
        console.error('Error en el login:', error);
      }
    });
  }
}

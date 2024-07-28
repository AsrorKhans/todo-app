import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(loginForm: NgForm): void {
    const { email, password } = loginForm.value;
    // this.router.navigate(['/todos'])
    this.authService.login(email, password).subscribe({
      next: () => this.router.navigate(['/todos']),
      error: err => this.errorMessage = 'Invalid login credentials'
    });
  }
}

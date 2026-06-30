import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-component',
  imports: [FormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private auth: AuthService) {}

  onLogin() {
    this.auth.login({
      username: this.username,
      password: this.password
    }).subscribe((res: any) => {
      this.auth.saveToken(res.access_token);
      console.log('Login successful');
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminAuthService } from '../service/admin-auth.service';
import { Router } from '@angular/router';
import { UserAuthService } from '../service/user-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  show: boolean = false;

  constructor(private auth: UserAuthService, private router: Router) { }

  log = {
    username: '',
    password: '',
    email: ''
  }

  register() {
    if (this.log.username.length > 0 && this.log.password.length > 0 && this.log.email.length > 0) {
      this.auth.reg(this.log).subscribe(data => {
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data));

        this.auth.isAuthenticated();
        this.router.navigate(['']);
      }, error => {
        console.log(error);
      })
    }
  }

  login() {
    if (this.log.password.length > 0 && this.log.email.length > 0) {
      this.auth.login(this.log).subscribe(user => {
        console.log(user);
        localStorage.setItem('user', JSON.stringify(user));
        this.auth.isAuthenticated();

        this.router.navigate(['']);
      }, error => {
        console.log(error);
      });
    }
  }



}

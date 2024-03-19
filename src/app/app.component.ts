import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { UserAuthService } from './service/user-auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ReplicaGifts';


  constructor(private user: UserAuthService, private router: Router) { }

  isAuth: boolean = false;

  ngOnInit() {
    this.user.isAuthenticated();

    this.user.isAuthenticatedValue.subscribe(value => {
      this.isAuth = value;
    })

  }

  navToLogin() {
    this.router.navigate(['/login']);
  }

  navToProfile() {
    this.router.navigate(['/profile']);

  }

  navCart() {
    this.router.navigate(['/cart']);
  }

  navWish() {
    this.router.navigate(['/wish']);
  }

  nav() {
    this.router.navigate([''])
  }

}

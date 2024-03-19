import { Component } from '@angular/core';
import { UserAuthService } from '../service/user-auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  constructor(private userService: UserAuthService) { }

  user: any;

  orders: any[] = [];
  address: any[] = [];

  ngOnInit() {
    this.userService.getUser().subscribe((user: any) => {
      this.orders = user.orders
      this.address = user.address

      this.user = user;

    })
  }

}

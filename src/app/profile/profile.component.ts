import { Component } from '@angular/core';
import { UserAuthService } from '../service/user-auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  constructor(private userService: UserAuthService, private profile: ProfileService) { }

  user: any;

  edit: boolean = false;

  orders: any[] = [];
  address: any[] = [];

  billingDetails = {
    name: '',
    email: '',
    city: '',
    country: '',
    address: '',
    postcode: '',
    phone: ''
  }

  ngOnInit() {
    this.get()
  }

  get() {
    this.edit = false
    this.userService.getUser().subscribe((user: any) => {
      this.orders = user.orders
      this.address = user.address

      this.user = user;

    })
  }

  addAddress() {
    this.profile.addAddress(this.billingDetails).subscribe(response => {
      this.get()
      console.log(response);
    });
  }

}

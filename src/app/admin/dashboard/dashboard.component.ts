import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private router: Router) { }


  dashboardOptions = [
    { link: '/admin/product-view', name: 'Edit Product', icon: 'bi-pencil-square' },
    { link: '/admin/product-manipulate', name: 'Add Product', icon: 'bi-plus-square' },
    { link: '/admin/category', name: 'Category', icon: 'bi-plus-square' },
    { link: '/admin/category?printType=true', name: 'Print Type', icon: 'bi-plus-square' },
    { link: '/admin/orders', name: 'Orders', icon: 'bi-cart-plus' },
    { link: '/admin/gifts', name: 'Gifts', icon: 'bi-cart-plus' },
    { link: '/admin/purchased-user', name: 'Purchased User', icon: 'bi-person-check-fill' },
    { link: '/admin/product-view?outOfStock=true', name: 'Out Of Stack Product', icon: 'bi-cart-dash' },
    { link: '/admin/purchased-user?returned=true', name: 'Returned Orders', icon: 'bi-arrow-return-left' },
  ]

  nav(link: string) {

    this.router.navigateByUrl(link);
  }



}

import { Component } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../service/product.service';
import { WishService } from '../service/wish.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  constructor(private category: CategoryService, private product: ProductService, private router: Router, private wish: WishService) { }

  categories: any[] = [];

  trending: any[] = [];
  newProduct: any[] = [];


  ngOnInit() {
    this.category.getCategory().subscribe((category: any) => this.categories = category);
    this.product.getTrending().subscribe((trending: any) => this.trending = trending);
    this.product.getNew().subscribe((trending: any) => this.newProduct = trending);
  }

  nav(id: any) {

    this.router.navigateByUrl(`/product/${id}`)
  }

  addWish(id: any) {

    this.wish.addWish(id).subscribe((wish: any) => { console.log(wish) });

  }

  navToCategory(id: any) {
    this.router.navigateByUrl(`/papular-category/${id}`)

  }

}

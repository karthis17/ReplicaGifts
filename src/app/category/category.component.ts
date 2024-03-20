import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../service/category.service';
import { ProductService } from '../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WishService } from '../service/wish.service';
import { Product } from '../model/product.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  constructor(private category: CategoryService, private product: ProductService, private router: Router, private route: ActivatedRoute, private wish: WishService) { }
  private unsubscribe$: Subject<void> = new Subject<void>();

  categories: any[] = [];

  products: Product[] = [];

  categoryId: any;
  ngOnInit() {

    this.route.params.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(params => {
      this.categoryId = params['id'];
      console.log(this.categoryId);
      if (this.categoryId) {
        this.product.getProductCategoryWise(this.categoryId).pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe((res: Product[]) => {
          this.products = res;
          console.log(this.products);
        });
      }
    });

    this.category.getCategory().subscribe((category: any) => this.categories = category);
  }

  nav(id: any) {

    this.router.navigateByUrl(`/product/${id}`)
  }

  addWish(id: any) {

    this.wish.addWish(id).subscribe((wish: any) => { console.log(wish) });

  }
}

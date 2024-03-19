import { Component } from '@angular/core';
import { ProductService } from '../service/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  constructor(public productService: ProductService, private router: ActivatedRoute, private cart: CartService) { }

  productId: any;

  data!: Product;

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.productId = params['id'];
      console.log(this.productId)
      if (this.productId) {
        this.productService.getProduct(params['id']).subscribe((res: Product) => {

          this.data = res;
          console.log(this.data);

        })

      }
    });
  }

  frameDeatails = {
    userImage: '',
    printType: '',
    size: '',
    quantity: 1,
  }

  addFile(e: any) {
    this.frameDeatails.userImage = e.target.files[0];
  }


  addCart(id: any) {

    if (this.frameDeatails.printType !== '' && this.frameDeatails.size !== '') {
      this.cart.addToCart(id, this.frameDeatails.quantity).subscribe(dat => { console.log(dat) });

      this.cart.addFrame(this.frameDeatails, id).subscribe(dat => { console.log(dat) });
    }

  }
}

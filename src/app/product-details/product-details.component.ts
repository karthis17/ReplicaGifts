import { Component, SimpleChanges } from '@angular/core';
import { ProductService } from '../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/product.model';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../service/cart.service';
import { Subject, takeUntil } from 'rxjs';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule, StarRatingComponent, ReactiveFormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  constructor(public productService: ProductService, private route: ActivatedRoute, private cart: CartService, private router: Router) { }
  private unsubscribe$: Subject<void> = new Subject<void>();
  productId: any;



  new_review: string = "karthi";

  rating!: number;
  reviews!: any;
  comment = new FormControl('', Validators.required)



  getrating(rating: number) {
    this.rating = rating;
  }

  addrating() {

    if (this.comment.valid && this.comment.value) {
      this.productService.addreview(this.data._id, this.comment.value, this.rating).subscribe((review: any) => {
        this.data = review;
      });
    }
  }





  data: Product = {
    title: '',
    description: '',
    price: 0,
    discount: 0,
    thumbnail: '',
    userImage: false,
    images: [],
    additionalInfo: [] as any,
    quantity: 0,
    availablePrintSize: [] as any,
    availablePrintType: [],
    reviews: [] as any,
  };

  ngOnInit(): void {
    this.rating = 0;
    this.route.params.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(params => {
      this.productId = params['id'];
      console.log(this.productId);
      if (this.productId) {
        this.productService.getProduct(this.productId).pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe((res: Product) => {
          this.data = res;
          console.log(this.data);
        });
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
      this.cart.addFrame(this.frameDeatails, id).subscribe((dat: any) => {
        console.log(dat);
        this.cart.addToCart(id, this.frameDeatails.quantity, dat._id).subscribe(dat => { console.log(dat) });
        this.frameDeatails = {
          userImage: '',
          printType: '',
          size: '',
          quantity: 1,
        };
      });
    }

  }


  buyNow(id: any) {
    if (this.frameDeatails.printType !== '' && this.frameDeatails.size !== '') {

      this.cart.addFrame(this.frameDeatails, id).subscribe((dat: any) => {
        console.log(dat);
        this.router.navigateByUrl(`/buy-now/${dat._id}`);
      });
    }
  }

}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../model/product.model';
import { ActivatedRoute, Router, createUrlTreeFromSnapshot } from '@angular/router';
import { ProductService } from '../service/product.service';
import { Subject, takeUntil, window } from 'rxjs';
import { CartService } from '../service/cart.service';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../service/payment.service';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: 'app-delevery-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './delevery-details.component.html',
  styleUrl: './delevery-details.component.css'
})
export class DeleveryDetailsComponent {

  constructor(private Profile: ProfileService, private router: Router, private route: ActivatedRoute, private cart: CartService, private payment: PaymentService) { }
  private unsubscribe$: Subject<void> = new Subject<void>();

  billingDetails = {
    name: '',
    email: '',
    city: '',
    country: '',
    address: '',
    postcode: '',
    phone: '',
    state: ''
  }


  totalPrice = 0;

  shoppingCart: any;

  product!: Product;

  quantity!: number;

  detailId: any;

  gifts: any[] = [];

  checkoutData: any;

  ngOnInit() {
    this.totalPrice = 0;
    this.route.params.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(params => {
      this.detailId = params['id'];
      console.log(this.detailId);
      if (this.detailId) {
        this.cart.getFrame(this.detailId).pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe((res) => {
          if (res.success) {

            this.product = res.product;
            this.quantity = res.quantity;
            this.gifts = res.gifts;

            this.totalPrice = res.total;
            console.log(this.product);
          } else {
            this.router.navigate([''])
          }
        });
      } else {
        this.cart.getCart().subscribe(res => {
          this.shoppingCart = res;
          this.shoppingCart.map((cart: any) => {
            this.totalPrice += cart.userWant.totalAmount;
            this.gifts = cart.userWant.gifts;
          })
        });
      }
    });

    this.Profile.getAddress().subscribe((res: any) => {
      if (res.success) {
        this.billingDetails = res.data
      }
    });


  }



  checkout() {

    if (this.detailId) {
      this.checkoutData = { data: this.billingDetails, frameId: [this.detailId], name: 'Replica Gifts', amount: this.totalPrice, description: "Replica gifts" };

    } else {
      this.checkoutData = { data: this.billingDetails, frameId: this.shoppingCart.map((cart: any) => cart.userWant), name: 'Replica Gifts', amount: this.totalPrice, description: "Replica gifts" }
    }


    this.payment.createOrder(this.checkoutData).subscribe(res => {
      if (res.success) {
        // Handle payment success
        console.log(res);
        let options = {
          "key": res.key_id,
          "amount": `${res.amount}`,
          "currency": "INR",
          "name": res.product_name,
          "description": res.description,
          "image": "https://dummyimage.com/600x400/000/fff",
          "order_id": res.order_id,
          "handler": (response: any) => {
            this.handlePaymentSuccess(response, res);
          },
          "prefill": {
            "contact": res.contact,
            "name": res.name,
            "email": res.email
          },
          "notes": {
            "description": res.description
          },
          "theme": {
            "color": "#2300a3"
          }
        };


        this.payment.initializeRazorpay(options);
        this.payment.openPayment()


      } else {
        alert(res.msg);
      }
    },
      error => {
        console.error(error);
        alert('An error occurred');
      }
    );


  }

  handlePaymentSuccess(response: any, paymentResponse: any) {
    // Payment succeeded
    console.log("Payment succeeded");
    console.log(response);

    // Verify payment signature
    this.payment.verifySignature(response.razorpay_order_id, response.razorpay_payment_id, response.razorpay_signature, paymentResponse.frameDetails).subscribe(payment => {
      console.log(payment);
      alert("Payment Succeeded" + response.order_id);
      this.router.navigate(['/']);
    })
  }

}


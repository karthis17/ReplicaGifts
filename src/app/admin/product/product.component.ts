import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { CategoryService } from '../../service/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../model/product.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  constructor(private product: ProductService, private category: CategoryService, private route: ActivatedRoute, private router: Router) { }
  data: Product = {

    title: '',
    description: '',
    price: 0,
    discount: 0,
    thumbnail: '',
    userImage: false,
    images: [""],

    additionalInfo: [{
      title: '',
      description: ''
    }],
    quantity: 1,

    availablePrintSize: [{
      width: 0,
      height: 1
    }],

    availablePrintType: []
  }



  categories: any[] = [];

  ngOnInit() {

    this.category.getCategory().subscribe((data: any) => { this.categories = data; console.log(data) });
    this.route.queryParams.subscribe(params => {
      this.showUpdate = params['edit'];
      console.log(params['edit']);

      if (this.showUpdate) {
        this.product.getProduct(this.showUpdate).subscribe(product => {
          console.log(product);
          this.data = product
          this.idToUpdate = product._id
          this.data.availablePrintType = product.availablePrintType.map(p => p._id)
        })

      } else {
        this.getAll()
      }

    });


  }

  showUpdate: any = false;

  products: any[] = [];


  addThub(e: any) {
    console.log(e);
    this.data.thumbnail = e.target.files[0];
  }

  addImage(e: any, i: any) {
    console.log(e);
    this.data.images[i] = e.target.files[0];
  }


  trackByFn(index: any, item: any) {
    return index;
  }


  getAll() {
    this.product.get().subscribe((data: any) => this.products = data.product)
  }



  delete(id: any) {
    console.log(id);
    this.product.delete(id).subscribe(data => console.log(data));
  }


  idToUpdate: any;



  update() {

    this.product.edit(this.data, this.idToUpdate).subscribe(data => { console.log(data) })

  }

  close() {
    this.router.navigate(['admin']);
  }

  submit() {

    console.log(this.data)
    this.product.addProduct(this.data).subscribe(data => console.log(data));
  }

}

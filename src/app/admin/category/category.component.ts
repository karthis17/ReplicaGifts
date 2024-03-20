import { Component } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  constructor(private category: CategoryService) { }


  data = {
    categoryName: '',
    description: '',
    thumbnail: ''
  }

  addThub(e: any) {
    this.data.thumbnail = e.target.files[0];
  }

  submit() {
    console.log(this.data)

    this.category.addProduct(this.data).subscribe(data => {
      console.log(data);
      this.data = {
        categoryName: '',
        description: '',
        thumbnail: ''
      }
    })
  }

}

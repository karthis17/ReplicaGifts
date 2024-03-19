import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private http: HttpClient) { }

  _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };


  addProduct(data: any) {

    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("userImage", data.userImage);
    formData.append("discount", data.discount);
    formData.append("description", data.description);
    formData.append("additionalInfo", JSON.stringify(data.additionalInfo));
    formData.append("availablePrintSize", JSON.stringify(data.availableSize));

    data.availablePrintType.forEach((d: any) => {

      formData.append("availablePrintType", d);
    })
    formData.append("quantity", data.quantity);
    formData.append("thumbnail", data.thumbnail);

    data.images.forEach((element: any) => {
      formData.append("images", element);
    });

    const token1: string | null = localStorage.getItem('token1');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token1 ? JSON.parse(token1).token : ""}` }) };


    return this.http.post("http://localhost:3000/api/products/add-product", formData, _options)


  }


  get() {
    return this.http.get("http://localhost:3000/api/products/all");
  }

  edit(data: any, id: any) {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("userImage", data.userImage);
    formData.append("discount", data.discount);
    formData.append("description", data.description);
    formData.append("additionalInfo", JSON.stringify(data.additionalInfo));
    formData.append("availablePrintSize", JSON.stringify(data.availableSize));

    data.availablePrintType.forEach((d: any) => {

      formData.append("availablePrintType", d);
    })
    formData.append("quantity", data.quantity);
    formData.append("thumbnail", data.thumbnail);

    data.images.forEach((element: any) => {
      formData.append("images", element);
      // if (typeof element !== "string") {

      //   formData.append("new_image", element);
      //   console.log(element)
      // }
    });




    const token1: string | null = localStorage.getItem('token1');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token1 ? JSON.parse(token1).token : ""}` }) };


    return this.http.put("http://localhost:3000/api/products/update/" + id, formData, _options);

  }

  delete(id: any) {

    const token1: string | null = localStorage.getItem('token1');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token1 ? JSON.parse(token1).token : ""}` }) };



    return this.http.delete("http://localhost:3000/api/products/delete/" + id, _options);

  }


  getTrending() {
    return this.http.get("http://localhost:3000/api/products/trending-products");
  }
  getNew() {
    return this.http.get("http://localhost:3000/api/products/new-arrivals");
  }

  getProduct(id: any) {
    return this.http.get<Product>("http://localhost:3000/api/products/data/" + id);
  }

}

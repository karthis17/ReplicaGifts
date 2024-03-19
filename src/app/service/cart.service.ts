import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient) { }


  addToCart(id: any, quantity: any) {

    console.log(quantity)




    const token: string | null = localStorage.getItem('user');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };


    return this.http.post("http://localhost:3000/api/carts/add-cart/" + id, { quantity }, _options)

  }

  addFrame(frameDeatails: any, id: any) {
    const formData = new FormData();

    formData.append('quantity', frameDeatails.quantity);
    formData.append('printType', frameDeatails.printType);
    formData.append('userImage', frameDeatails.userImage);
    formData.append('size', frameDeatails.size);
    formData.append('product', id);

    const token: string | null = localStorage.getItem('user');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };


    return this.http.post("http://localhost:3000/api/frame/add-frame", formData, _options)

  }

  getCart() {
    const token: string | null = localStorage.getItem('user');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };


    return this.http.get("http://localhost:3000/api/carts/get-cart/", _options)
  }

  remove(id: any) {
    const token: string | null = localStorage.getItem('user');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };


    return this.http.delete("http://localhost:3000/api/carts/remove-item/" + id, _options)
  }

}

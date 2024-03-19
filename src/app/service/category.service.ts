import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };


  addProduct(data: any) {

    const formData = new FormData();

    formData.append("categoryName", data.categoryName);
    formData.append("description", data.description);

    formData.append("thumbnail", data.thumbnail);

    const token: string | null = localStorage.getItem('token');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };


    return this.http.post("http://localhost:3000/api/category/add-category", formData, _options)


  }

  getCategory() {
    return this.http.get("http://localhost:3000/api/category/all")
  }

}

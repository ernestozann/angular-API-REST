import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { retry } from 'rxjs/operators'

import { Product, CreateProductDTO, UpdateProductDTO } from './../models/product.model';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  //original api https://young-sands-07814.herokuapp.com
  private apiURL: string = `${environment.API_URL}/api/products`

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit?: number, offset?:number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit)
      params = params.set('offset', offset)
    }
    return this.http.get<Product[]>(this.apiURL, {params})
    .pipe(
      retry(3)
    );
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiURL}/${id}`)
  }

  getProductsByPage(limit: number, offset:number) {
    return this.http.get<Product[]>(`${this.apiURL}`, {
      params: {limit, offset}
    })
  }

  create(dto: CreateProductDTO) {
    return this.http.post<Product>(this.apiURL, dto)
  }

  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiURL}/${id}`, dto)
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiURL}/${id}`)
  }
}

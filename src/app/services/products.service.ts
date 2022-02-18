import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators'

import { Product, CreateProductDTO, UpdateProductDTO } from './../models/product.model';

import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  //original api https://young-sands-07814.herokuapp.com
  // private apiURL: string = `${environment.API_URL}/api/products`
  private apiURL: string = `https://young-sands-07814.herokuapp.com/api/products`

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
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError('el server no esta, el server se fue')
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError('no hay, no existe, son mentiras del gobierno')
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError('Authorized personal only')
        }
        return throwError('ups algo salio mal')
      })
    )
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

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllProducts, product } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private clint:HttpClient) { }

  getAllProducts():Observable<AllProducts>{

    return this.clint.get<AllProducts>('https://dummyjson.com/products?limit=0')
  }

  getAllCategories():Observable<string[]>{

    return this.clint.get<string[]>('https://dummyjson.com/products/category-list')
  }

  getCategoryData(catName:string):Observable<AllProducts>{

    return this.clint.get<AllProducts>(`https://dummyjson.com/products/category/${catName}`)
  }
}

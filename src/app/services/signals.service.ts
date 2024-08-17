import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalsService {

  constructor() { }

  productsInCart$=new BehaviorSubject<number>(0)

  userLogin$=new BehaviorSubject<boolean>(false)

  productSearch$=new BehaviorSubject<string>("")
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { login, loginResponse } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  constructor(private clint:HttpClient) { }

  userLogin(data:login):Observable<loginResponse>{

    return this.clint.post<loginResponse>('https://dummyjson.com/auth/login',data)
  }
}

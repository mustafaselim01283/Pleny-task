import { Component, OnInit } from '@angular/core';
import { SignalsService } from '../services/signals.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  ngOnInit(): void {

   
   this.signals.userLogin$.subscribe((data)=>{
    this.userIsLoged=data
    console.log();
    
   })

   if(localStorage.getItem("userToken")){
    this.userIsLoged=true
   }

    
    this.signals.productsInCart$.subscribe((data)=>{
      this.productInCart=data
    })

  }
  constructor(private signals:SignalsService){}

  productInCart:number=0
  
  userIsLoged:boolean=false

  productNameSearch(e:Event){

    e.preventDefault()

    let name = (e.target as HTMLInputElement).value.toLowerCase()

    this.signals.productSearch$.next(name)
  }
  
}

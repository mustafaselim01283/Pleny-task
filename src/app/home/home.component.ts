import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { product } from '../interfaces/interface';
import { FormControl, FormGroup } from '@angular/forms';
import { SignalsService } from '../services/signals.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {

    // get all categories names when component open
    this.getCategories()

    // this method get all products by defult when home component open 
    this.filltration()


    // subscribe on any change in navbar search input and fire search method
    this.signals.productSearch$.subscribe((data) => {

      this.searchByProductName(data)
    })
  }

  products: product[] = []
  productsSearch: product[] = []
  categories: string[] = []
  pageNo: number = 1
  cart: product[] = []
  categoryName: string = "All Products"


  constructor(private productServices: ProductsService, private signals: SignalsService) { }

  // form to get category name when user use filtration
  filterForm = new FormGroup({
    category: new FormControl<string>("")
  })

  // method to get all products
  getProducts() {

    this.productServices.getAllProducts().subscribe((data) => {

      this.products = data.products
      this.productsSearch = data.products

    })
  }

  // method to get all categories names to show them in filter section
  getCategories() {

    this.productServices.getAllCategories().subscribe((data) => {

      this.categories = data

    })
  }

  // method to get product by category name depends on the filter
  filltration() {

    let catName: string = this.filterForm.controls.category.value!

    if (catName.length < 2) {

      // if category filter form is empty we will get all products again
      this.getProducts()
    } else {
      this.productServices.getCategoryData(catName).subscribe((data) => {
        this.products = data.products
        this.productsSearch = data.products
        console.log(this.products);
        this.categoryName = catName
      })
    }

  }

  // method to add products to the cart
  addToCart(pro: product) {

    //  check if the product is alrady in the cart 
    if (!this.cart.includes(pro)) {

      this.cart.push(pro)
    } else {
      window.alert("this product already in cart")
    }

    // notify the productsInCart signal to change his number to show it in navbar 
    this.signals.productsInCart$.next(this.cart.length)


  }

  // method for searching by product name its argument value will coming from navbar combonent throw the productSearch$ signal
  searchByProductName(name: string) {

    if (name.length < 1) {
      this.productsSearch = this.products
    } else {
      this.productsSearch = []
      this.products.forEach((pro) => {
        if (pro.title.toLowerCase().includes(name)) {
          this.productsSearch.push(pro)
        }
      })
    }


  }
}

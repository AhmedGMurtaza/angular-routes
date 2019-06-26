import { Component } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';

import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  pageTitle = 'Product Detail';
  product: Product;
  errorMessage: string;

  constructor(private productService: ProductService,
    private route:ActivatedRoute) { 

      // one way of reading route params:
      console.log(this.route.snapshot.paramMap.get('id'))
      //second way of ready route params
      this.route.paramMap.subscribe(params=>{
        console.log(params.get('id'))
      })
  }

  getProduct(id: number) {
    this.productService.getProduct(id).subscribe(
      product => this.onProductRetrieved(product),
      error => this.errorMessage = <any>error);
  }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { MessageService } from '../../messages/message.service';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit{
  pageTitle = 'Product Edit';
  errorMessage: string;

  product: Product; // product type is coming from "Product interface"

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router:Router) { 
}

ngOnInit():void{
  this.route.paramMap.subscribe(
    function(params){
      const id = +params.get('id');
      alert(params.get('image')) //this is optional paramter passed
      this.getProduct(id);
    }.bind(this)
  )
}

  getProduct(id: number): void {
    this.productService.getProduct(id)
      .subscribe(
        function(product: Product){this.onProductRetrieved(product)}.bind(this),
        function(error: any){this.errorMessage = <any>error}.bind(this)
      );
  }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (!this.product) {
      this.pageTitle = 'No product found';
    } else { 
      if (this.product.id === 0) {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${this.product.productName}`;
      }
    }
  }

  deleteProduct(): void {
    if (this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete(`${this.product.productName} was deleted`);
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id)
          .subscribe(
            () => this.onSaveComplete(`${this.product.productName} was deleted`),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  saveProduct(): void {
    if (true === true) {
      if (this.product.id === 0) {
        this.productService.createProduct(this.product)
          .subscribe(
            () => this.onSaveComplete(`The new ${this.product.productName} was saved`),
            (error: any) => this.errorMessage = <any>error
          );
      } else {
        this.productService.updateProduct(this.product)
          .subscribe(
            () => this.onSaveComplete(`The updated ${this.product.productName} was saved`),
            (error: any) => this.errorMessage = <any>error
          );
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(message?: string): void {
    if (message) {
      this.messageService.addMessage(message);
    }

    // Navigate back to the product list
    this.router.navigate(['/products'])    
  }
}

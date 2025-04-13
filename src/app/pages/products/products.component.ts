import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './product-item/product-item.component';
import { PRODUCTS } from './product-item/mock-data';

export interface Product {
  id: number;
  name: string;
  inStock: boolean;
  quantity: number;
}

@Component({
  selector: 'app-products',
  imports: [CommonModule, ProductItemComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})

export class ProductsComponent {
  products: Product[] = PRODUCTS;

  handleAddToCart(product: Product) {
    console.log('Kosárba rakva:', product.name);
  }

  
  outOfStock(product: Product) {
    if(product.quantity == 0) {
      product.inStock = false
    } else {
      product.inStock = true
    }
  }

  trackBy(index: number, item: Product): number {
    return item.id;
  }
}
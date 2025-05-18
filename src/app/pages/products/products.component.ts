import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './product-item/product-item.component';
import { PRODUCTS } from './product-item/mock-data';
import { AuthService } from '../../shared/services/auth.service';
import { User as FirebaseUser } from '@angular/fire/auth';

export interface Product {
  id: number;
  name: string;
  price: number;
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
  currentUser: FirebaseUser | null = null;

  constructor(private authService: AuthService) {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  handleAddToCart(product: Product) {
    console.log('Kosárba rakva:', product.name);
  }

  trackBy(index: number, item: Product): number {
    return item.id;
  }
}

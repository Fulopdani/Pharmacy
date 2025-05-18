import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Product } from '../products.component';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from '../../../highlight.directive';
import { AuthService } from '../../../shared/services/auth.service';
import { User as FirebaseUser } from '@angular/fire/auth';

@Component({
  selector: 'app-product-item',
  imports: [CommonModule, HighlightDirective],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();
  currentUser: FirebaseUser | null = null;
  
  constructor(private authService: AuthService) {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  onAddToCart() {
    if (!this.currentUser) {
      console.error('Be kell jelentkezni a vásárláshoz!');
      return;
    }
    this.authService.addToCart(this.currentUser.uid, this.product.id.toString())
      .then(() => {
        console.log(`${this.product.name} hozzáadva a kosárhoz.`);
        this.addToCart.emit(this.product);
      })
      .catch(error => {
        console.error('Hiba a kosárba helyezés során:', error);
      });
  }
}

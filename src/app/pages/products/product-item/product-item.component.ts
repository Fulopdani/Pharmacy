import { Component, Output, Input, EventEmitter} from '@angular/core';
import { Product } from '../products.component';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from '../../../highlight.directive';

@Component({
  selector: 'app-product-item',
  imports: [CommonModule, HighlightDirective],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})

export class ProductItemComponent {
  
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  onAddToCart() {
    this.addToCart.emit(this.product)
  } 
  
  outOfStock(product: Product) {
    if(product.quantity == 0) {
      product.inStock = false
    } else {
      product.inStock = true
    }
  }
}

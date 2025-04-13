import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './shared/menu/menu.component';
import { CartComponent } from "./pages/cart/cart.component";
import { ProductsComponent } from './pages/products/products.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
changePage(selectedPage: string) {
  this.page = selectedPage
}
  title = 'pharmacy';

  page = "home";
}

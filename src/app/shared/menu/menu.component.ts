import { Component, Output, EventEmitter, Input, OnInit} from '@angular/core';
import { RouterLink} from '@angular/router';
import {MatListModule} from '@angular/material/list';
import { isPlatformBrowser } from '@angular/common';
import {Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-menu',
  imports: [RouterLink, MatListModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  isLoggedIn = false;
  @Output() selectedPage: EventEmitter<string> = new EventEmitter();
  private authSubscription?: Subscription;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private authService: AuthService) {}

  menuSwitch(pageValue: string) {
    this.selectedPage.emit(pageValue);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.authSubscription = this.authService.currentUser.subscribe(user => {
        this.isLoggedIn = !!user;
        localStorage.setItem('isLoggedIn', this.isLoggedIn ? 'true' : 'false');
      });
    }
  }
  
  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.signOut();
    }
  }
}

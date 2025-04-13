import { Component, Output, EventEmitter} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
   @Output() selectedPage: EventEmitter<string> = new EventEmitter();


   menuSwitch(pageValue: string) {
    this.selectedPage.emit(pageValue);
   }
}

import { Component, } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import {MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HighlightDirective } from '../../highlight.directive';
import { GrowOnHoverDirective } from '../../grow-on-hover.directive';
@Component({
  selector: 'app-home',
  imports: [MatFormFieldModule, MatInputModule, MatIcon, MatIconModule, MatCheckboxModule, MatRadioModule, MatSelectModule,
            MatButtonToggleModule, MatSliderModule, MatCardModule, MatProgressBarModule, HighlightDirective, GrowOnHoverDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {


}

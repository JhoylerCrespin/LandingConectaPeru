import { CommonModule } from '@angular/common';
import { Component, Query } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, RouterModule,CommonModule],
  templateUrl: './footer.component.html',
  styles: ``
})
export class FooterComponent {
 
}

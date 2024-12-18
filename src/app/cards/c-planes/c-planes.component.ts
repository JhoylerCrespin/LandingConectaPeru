import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-c-planes',
  standalone: true,
  imports: [],
  templateUrl: './c-planes.component.html'
})
export class CPlanesComponent {

  @Input() plan:any   = {};

}

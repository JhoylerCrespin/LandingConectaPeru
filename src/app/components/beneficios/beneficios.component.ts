import { Component } from '@angular/core';

@Component({
  selector: 'app-beneficios',
  standalone: true,
  imports: [],
  templateUrl: './beneficios.component.html',
  styles: ``,
})
export class BeneficiosComponent {
  beneficios: string[] = [
    'Disfruta de una conexión sin límites de datos.',
    'Experimenta la máxima velocidad en descarga y subida.',
    'Atención al cliente todos los días del año.',
    'Instalación rápida y sin complicaciones en tu hogar o negocio.',
  ];
}

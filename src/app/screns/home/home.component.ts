import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Renderer2,
} from '@angular/core';
import { InicioComponent } from '../../components/inicio/inicio.component';
import { EstadisticasComponent } from '../../components/estadisticas/estadisticas.component';
import { BeneficiosComponent } from '../../components/beneficios/beneficios.component';
import { PlanesComponent } from '../../components/planes/planes.component';
import { CoberturaComponent } from '../../components/cobertura/cobertura.component';
import { ServiciosComponent } from '../../components/servicios/servicios.component';
import { NuestrosClientesComponent } from '../../components/nuestros-clientes/nuestros-clientes.component';
import { SecContactarComponent } from '../../components/sec-contactar/sec-contactar.component';

import { ViewportScroller } from '@angular/common';

import { filter } from 'rxjs/operators';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    InicioComponent,
    EstadisticasComponent,
    BeneficiosComponent,
    PlanesComponent,
    CoberturaComponent,
    ServiciosComponent,
    NuestrosClientesComponent,
    SecContactarComponent,
  ],
  templateUrl: './home.component.html',
  styles: [``],
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('inicio') inicioSection!: ElementRef;
  @ViewChild('estadisticas') estadisticasSection!: ElementRef;
  @ViewChild('beneficios', { static: false }) beneficiosSection!: ElementRef;

  @ViewChild('planes') planesSection!: ElementRef;
  @ViewChild('cobertura') coberturaSection!: ElementRef;
  @ViewChild('servicios') serviciosSection!: ElementRef;
  @ViewChild('clientes') clientesSection!: ElementRef;
  @ViewChild('contacto') contactoSection!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller,
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {

    this.scrollToSectionOnQueryParamChange();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const scrollTo = this.route.snapshot.queryParamMap.get('scrollTo');
        if (scrollTo) {
          setTimeout(() => {
            this.viewportScroller.scrollToAnchor(scrollTo);
          }, 100);
        }
      });


  }

  private scrollToSectionOnQueryParamChange() {
    const scrollTo = this.route.snapshot.queryParamMap.get('scrollTo');
    if (scrollTo) {
      setTimeout(() => {
        this.viewportScroller.scrollToAnchor(scrollTo);
      }, 100);
    }
  }
}

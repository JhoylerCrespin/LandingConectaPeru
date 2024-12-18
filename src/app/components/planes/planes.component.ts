import { Component, Input, OnInit,  ElementRef, ViewChild } from '@angular/core';
import { CPlanesComponent } from '../../cards/c-planes/c-planes.component';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [CPlanesComponent, NgStyle],
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css'],
})
export class PlanesComponent implements OnInit {

    @ViewChild('cardPlanes') cardPlanes!: ElementRef;
  
    currentIndex: number = 0;
    translateX: number = 0;
    currentSlide = 0;
    isDragging: boolean = false;
    startX: number = 0;
    currentTranslate: number = 0;
    previousTranslate: number = 0;

    plans = [
      {
        plan_name: "Plan Básico 50 Mbps",
        speed: "50",
        coverage: "Zona urbana y rural",
        connection_type: "Internet Inalámbrico",
        initial_offer: { amount: "50", duration: "2 Meses" },
        regular_price: "100",
        promotion: "Instalación gratuita y router Wi-Fi incluido",
        whatsapp_url: `https://web.whatsapp.com/send?phone=51938995616&text=Hola%20%F0%9F%91%8B%2C%20me%20interesa%20el%20*Plan%20B%C3%A1sico%2050%20Mbps*%20%F0%9F%94%8C%20en%20zonas%20urbanas%20y%20rurales.%20Quiero%20aprovechar%20la%20oferta%20de%20*S/%2050%20por%202%20meses*%20y%20sin%20costo%20de%20instalaci%C3%B3n.%20%C2%BFMe%20pueden%20dar%20m%C3%A1s%20informaci%C3%B3n%3F%20%F0%9F%93%A3`
      },
      {
        plan_name: "Plan Avanzado 100 Mbps",
        speed: "100",
        coverage: "Zona urbana",
        connection_type: "Fibra Óptica",
        initial_offer: { amount: "80", duration: "1 Mes" },
        regular_price: "150",
        promotion: "Descuento de S/ 20 en los primeros 3 meses",
        whatsapp_url: `https://web.whatsapp.com/send?phone=51938995616&text=Hola%20%F0%9F%91%8B%2C%20estoy%20interesado%20en%20el%20*Plan%20Avanzado%20100%20Mbps*%20%F0%9F%92%BB%20para%20zonas%20urbanas.%20Quiero%20aprovechar%20la%20oferta%20de%20*S/%2080%20por%201%20mes*%20con%20descuento.%20%C2%BFPodr%C3%ADan%20darme%20m%C3%A1s%20detalles%3F%20%F0%9F%92%8A`
      },
      {
        plan_name: "Plan Premium 200 Mbps",
        speed: "200",
        coverage: "Zona urbana",
        connection_type: "Fibra Óptica",
        initial_offer: { amount: "100", duration: "1 Mes" },
        regular_price: "200",
        promotion: "Incluye servicio de televisión digital y telefonía fija",
        whatsapp_url: `https://web.whatsapp.com/send?phone=51938995616&text=Hola%20%F0%9F%91%8B%2C%20me%20encanta%20el%20*Plan%20Premium%20200%20Mbps*%20%F0%9F%93%96%20con%20televisi%C3%B3n%20y%20tel%C3%A9fono.%20Quiero%20aprovechar%20la%20oferta%20de%20*S/%20100%20por%201%20mes*.%20%C2%BFMe%20pueden%20brindar%20informaci%C3%B3n%20detallada%3F%20%F0%9F%93%A1`
      },
      {
        plan_name: "Plan Rural 30 Mbps",
        speed: "30",
        coverage: "Zona rural",
        connection_type: "Internet Satelital",
        initial_offer: { amount: "60", duration: "2 Meses" },
        regular_price: "120",
        promotion: "Instalación rápida y soporte técnico 24/7",
        whatsapp_url: `https://web.whatsapp.com/send?phone=51938995616&text=Hola%20%F0%9F%91%8B%2C%20quiero%20contratar%20el%20*Plan%20Rural%2030%20Mbps*%20%F0%9F%93%A3%20para%20zonas%20rurales.%20Aprovechar%C3%A9%20la%20oferta%20de%20*S/%2060%20por%202%20meses*.%20%C2%BFPueden%20darme%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20plan%3F%20%F0%9F%92%8C`
      },
      {
        plan_name: "Plan Empresarial 500 Mbps",
        speed: "500",
        coverage: "Zona urbana",
        connection_type: "Fibra Óptica Dedicada",
        initial_offer: { amount: "200", duration: "1 Mes" },
        regular_price: "500",
        promotion: "Soporte técnico prioritario y dirección IP fija",
        whatsapp_url: `https://web.whatsapp.com/send?phone=51938995616&text=Hola%20%F0%9F%91%8B%2C%20soy%20una%20empresa%20y%20me%20interesa%20el%20*Plan%20Empresarial%20500%20Mbps*%20%F0%9F%92%BC%20con%20IP%20fija%20y%20soporte%20prioritario.%20Quiero%20aprovechar%20la%20oferta%20de%20*S/%20200%20por%201%20mes*.%20%C2%BFPodr%C3%ADan%20darme%20informaci%C3%B3n%20adicional%3F%20%F0%9F%93%8C`
      }
    ];
    

  ngOnInit(): void {}

  constructor() { }

  ngAfterViewInit() {
    this.updateSliderWidth();

    window.addEventListener('resize', () => {
      this.updateSliderWidth();
    });
  }

  updateSliderWidth() {

    this.calculateTranslate();
    // Ajustar el tamaño del slider en caso de redimensionamiento
    window.addEventListener('resize', () => {
      this.calculateTranslate();
    });


  }


  // Calcular la traducción en X basada en el índice actual y el ancho del contenedor
  calculateTranslate(): void {
    if (this.cardPlanes) {
      const containerWidth = this.cardPlanes.nativeElement.offsetWidth;
      this.translateX = -this.currentIndex * containerWidth;
      this.currentTranslate = this.translateX;
      this.previousTranslate = this.translateX;
    }
  }

  // Navegar al siguiente slide (comportamiento circular)
  next(): void {
    if (this.currentIndex < this.plans.length - 1) {
      this.currentIndex++;
    } else {
      // Si estamos en el último, volver al primero
      this.currentIndex = 0;
    }
    this.calculateTranslate();
  } 

  // Navegar al slide anterior (comportamiento circular)
  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      // Si estamos en el primero, ir al último
      this.currentIndex = this.plans.length - 1;
    }
    this.calculateTranslate();
  }

  navigateToSlide(index: number): void {
    this.currentIndex = index;
    this.calculateTranslate();
  }

  // Iniciar el arrastre
  onDragStart(event: MouseEvent | TouchEvent): void {
    this.isDragging = true;
    this.startX = this.getPositionX(event);
  }

  // Mover el slider mientras se arrastra
  onDragMove(event: MouseEvent | TouchEvent): void {
    if (!this.isDragging) return;
    const currentPosition = this.getPositionX(event);
    const movedBy = currentPosition - this.startX;

    const containerWidth = this.cardPlanes.nativeElement.offsetWidth;
    let newTranslate = this.previousTranslate + movedBy;

    // Limitar el deslizamiento para no sobrepasar los extremos
    if (newTranslate > 0) {
      newTranslate = 0;
    }
    const maxTranslate = -((this.plans.length - 1) * containerWidth);
    if (newTranslate < maxTranslate) {
      newTranslate = maxTranslate;
    }

    this.currentTranslate = newTranslate;
    this.translateX = this.currentTranslate;
  }

    onDragEnd(): void {
    if (!this.isDragging) return;
    this.isDragging = false;

    const containerWidth = this.cardPlanes.nativeElement.offsetWidth;
    this.currentIndex = Math.round(-this.currentTranslate / containerWidth);

    // Limitar el índice dentro de los límites
    if (this.currentIndex < 0) {
      this.currentIndex = 0;
    }
    if (this.currentIndex >= this.plans.length) {
      this.currentIndex = this.plans.length - 1;
    }

    this.calculateTranslate();
  }


  // Obtener la posición X del evento (mouse o touch)
  getPositionX(event: MouseEvent | TouchEvent): number {
    return event instanceof MouseEvent
      ? event.clientX
      : event.touches[0].clientX;
  }

}

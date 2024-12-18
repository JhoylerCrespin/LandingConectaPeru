import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-cobertura', 
  standalone: true,
  imports: [NgStyle],
  templateUrl: './cobertura.component.html',
  styles: ``
})
export class CoberturaComponent  {

  @ViewChild('cardCobertura') cardCobertura!: ElementRef;

  currentIndex: number = 0;
  translateX: number = 0;
  currentSlide = 0;
  isDragging: boolean = false;
  startX: number = 0;
  currentTranslate: number = 0;
  previousTranslate: number = 0;

  lugares : String[] = [
    'Chimbote',
    'Santa',
    'Nuevo Chimbote',
    'Tangay',
    'Cambio Puente'
  ];

  constructor() { }

  ngAfterViewInit() {
    this.updateSliderWidth();

    window.addEventListener('resize', () => {
      this.updateSliderWidth();
    });
  }

  updateSliderWidth() {

    if (this.cardCobertura) {
      this.cardCobertura.nativeElement.style.width = `${this.lugares.length * 100}%`;
    }


  }


  // Calcular la traducción en X basada en el índice actual y el ancho del contenedor
  calculateTranslate(): void {
    if (this.cardCobertura) {
      const containerWidth = this.cardCobertura.nativeElement.offsetWidth + 16;
      this.translateX = -this.currentIndex * containerWidth;
      this.currentTranslate = this.translateX;
      this.previousTranslate = this.translateX;
    }
  }

  // Navegar al siguiente slide (comportamiento circular)
  next(): void {
    if (this.currentIndex < this.lugares.length - 1) {
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
      this.currentIndex = this.lugares.length - 1;
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

    const containerWidth = this.cardCobertura.nativeElement.offsetWidth + 16;
    let newTranslate = this.previousTranslate + movedBy;

    // Limitar el deslizamiento para no sobrepasar los extremos
    if (newTranslate > 0) {
      newTranslate = 0;
    }
    const maxTranslate = -((this.lugares.length - 1) * containerWidth);
    if (newTranslate < maxTranslate) {
      newTranslate = maxTranslate;
    }

    this.currentTranslate = newTranslate;
    this.translateX = this.currentTranslate;
  }

    onDragEnd(): void {
    if (!this.isDragging) return;
    this.isDragging = false;

    const containerWidth = this.cardCobertura.nativeElement.offsetWidth;
    this.currentIndex = Math.round(-this.currentTranslate / containerWidth);

    // Limitar el índice dentro de los límites
    if (this.currentIndex < 0) {
      this.currentIndex = 0;
    }
    if (this.currentIndex >= this.lugares.length) {
      this.currentIndex = this.lugares.length - 1;
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
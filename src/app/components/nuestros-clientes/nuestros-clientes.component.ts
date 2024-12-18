import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ComentariosService } from '../../Servicios/comentarios.service';
import { NgClass, NgStyle } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nuestros-clientes',
  standalone: true,
  imports: [NgStyle, NgClass],
  templateUrl: './nuestros-clientes.component.html',
  styles: ``,
})
export class NuestrosClientesComponent implements OnInit {
  @ViewChild('Card', { static: false }) Card!: ElementRef;

  comentarios: any[] = [];
  currentSlide = 0;

  constructor(private comentariosService: ComentariosService) {}

  ngOnInit(): void {
    this.comentariosService.getComentarios().subscribe({
      next: (data) => {
        this.comentarios = data;
      },
      error: (err) => console.error('Error al cargar los datos', err),
    });
  }

  currentIndex: number = 0;
  translateX: number = 0;
  
  isDragging: boolean = false;
  startX: number = 0;
  currentTranslate: number = 0;
  previousTranslate: number = 0;

  ngAfterViewInit() {
    this.calculateTranslate();
    // Ajustar el tamaño del slider en caso de redimensionamiento
    window.addEventListener('resize', () => {
      this.calculateTranslate();
    });
  }

  // Calcular la traducción en X basada en el índice actual y el ancho del contenedor
  calculateTranslate(): void {
    if (this.Card) {
      const containerWidth = this.Card.nativeElement.offsetWidth + 16;
      this.translateX = -this.currentIndex * containerWidth;
      this.currentTranslate = this.translateX;
      this.previousTranslate = this.translateX;
    }
  }

  // Navegar al siguiente slide (comportamiento circular)
  next(): void {
    if (this.currentIndex < this.comentarios.length - 1) {
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
      this.currentIndex = this.comentarios.length - 1;
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

    const containerWidth = this.Card.nativeElement.offsetWidth + 16;
    let newTranslate = this.previousTranslate + movedBy;

    // Limitar el deslizamiento para no sobrepasar los extremos
    if (newTranslate > 0) {
      newTranslate = 0;
    }
    const maxTranslate = -((this.comentarios.length - 1) * containerWidth);
    if (newTranslate < maxTranslate) {
      newTranslate = maxTranslate;
    }

    this.currentTranslate = newTranslate;
    this.translateX = this.currentTranslate;
  }

  // Finalizar el arrastre
  onDragEnd(event: MouseEvent | TouchEvent): void {
    if (!this.isDragging) return;
    this.isDragging = false;

    const movedBy = this.currentTranslate - this.previousTranslate;

    if (movedBy < -50 && this.currentIndex < this.comentarios.length - 1) {
      this.currentIndex++;
    }
    if (movedBy > 50 && this.currentIndex > 0) {
      this.currentIndex--;
    }

    // Hacer el comportamiento circular en el arrastre
    if (this.currentIndex >= this.comentarios.length) {
      this.currentIndex = 0;
    } else if (this.currentIndex < 0) {
      this.currentIndex = this.comentarios.length - 1;
    }

    this.calculateTranslate();
    this.previousTranslate = this.translateX;
  }

  // Obtener la posición X del evento (mouse o touch)
  getPositionX(event: MouseEvent | TouchEvent): number {
    return event instanceof MouseEvent
      ? event.clientX
      : event.touches[0].clientX;
  }
}

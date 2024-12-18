import { Routes, ExtraOptions } from '@angular/router';
import { HomeComponent } from './screns/home/home.component';
import { ContactoComponent } from './screns/contacto/contacto.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    
  },

  { path: 'contacto', component: ContactoComponent },
  //{ path: '**', component: PageNotFoundComponent }
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled', // Restaura la posición de desplazamiento al navegar
  anchorScrolling: 'enabled', // Habilita el desplazamiento a anclas
  scrollOffset: [0, 64] // Ajusta el desplazamiento si tienes un header fijo (opcional)
};

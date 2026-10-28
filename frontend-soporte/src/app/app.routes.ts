import { Routes } from '@angular/router';
import { TicketsComponent } from './components/tickets/tickets';
import { NuevoTicket } from './components/nuevo-ticket/nuevo-ticket';
import { EditarTicket } from './components/editar-ticket/editar-ticket';

export const routes: Routes = [
  { path: '', component: TicketsComponent },
  { path: 'nuevo-ticket', component: NuevoTicket},
  { path: 'editar-ticket/:id', component: EditarTicket },
  { path: '**', redirectTo: '' }
];
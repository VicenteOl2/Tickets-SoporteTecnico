import { Routes } from '@angular/router';
import { TicketsComponent } from './components/tickets/tickets';
import { NuevoTicketComponent } from './components/nuevo-ticket/nuevo-ticket';
import { EditarTicket } from './components/editar-ticket/editar-ticket';

export const routes: Routes = [
  { path: '', component: TicketsComponent },
  { path: 'nuevo-ticket', component: NuevoTicketComponent },
  { path: 'editar-ticket/:id', component: EditarTicket },
  { path: '**', redirectTo: '' }
];
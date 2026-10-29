import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TicketsService } from '../../services/tickets';
import { TicketNuevo } from '../../models/ticket';

@Component({
  selector: 'app-nuevo-ticket',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './nuevo-ticket.html',
  styleUrl: './nuevo-ticket.css'
})
export class NuevoTicketComponent {
  ticket: TicketNuevo = {
    asunto: '',
    solicitante: '',
    descripcion: '',
    categoria: 'Soporte Técnico',
    prioridad: 'Media',
    estado: 'Abierto'
  };

  guardando = false;
  error = '';

  constructor(
    private ticketsService: TicketsService,
    private router: Router
  ) {}

  guardarTicket(): void {
    if (!this.ticket.asunto || !this.ticket.solicitante || !this.ticket.descripcion) {
      this.error = 'Por favor completa todos los campos obligatorios.';
      return;
    }

    this.guardando = true;
    this.error = '';

    this.ticketsService.crearTicket(this.ticket).subscribe({
      next: () => {
        this.guardando = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Ocurrió un error al guardar el ticket en la base de datos.';
        this.guardando = false;
      }
    });
  }
}
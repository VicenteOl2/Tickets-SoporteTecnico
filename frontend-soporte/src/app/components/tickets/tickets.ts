import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ticket } from '../../models/ticket';
import { TicketsService } from '../../services/tickets';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tickets.html',
  styleUrl: './tickets.css'
})
export class TicketsComponent implements OnInit {
  tickets: Ticket[] = [];
  cargando = true;
  error = '';

  constructor(
    private ticketsService: TicketsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarTickets();
  }

  cargarTickets(): void {
    this.cargando = true;
    this.error = '';
    this.ticketsService.obtenerTickets().subscribe({
      next: (datos) => {
        this.tickets = datos;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.error = 'No fue posible conectar con el servidor de soporte.';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  eliminarTicket(id: number): void {
    if (confirm(`¿Estás seguro de que deseas eliminar el ticket #${id}?`)) {
      this.ticketsService.eliminarTicket(id).subscribe({
        next: () => {
          this.cargarTickets(); // Recarga la lista para refrescar la vista
        },
        error: (err) => {
          console.error(err);
          alert('No se pudo eliminar el ticket.');
        }
      });
    }
  }
}
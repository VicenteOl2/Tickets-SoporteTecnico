import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TicketsService } from '../../services/tickets';
import { TicketNuevo } from '../../models/ticket';

@Component({
  selector: 'app-editar-ticket',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './editar-ticket.html',
  styleUrl: './editar-ticket.css'
})
export class EditarTicketComponent implements OnInit {
  ticketId!: number;
  ticket: TicketNuevo = {
    asunto: '',
    solicitante: '',
    descripcion: '',
    categoria: 'Soporte Técnico',
    prioridad: 'Media',
    estado: 'Abierto'
  };

  cargando = true;
  guardando = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private ticketsService: TicketsService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.ticketId = +idParam;
      this.cargarTicket();
    } else {
      this.error = 'Identificador de ticket no válido.';
      this.cargando = false;
    }
  }

  cargarTicket(): void {
    this.ticketsService.obtenerTicket(this.ticketId).subscribe({
      next: (datos) => {
        this.ticket = {
          asunto: datos.asunto,
          solicitante: datos.solicitante,
          descripcion: datos.descripcion,
          categoria: datos.categoria,
          prioridad: datos.prioridad,
          estado: datos.estado
        };
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.error = 'No se pudo obtener la información del ticket.';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  actualizarTicket(): void {
    this.guardando = true;
    this.error = '';

    this.ticketsService.actualizarTicket(this.ticketId, this.ticket).subscribe({
      next: () => {
        this.guardando = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Ocurrió un error al actualizar el ticket.';
        this.guardando = false;
      }
    });
  }
}
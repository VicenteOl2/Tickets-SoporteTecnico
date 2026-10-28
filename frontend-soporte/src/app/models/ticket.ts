export interface Ticket {
  id: number;
  asunto: string;
  solicitante: string;
  descripcion: string;
  categoria: string;
  prioridad: 'Baja' | 'Media' | 'Alta';
  estado: 'Abierto' | 'En Proceso' | 'Cerrado';
  fechaRegistro?: string;
}

export type TicketNuevo = Omit<Ticket, 'id' | 'fechaRegistro'>;
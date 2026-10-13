import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MENU_POR_ROL } from '../../core/config/menu.config';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly auth = inject(AuthService);

  protected readonly usuario = this.auth.usuario;
  protected readonly rol = this.auth.rol;
  protected readonly accesos = computed(() => {
    const rol = this.rol();
    return rol ? MENU_POR_ROL[rol] : [];
  });

  /** Funcionalidades que se le explican a quien todavía no inició sesión. */
  protected readonly funcionalidades = [
    { icono: 'event_available', titulo: 'Solicitar turnos', texto: 'Reservá turnos con el profesional y la especialidad que necesites, en la sede que te quede más cómoda.' },
    { icono: 'event_note', titulo: 'Gestionar tus turnos', texto: 'Consultá tus próximos turnos y cancelalos si no podés asistir.' },
    { icono: 'folder_shared', titulo: 'Historia clínica', texto: 'Accedé a las atenciones registradas por tus médicos en un solo lugar.' },
    { icono: 'notifications', titulo: 'Notificaciones', texto: 'Recibí avisos sobre confirmaciones, cambios y cancelaciones de tus turnos.' },
  ];
}

import { Component, computed, inject, output } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MENU_POR_ROL } from '../../core/config/menu.config';
import { ROL_LABEL } from '../../core/models/rol.model';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-menu-nav',
  imports: [RouterLink, RouterLinkActive, MatListModule, MatIconModule, MatDividerModule],
  templateUrl: './menu-nav.html',
  styleUrl: './menu-nav.scss',
})
export class MenuNav {
  private readonly auth = inject(AuthService);

  /** Se emite al elegir una opción (para cerrar el menú en pantallas chicas). */
  readonly navegar = output<void>();

  protected readonly rol = this.auth.rol;
  protected readonly tituloSeccion = computed(() => {
    const rol = this.rol();
    return rol ? ROL_LABEL[rol] : '';
  });
  protected readonly items = computed(() => {
    const rol = this.rol();
    return rol ? MENU_POR_ROL[rol] : [];
  });
}

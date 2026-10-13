import { Component, computed, inject, output } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { ROL_LABEL } from '../../core/models/rol.model';
import { AuthService } from '../../core/services/auth.service';
import { ConfirmDialog, ConfirmDialogData } from '../../shared/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-header',
  imports: [RouterLink, MatToolbarModule, MatButtonModule, MatIconModule, MatTooltipModule, MatBadgeModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  readonly toggleMenu = output<void>();

  protected readonly usuario = this.auth.usuario;
  protected readonly tipoUsuario = computed(() => {
    const rol = this.auth.rol();
    return rol ? ROL_LABEL[rol] : '';
  });

  protected cerrarSesion(): void {
    this.dialog
      .open<ConfirmDialog, ConfirmDialogData, boolean>(ConfirmDialog, {
        data: { titulo: 'Cerrar sesión', mensaje: '¿Querés cerrar tu sesión?', confirmar: 'Cerrar sesión' },
      })
      .afterClosed()
      .subscribe((confirmado) => {
        if (!confirmado) return;
        this.auth.logout();
        this.router.navigateByUrl('/');
        this.snackBar.open('Cerraste sesión correctamente.', 'Cerrar');
      });
  }
}

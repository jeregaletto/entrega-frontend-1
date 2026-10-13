import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Perfil as PerfilUsuario } from '../../core/models/usuario.model';
import { ROL_LABEL } from '../../core/models/rol.model';
import { AuthService } from '../../core/services/auth.service';
import { mensajeDeError } from '../../core/utils/http-error';

@Component({
  selector: 'app-perfil',
  imports: [
    DatePipe,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class Perfil {
  private readonly auth = inject(AuthService);

  protected readonly perfil = signal<PerfilUsuario | null>(null);
  protected readonly cargando = signal(true);
  protected readonly error = signal<string | null>(null);

  protected readonly iniciales = computed(() => {
    const p = this.perfil();
    return p ? `${p.nombre.charAt(0)}${p.apellido.charAt(0)}`.toUpperCase() : '';
  });
  protected readonly rolLabel = computed(() => {
    const p = this.perfil();
    return p ? ROL_LABEL[p.rol] : '';
  });

  ngOnInit(): void {
    this.cargar();
  }

  protected cargar(): void {
    this.cargando.set(true);
    this.error.set(null);
    this.auth.getPerfil().subscribe({
      next: (perfil) => {
        this.perfil.set(perfil);
        this.cargando.set(false);
      },
      error: (err) => {
        this.error.set(mensajeDeError(err, 'No se pudo obtener tu perfil.'));
        this.cargando.set(false);
      },
    });
  }
}

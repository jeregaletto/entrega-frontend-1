import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-acceso-denegado',
  imports: [RouterLink, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <mat-card class="estado" appearance="outlined">
      <mat-icon class="estado-icono error">block</mat-icon>
      <h1>Acceso denegado</h1>
      <p>No tenés permisos para acceder a esta sección.</p>
      <a mat-flat-button routerLink="/"><mat-icon>home</mat-icon>Volver al inicio</a>
    </mat-card>
  `,
})
export class AccesoDenegado {}

import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-no-encontrada',
  imports: [RouterLink, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <mat-card class="estado" appearance="outlined">
      <mat-icon class="estado-icono">search_off</mat-icon>
      <h1>Página no encontrada</h1>
      <p>La página que buscás no existe o fue movida.</p>
      <a mat-flat-button routerLink="/"><mat-icon>home</mat-icon>Volver al inicio</a>
    </mat-card>
  `,
})
export class NoEncontrada {}

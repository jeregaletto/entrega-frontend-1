import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-en-construccion',
  imports: [RouterLink, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <mat-card class="estado" appearance="outlined">
      <mat-icon class="estado-icono">construction</mat-icon>
      <h1>{{ titulo() }}</h1>
      <p>Esta sección está en construcción. Va a estar disponible en las próximas entregas.</p>
      <a mat-flat-button routerLink="/"><mat-icon>home</mat-icon>Volver al inicio</a>
    </mat-card>
  `,
})
export class EnConstruccion {
  /** Se completa desde `data.titulo` de la ruta. */
  readonly titulo = input('En construcción');
}

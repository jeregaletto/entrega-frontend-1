import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';
import { MenuNav } from './layout/menu-nav/menu-nav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavModule, Header, MenuNav, Footer],
  template: `
    <app-header (toggleMenu)="sidenav.toggle()" />

    <mat-sidenav-container class="contenedor">
      <mat-sidenav
        #sidenav
        [mode]="esMovil() ? 'over' : 'side'"
        [opened]="estaLogueado() && !esMovil()"
        [disableClose]="!esMovil()"
      >
        @if (estaLogueado()) {
          <app-menu-nav (navegar)="esMovil() && sidenav.close()" />
        }
      </mat-sidenav>

      <mat-sidenav-content class="contenido">
        <main class="principal">
          <router-outlet />
        </main>
        <app-footer />
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .contenedor {
      flex: 1;
    }
    .contenido {
      display: flex;
      flex-direction: column;
    }
    .principal {
      flex: 1;
      padding: 24px;
    }
    @media (max-width: 600px) {
      .principal {
        padding: 16px;
      }
    }
  `,
})
export class App {
  protected readonly estaLogueado = inject(AuthService).estaLogueado;
  protected readonly esMovil = toSignal(
    inject(BreakpointObserver)
      .observe('(max-width: 900px)')
      .pipe(map((r) => r.matches)),
    { initialValue: false },
  );
}

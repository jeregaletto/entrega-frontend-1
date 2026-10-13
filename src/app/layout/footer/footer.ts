import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-footer',
  imports: [MatIconModule, MatButtonModule, MatDividerModule, MatTooltipModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly contacto = {
    direccion: 'Av. Corrientes 1234, C1043 CABA, Buenos Aires',
    telefono: '(011) 4555-1234',
    email: 'contacto@clinicavirtual.com.ar',
  };

  protected readonly redes = [
    { nombre: 'Instagram', icono: 'photo_camera', url: 'https://www.instagram.com/clinicavirtual' },
    { nombre: 'Facebook', icono: 'thumb_up', url: 'https://www.facebook.com/clinicavirtual' },
    { nombre: 'X (Twitter)', icono: 'alternate_email', url: 'https://x.com/clinicavirtual' },
    { nombre: 'LinkedIn', icono: 'work', url: 'https://www.linkedin.com/company/clinicavirtual' },
  ];

  protected readonly anio = new Date().getFullYear();
}

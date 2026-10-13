import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { Cobertura } from '../../core/models/cobertura.model';
import { AuthService } from '../../core/services/auth.service';
import { CoberturaService } from '../../core/services/cobertura.service';
import { aFechaIso } from '../../core/utils/fecha-adapter';
import { mensajeDeError } from '../../core/utils/http-error';

const SOLO_LETRAS = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü' ]+$/;

/** La fecha de nacimiento no puede ser futura ni de hace más de 120 años. */
const fechaNacimientoValida: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const fecha = control.value as Date | null;
  if (!fecha) return null;
  const hoy = new Date();
  if (fecha > hoy) return { futura: true };
  const limite = new Date(hoy.getFullYear() - 120, hoy.getMonth(), hoy.getDate());
  return fecha < limite ? { muyAntigua: true } : null;
};

const passwordsIguales: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const password = group.get('password')?.value;
  const confirmar = group.get('confirmarPassword');
  if (!confirmar) return null;
  const distintas = !!confirmar.value && password !== confirmar.value;
  const { noCoinciden, ...resto } = confirmar.errors ?? {};
  if (distintas) {
    confirmar.setErrors({ ...resto, noCoinciden: true });
  } else if (noCoinciden) {
    confirmar.setErrors(Object.keys(resto).length ? resto : null);
  }
  return null;
};

@Component({
  selector: 'app-registro',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
  ],
  templateUrl: './registro.html',
  styleUrl: './registro.scss',
})
export class Registro {
  private readonly auth = inject(AuthService);
  private readonly coberturaService = inject(CoberturaService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly form = inject(FormBuilder).group(
    {
      nombre: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(SOLO_LETRAS)]],
      apellido: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(SOLO_LETRAS)]],
      dni: ['', [Validators.required, Validators.pattern(/^\d{7,8}$/)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      telefono: ['', [Validators.pattern(/^[\d\s()+-]{6,20}$/)]],
      fechaNacimiento: [null as Date | null, [Validators.required, fechaNacimientoValida]],
      idCobertura: [null as number | null, Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarPassword: ['', Validators.required],
    },
    { validators: passwordsIguales },
  );

  protected readonly coberturas = signal<Cobertura[]>([]);
  protected readonly cargandoCoberturas = signal(true);
  protected readonly errorCoberturas = signal<string | null>(null);
  protected readonly enviando = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly ocultarPassword = signal(true);
  protected readonly hoy = new Date();

  ngOnInit(): void {
    this.cargarCoberturas();
  }

  protected cargarCoberturas(): void {
    this.cargandoCoberturas.set(true);
    this.errorCoberturas.set(null);
    this.coberturaService
      .listar()
      .pipe(finalize(() => this.cargandoCoberturas.set(false)))
      .subscribe({
        next: (coberturas) => this.coberturas.set(coberturas),
        error: (err) =>
          this.errorCoberturas.set(mensajeDeError(err, 'No se pudieron cargar las coberturas.')),
      });
  }

  protected registrar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    this.enviando.set(true);
    this.error.set(null);

    this.auth
      .registro({
        nombre: v.nombre!.trim(),
        apellido: v.apellido!.trim(),
        dni: v.dni!,
        email: v.email!.trim(),
        password: v.password!,
        fecha_nacimiento: aFechaIso(v.fechaNacimiento!),
        telefono: v.telefono?.trim() || null,
        id_cobertura: v.idCobertura!,
      })
      .pipe(finalize(() => this.enviando.set(false)))
      .subscribe({
        next: (usuario) => {
          this.snackBar.open('¡Registro exitoso! Ya podés iniciar sesión.', 'Cerrar', { duration: 6000 });
          this.router.navigate(['/login'], { queryParams: { dni: usuario.dni } });
        },
        error: (err) => {
          const mensaje = mensajeDeError(err, 'No se pudo completar el registro.');
          this.error.set(mensaje);
          this.marcarCamposDuplicados(mensaje);
        },
      });
  }

  /** Si el backend informa DNI o email duplicado, se marca también el campo correspondiente. */
  private marcarCamposDuplicados(mensaje: string): void {
    if (!/registrad/i.test(mensaje)) return;
    if (/DNI/i.test(mensaje)) {
      this.form.controls.dni.setErrors({ duplicado: true });
      this.form.controls.dni.markAsTouched();
    }
    if (/email/i.test(mensaje)) {
      this.form.controls.email.setErrors({ duplicado: true });
      this.form.controls.email.markAsTouched();
    }
  }
}

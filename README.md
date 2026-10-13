# Clínica Virtual — Frontend (Entrega 1)

Frontend de la clínica médica desarrollado en **Angular 21** con **Angular Material 21**.
Consume la API del backend (repositorio aparte: `entrega-backend`).

## Versiones utilizadas

| Herramienta      | Versión   |
| ---------------- | --------- |
| Node.js          | 20.19.4 (compatible: `^20.19.0`, `^22.12.0`, `^24.0.0`; se recomienda 22 LTS o 24 LTS) |
| npm              | 10.8.2    |
| Angular CLI      | 21.2.26   |
| Angular          | 21.2.x    |
| Angular Material | 21.2.14   |
| TypeScript       | 5.9.x     |

## Instalación y ejecución

1. Instalar Angular CLI 21 (opcional; también se puede usar `npx ng`):

   ```bash
   npm install -g @angular/cli@21
   ng version
   ```

2. Instalar dependencias del proyecto:

   ```bash
   npm install
   ```

3. Levantar el backend (por defecto en `http://localhost:3000`) con CORS habilitado para
   `http://localhost:4200` (ver más abajo).

4. Levantar el front:

   ```bash
   ng serve
   ```

   y abrir <http://localhost:4200>.

### URL de la API

La URL base de la API se define en un único lugar: [`src/environments/environment.ts`](src/environments/environment.ts).

```ts
export const environment = {
  apiUrl: 'http://localhost:3000',
};
```

### CORS en el backend

Como el front corre en `http://localhost:4200` y el backend en otro puerto, el backend debe
permitir ese origen. Por ejemplo, con el paquete `cors` en `src/app.js`:

```js
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:4200' }));
```

## Estructura del proyecto

```
src/
├── environments/environment.ts   # URL base de la API (único lugar)
└── app/
    ├── core/
    │   ├── config/menu.config.ts # Opciones del menú por rol (también generan las rutas)
    │   ├── guards/               # authGuard (sesión), rolGuard (rol), guestGuard (login/registro)
    │   ├── interceptors/         # authInterceptor: agrega el token JWT y maneja sesión vencida
    │   ├── models/               # Interfaces: respuesta de la API, usuario, rol, cobertura
    │   ├── services/             # AuthService, CoberturaService
    │   └── utils/                # Manejo de errores HTTP, adaptador de fechas, títulos
    ├── layout/                   # Header, menú lateral y footer
    ├── shared/                   # Componentes reutilizables (diálogo de confirmación)
    ├── pages/                    # Pantallas: home, login, registro, perfil, en construcción,
    │                             # acceso denegado, no encontrada
    ├── app.routes.ts             # Definición de rutas
    ├── app.config.ts             # Providers (router, HttpClient, locale es-AR, Material)
    └── app.ts                    # Layout general (header + menú + contenido + footer)
```

## Funcionalidades

- **Layout**: header (mensaje de bienvenida sin sesión; con sesión: nombre, ícono de
  información con el tipo de usuario, campana de notificaciones y cerrar sesión), menú lateral
  según el rol y footer con los datos de contacto.
- **Registro de paciente** (`/registro`): validaciones por campo, coberturas cargadas desde
  `GET /coberturas`, errores del backend (DNI/email duplicado) visibles en el formulario.
  Al registrarse se informa y se redirige al login.
- **Login** (`/login`) con DNI y contraseña. El token se guarda en `localStorage`, por lo que
  la sesión se mantiene al recargar. Si el token vence, se cierra la sesión automáticamente.
- **Cerrar sesión**: elimina el token y vuelve a la pantalla principal.
- **Mi perfil** (`/perfil`): datos obtenidos de `GET /auth/perfil`.

## Rutas

| Ruta                | Acceso                         |
| ------------------- | ------------------------------ |
| `/`                 | Público (contenido según sesión) |
| `/login`, `/registro` | Solo sin sesión              |
| `/perfil`           | Cualquier usuario logueado     |
| `/paciente/...`     | Rol `paciente`                 |
| `/medico/...`       | Rol `medico`                   |
| `/operador/...`     | Rol `operador`                 |
| `/admin/...`        | Rol `admin`                    |
| `/acceso-denegado`  | Destino al entrar a la sección de otro rol |
| `**`                | Página "No encontrada"         |

Sin sesión, cualquier ruta protegida redirige al login (y luego del login vuelve a la ruta
pedida). Las opciones de semanas futuras muestran una pantalla "En construcción".

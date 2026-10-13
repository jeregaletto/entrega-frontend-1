import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Cobertura } from '../models/cobertura.model';

@Injectable({ providedIn: 'root' })
export class CoberturaService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/coberturas`;

  listar(): Observable<Cobertura[]> {
    return this.http.get<ApiResponse<Cobertura[]>>(this.url).pipe(map(({ data }) => data));
  }
}

import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import { Eventos } from '../modelos/Eventos';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private http = inject(HttpClient);
  private apiUrl = 'https://appcampusgo.onrender.com/eventos';
  private apiBase = 'https://appcampusgo.onrender.com';

  private pad(n: number) { return n.toString().padStart(2, '0'); }
  private formatLocalDateTime(d: Date): string {
    return `${d.getFullYear()}-${this.pad(d.getMonth()+1)}-${this.pad(d.getDate())}T${this.pad(d.getHours())}:${this.pad(d.getMinutes())}:${this.pad(d.getSeconds())}`;
  }

  crearEvento(evento: any): Observable<Eventos> {
    const payload: any = { ...evento };

    let params = new HttpParams();
    if (payload.creadorId != null) {
      params = params.set('creadorId', String(payload.creadorId));
      delete payload.creadorId;
    }

    if (payload.fecha instanceof Date) {
      payload.fecha = this.formatLocalDateTime(payload.fecha as Date);
    }

    if (payload.precio != null) {
      payload.precio = Number(payload.precio);
      if (Number.isNaN(payload.precio)) {
        delete payload.precio;
      }
    }

    Object.keys(payload).forEach((k) => {
      if (payload[k] === undefined || payload[k] === null) delete payload[k];
    });

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('POST ->', this.apiUrl, payload);
    return this.http.post<Eventos>(this.apiUrl, payload, { headers, params });
  }

  obtenerEventos(): Observable<Eventos[]> {
    return this.http.get<Eventos[]>(`${this.apiUrl}/front`);
  }
  eliminarEvento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  editarEvento(id: number, evento: any): Observable<Eventos> {
    const payload: any = { ...evento };

    if (payload.fecha instanceof Date) {
      payload.fecha = this.formatLocalDateTime(payload.fecha as Date);
    }

    if (payload.precio != null) {
      payload.precio = Number(payload.precio);
      if (Number.isNaN(payload.precio)) {
        delete payload.precio;
      }
    }

    Object.keys(payload).forEach((k) => {
      if (payload[k] === undefined || payload[k] === null) delete payload[k];
    });

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('PUT ->', `${this.apiUrl}/${id}`, payload);
    return this.http.put<Eventos>(`${this.apiUrl}/${id}`, payload, { headers });
  }

  subirImagen(eventoId: number, file: File, descripcion?: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    if (descripcion) formData.append('descripcion', descripcion);

    const headers = new HttpHeaders();
    console.log('POST Imagen ->', `${this.apiUrl}/${eventoId}/galeria`);
    return this.http.post<any>(`${this.apiUrl}/${eventoId}/galeria`, formData, { headers });
  }

  obtenerGaleria(eventoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${eventoId}/galeria`);
  }

  /**
   * Construye la URL de portada siguiendo la convención backend:
   *   /uploads/{eventoId}/{eventoId}
   * Retorna URL absoluta usando apiBase.
   */
  buildPortadaUrl(eventoId?: number): string | undefined {
    if (eventoId == null) return undefined;
    const relative = `/uploads/${eventoId}/${eventoId}`;
    return `${this.apiBase}${relative}`;
  }

  /**
   * Convierte una ruta relativa (p.ej. "/uploads/1/uuid_nombre.jpg") en URL absoluta
   * usando la base del backend. Si ya es absoluta, la devuelve tal cual.
   */
  toAbsoluteUrl(pathOrUrl?: string): string | undefined {
    if (!pathOrUrl) return undefined;
    if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
    if (pathOrUrl.startsWith('/')) return `${this.apiBase}${pathOrUrl}`;
    return `${this.apiBase}/${pathOrUrl}`;
  }
}

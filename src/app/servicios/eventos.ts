import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import { Eventos } from '../modelos/Eventos';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  obtenerEventos(): Observable<Eventos[]> {
    return this.http.get<Eventos[]>(`${this.apiUrl}/eventos/front`);
  }

}

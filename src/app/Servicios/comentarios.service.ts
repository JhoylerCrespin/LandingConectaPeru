import { Injectable } from '@angular/core';
import  {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

private JsonUrl = 'assets/Comentarios.json';

  constructor(private http: HttpClient) { }
  
  getComentarios(): Observable<any> {
    return this.http.get(this.JsonUrl);
  }
}

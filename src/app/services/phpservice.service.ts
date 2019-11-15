import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PhpserviceService {

  url = 'http://178.128.157.95/controladores/'; // disponer url de su servidor que tiene las páginas PHP

  constructor(private http: HttpClient) { }


  //EXAMPLES
  recuperarTodos() {
    return this.http.get(`${this.url}recuperartodos.php`);
  }

  alta(articulo) {
    return this.http.post(`${this.url}alta.php`, JSON.stringify(articulo));
  }

  baja(codigo: number) {
    return this.http.get(`${this.url}baja.php?codigo=${codigo}`);
  }

  seleccionar(codigo: number) {
    return this.http.get(`${this.url}seleccionar.php?codigo=${codigo}`);
  }

  modificacion(articulo) {
    return this.http.post(`${this.url}modificacion.php`, JSON.stringify(articulo));
  }

  //CODE

  login(datos) {
    return this.http.post(`${this.url}funciones.php`, JSON.stringify(datos));
  }

  funciones(datos) {
    return this.http.post(`${this.url}funciones.php`, JSON.stringify(datos));
  }


}

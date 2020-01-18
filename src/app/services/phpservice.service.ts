import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PhpserviceService {

  url = '/controladores/'; // disponer url de su servidor que tiene las páginas PHP

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

  uploadFile(datos: any): Observable<any> {
    return this.http.post(`${this.url}get/uploadFile.php`, datos);
  } 

  uploadFileExcel(datos: any): Observable<any> {
    return this.http.post(`${this.url}get/uploadFileExcel.php`, datos);
  } 

  crearCampana(datos: any): Observable<any> {
    return this.http.post(`${this.url}get/crear-campanas.php`, datos);
  } 

  


}

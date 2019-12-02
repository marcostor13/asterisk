import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  public dashboard = false; 
  public usuarios = false; 
  public grupos = false; 
  public campanas = false; 
  public troncales = false; 
  public estadisticos = false; 
  public home = false; 
  public crearTroncal = false; 
  public crearUsuario = false;
  public editarUsuario = false;
  public crearGrupo = false;
  public editarGrupo = false;
  public crearCampana = false;
  ngOnInit() {
    this.changueContent();
  }

  changueContent(){    

    switch (window.location.pathname) {
      case '/':
        this.home = true;
        break;
      case '/dashboard':
        this.dashboard = true;
        break;
      case '/usuarios':
        this.usuarios = true;
        break;
      case '/grupos':
        this.grupos = true;
        break;
      case '/campanas':
        this.campanas = true;
        break;
      case '/troncales':
        this.troncales = true;
        break;
      case '/estadisticos':
        this.estadisticos = true;
        break;
      case '/crear-troncal':
        this.crearTroncal = true;
        break;
      case '/crear-usuario':
        this.crearUsuario = true;
        break;
      case '/crear-grupo':
        this.crearGrupo = true;
        break;
      case '/crear-campana':
        this.crearCampana = true;
        break;

      default:
        if (window.location.pathname.indexOf('usuario')>-1) {
          this.editarUsuario = true;
        }
        if (window.location.pathname.indexOf('grupo')>-1) {
          this.editarGrupo = true;
        }
        break;
    } 


  }

}

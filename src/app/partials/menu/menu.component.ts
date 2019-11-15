import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public dashboard = false;
  public usuarios = false;
  public grupos = false;
  public campanas = false;
  public troncales = false;
  public estadisticos = false;
  public home = false;
  public dataUser;
  public superUsuario = false;

  constructor(private cookieService: CookieService) { 
    if (this.cookieService.get('datauser') != '') {
      this.dataUser = JSON.parse(this.cookieService.get('datauser'));
    } 
    
  }

  ngOnInit() {
    this.changueContent();
    if (this.dataUser.id_nivel == 1) {
      this.superUsuario = true;
    }
  }

  changueContent() {

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
      case '/crear-usuario':
        this.usuarios = true;
        break;      
      case '/grupos':
        this.grupos = true;
        break;
      case '/campanas':
        this.campanas = true;
        break;
      case '/crear-campana':
        this.campanas = true;
        break;
      case '/troncales':
        this.troncales = true;
        break;
      case '/crear-troncal':
        this.troncales = true;
        break;
      case '/estadisticos':
        this.estadisticos = true;
        break;    
      

      default:
        if (window.location.pathname.indexOf('usuario')>-1){
          this.usuarios = true;
        }
        break;
    }


  }

}

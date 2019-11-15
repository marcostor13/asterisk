import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PhpserviceService } from 'src/app/services/phpservice.service';

@Component({
  selector: 'app-troncales',
  templateUrl: './troncales.component.html',
  styleUrls: ['./troncales.component.scss']
})

export class TroncalesComponent implements OnInit {

  troncales:[]; 
  displayedColumns: string[] = ['id', 'name', 'climit', 'host','options' ];
  dataSource;
  cantTroncales = 0;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  public dataUser; 

  constructor(private cookieService: CookieService, private phpserviceService: PhpserviceService) {
    this.dataUser = JSON.parse(this.cookieService.get('datauser'));
   }
  

  ngOnInit() {
    
    this.obtenerTroncales();
  }

  obtenerTroncales() {

    const data = {        
      funcion: 'obtenerTroncales',
      idnivel: this.dataUser.id_nivel,
      idnegocio: this.dataUser.id_negocio,
    };

    this.phpserviceService.funciones(data).subscribe(datos => {

      if (datos['status'] == 200) {
        this.troncales = datos['data'];
        this.cantTroncales =  datos['data'].length;
        document.getElementById('subTitle').innerText = this.cantTroncales.toString() + ' troncales' ;
        this.dataSource = new MatTableDataSource(this.troncales)
        this.dataSource.paginator = this.paginator;
      } else {
        console.log(datos['message']);
      }
    });

  }

  eliminarTroncal(id){
    const data = {
      funcion: 'eliminarTroncal',
      id: id   
    };

    this.phpserviceService.funciones(data).subscribe(datos => {

      if (datos['status'] == 200) {
        this.obtenerTroncales();
        console.log(datos['message']);      
      } else {
        console.log(datos['message']);
      }
    });
  }

}

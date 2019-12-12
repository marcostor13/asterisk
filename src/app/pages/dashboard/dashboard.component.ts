import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PhpserviceService } from 'src/app/services/phpservice.service';

export interface DialogData {
  idenvio_ivr: string;
  datos: [];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  campanas: [];
  calls: [];
  displayedColumns: string[] = ['idenvio_ivr', 'numero', 'fecha_envio', 'callerid', 'cause_ast', 'options'];
  callAmount = 0;
  dataUser;
  dataSource;
  campanaSelect;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(private cookieService: CookieService, private phpserviceService: PhpserviceService, private router: Router, public dialog: MatDialog) {
    if (this.cookieService.get('datauser') != '') {
      this.dataUser = JSON.parse(this.cookieService.get('datauser'));
      console.log(this.dataUser);
    }

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(idenvio_ivr): void {
    const dialogRef = this.dialog.open(ModalComponentCalls, {
      width: '250px',
      data: { idenvio_ivr: idenvio_ivr }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: ' + result);
    });
  }

  ngOnInit() {    
    this.getCampanas()
  }

  getCalls(e) {

    const data = {
      funcion: 'obtenerLLamadas',
      nombre_campana: e.target.value      
    };

    this.phpserviceService.funciones(data).subscribe(datos => {
      console.log(datos);
      if (datos['status'] == 200) {
        this.calls = datos['data'];
        this.callAmount = datos['data'].length;
        document.getElementById('subTitle').innerText = this.callAmount.toString() + ' llamadas';
        this.dataSource = new MatTableDataSource(this.calls)
        this.dataSource.paginator = this.paginator;
      } else {
        console.log(datos['message']);
      }
    });

  }

  openDetail(datos): void {
    console.log(datos);
    const dialogRef = this.dialog.open(ModalComponentCalls, {
      width: '250px',
      data: { datos: datos }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: ' + result);
    });
    
  }

  getCampanas(){

    const data = {
      funcion: 'obtenerCampanas2',
      tiponivel: this.dataUser.id_nivel,
      idnegocio: this.dataUser.id_negocio,      
    };

    console.log(data);

    this.phpserviceService.funciones(data).subscribe(datos => {
      console.log(datos);
      if (datos['status'] == 200) {
        this.campanas = datos['data'];
      } else {
        console.log(datos['message']);
      }
    });

  }

  viewDetail(idenvio_ivr) {
    console.log(idenvio_ivr);
  }

}

@Component({
  selector: 'modal.componentCalls',
  templateUrl: './modal.componentCalls.html',
  styles: ['']
})


export class ModalComponentCalls {


  constructor(public dialogRef: MatDialogRef<ModalComponentCalls>, @Inject(MAT_DIALOG_DATA) public data: DialogData, public dialog: MatDialog) { 
    console.log(this.data.datos);
    this.calls = this.data.datos;
  }

  calls: any;  

  close(): void {
    this.dialogRef.close();
  }

}

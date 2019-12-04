import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PhpserviceService } from 'src/app/services/phpservice.service';

export interface DialogData {
  datos: [];
  val: string;
  action: string;
}

export interface DialogDataDetail {
  datos: [];
}

@Component({
  selector: 'app-campanas',
  templateUrl: './campanas.component.html',
  styleUrls: ['./campanas.component.scss']
})
export class CampanasComponent implements OnInit {

  campanas: [];
  displayedColumns: string[] = ['nombre','detalle', 'progreso', 'estado', 'gestiones'];
  dataSource;
  cantCampanas = 0;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  public dataUser;


  constructor(private cookieService: CookieService, private phpserviceService: PhpserviceService, private router: Router, public dialog: MatDialog) {
    if (this.cookieService.get('datauser') != ''){
      if (this.cookieService.get('datauser') != '') {
      this.dataUser = JSON.parse(this.cookieService.get('datauser'));
    } 
    }   
  }

  openDialog(val, datos, action): void {
    console.log(datos);
    const dialogRef = this.dialog.open(ModalComponentCampanas, {
      width: '250px',
      data: { datos: datos, val: val, action: action }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: ' + result);
    });
  }


  openDetail(datos): void {
    console.log(datos);
    const dialogRef = this.dialog.open(ModalComponentCampanasDetail, {
      width: '250px',
      data: { datos: datos }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: ' + result);
    });
  }

  ngOnInit() {
    this.obtenerCampanas();
  }

  obtenerCampanas() {

    const data = {
      funcion: 'obtenerCampanas',
      idnegocio: this.dataUser.id_negocio,
      idnivel: this.dataUser.id_nivel
    };
    this.phpserviceService.funciones(data).subscribe(datos => {

      if (datos['status'] == 200) {
        console.log(datos['data']);
        this.campanas = datos['data'];
        this.cantCampanas = datos['data'].length;
        document.getElementById('subTitle').innerText = this.cantCampanas.toString() + ' usuarios';
        this.dataSource = new MatTableDataSource(this.campanas)
        this.dataSource.paginator = this.paginator;
      } else {
        console.log(datos['message']);
      }
    });

  }

  gestiones(val, datos, action){
    const data = {
      funcion: 'gestionCampanas',
      data: datos,
      val: val
    }

    this.phpserviceService.funciones(data).subscribe(datos => {

      if (datos['status'] == 200) {
        alert(datos['message']);
        window.location.reload();
        
      } else {
        console.log(datos['message']);
      }
    });
  }

  verDetalle(idcampana){
    console.log(idcampana);
  }

  descargarCampana(nombrecampana){

    const data = {
      funcion: 'descargarCampana',
      nombrecampana: nombrecampana
    };

    window.location.href = "http://178.128.157.95/controladores/get/descargarReporte.php?nombre_campana=" + nombrecampana;
  }


}

@Component({
  selector: 'modal.component',
  templateUrl: './modal.component.html',
  styles: ['']
})



export class ModalComponentCampanas {


  constructor(public dialogRef: MatDialogRef<ModalComponentCampanas>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private cookieService: CookieService, private phpserviceService: PhpserviceService, private router: Router, public dialog: MatDialog) {
    this.mensaje = this.data.action;
   }

  mensaje: string;

  onSiClick() {

    let campanas = new CampanasComponent(this.cookieService, this.phpserviceService, this.router, this.dialog);    
    campanas.gestiones(this.data.val, this.data.datos, this.data.action);
    this.onNoClick();

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


@Component({
  selector: 'modal.componentDetail',
  templateUrl: './modal.componentDetail.html',
  styles: ['']
})

export class ModalComponentCampanasDetail {

  constructor(public dialogRef: MatDialogRef<ModalComponentCampanasDetail>, @Inject(MAT_DIALOG_DATA) public data: DialogDataDetail, public dialog: MatDialog) {
    this.mensaje = this.data.datos;
  }

  mensaje: [];
  
  close(): void {
    this.dialogRef.close();
  }

}

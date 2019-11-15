import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PhpserviceService } from 'src/app/services/phpservice.service';

export interface DialogData {
  idgrupo: string;
}

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent implements OnInit {

  grupos: [];
  displayedColumns: string[] = ['idgrupo', 'grupo', 'options'];
  dataSource;
  cantGrupos = 0; 

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  public dataUser;


  constructor(private cookieService: CookieService, private phpserviceService: PhpserviceService, private router: Router, public dialog: MatDialog) {
    if (this.cookieService.get('datauser') != '') {
      this.dataUser = JSON.parse(this.cookieService.get('datauser'));
    } 

  }

  openDialog(idgrupo): void {
    const dialogRef = this.dialog.open(ModalComponent2, {
      width: '250px',
      data: { idgrupo: idgrupo }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: ' + result);
    });
  }

  ngOnInit() {
    this.obtenerGrupos();
  }

  obtenerGrupos() {

    const data = {
      funcion: 'obtenerGrupos',
    };

    this.phpserviceService.funciones(data).subscribe(datos => {

      if (datos['status'] == 200) {
        this.grupos = datos['data'];
        this.cantGrupos = datos['data'].length;
        document.getElementById('subTitle').innerText = this.cantGrupos.toString() + ' grupos';
        this.dataSource = new MatTableDataSource(this.grupos)
        this.dataSource.paginator = this.paginator;
      } else {
        console.log(datos['message']);
      }
    });

  }

  eliminarGrupo(idgrupo) {
    const data = {
      funcion: 'eliminarGrupo',
      idgrupo: idgrupo
    };

    this.phpserviceService.funciones(data).subscribe(datos => {

      if (datos['status'] == 200) {
        this.obtenerGrupos();
        window.location.reload();
        console.log(datos['message']);
      } else {
        console.log(datos['message']);
      }
    });
  }

  editarGrupo(id) {
    this.router.navigate(['/editar-grupo', id]);
  }



}

@Component({
  selector: 'modal.component',
  templateUrl: './modal.component.html',
  styles: ['']
})


export class ModalComponent2 {


  constructor(public dialogRef: MatDialogRef<ModalComponent2>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private cookieService: CookieService, private phpserviceService: PhpserviceService, private router: Router, public dialog: MatDialog) { }


  eliminarGrupo() {

    let grupos = new GruposComponent(this.cookieService, this.phpserviceService, this.router, this.dialog);
    grupos.eliminarGrupo(this.data.idgrupo);
    this.onNoClick();
    

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

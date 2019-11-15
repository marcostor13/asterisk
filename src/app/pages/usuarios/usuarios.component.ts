import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PhpserviceService } from 'src/app/services/phpservice.service';

export interface DialogData {
  idpersonal: string;
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarios: [];
  displayedColumns: string[] = ['id', 'name', 'dni', 'negocio', 'correo', 'usuario', 'options'];
  dataSource;
  cantUsuarios = 0;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  public dataUser; 


  constructor(private cookieService: CookieService, private phpserviceService: PhpserviceService, private router: Router, public dialog: MatDialog) {
    this.dataUser = JSON.parse(this.cookieService.get('datauser'));
    
  }

  openDialog(idpersonal): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      data: { idpersonal: idpersonal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: ' + result);      
    });
  }

  ngOnInit() {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {

    const data = {
      funcion: 'obtenerUsuarios',
    };

    this.phpserviceService.funciones(data).subscribe(datos => {

      if (datos['status'] == 200) {
        this.usuarios = datos['data'];
        this.cantUsuarios = datos['data'].length;
        document.getElementById('subTitle').innerText = this.cantUsuarios.toString() + ' usuarios';
        this.dataSource = new MatTableDataSource(this.usuarios)
        this.dataSource.paginator = this.paginator;
      } else {
        console.log(datos['message']);
      }
    });

  }

  eliminarUsuario(idpersonal) {
    const data = {
      funcion: 'eliminarUsuario',
      idpersonal: idpersonal
    };

    this.phpserviceService.funciones(data).subscribe(datos => {

      if (datos['status'] == 200) {
        this.obtenerUsuarios();
        window.location.reload();
        console.log(datos['message']);
      } else {
        console.log(datos['message']);
      }
    });
  }

  editarUsuario(id) {
    this.router.navigate(['/editar-usuario', id]);
  }

  

}

@Component({
  selector: 'modal.component',
  templateUrl: './modal.component.html',
  styles: ['']
})


export class ModalComponent {
  

  constructor(public dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private cookieService: CookieService, private phpserviceService: PhpserviceService, private router: Router, public dialog: MatDialog) { }

  
  eliminarUsuario(){
    console.log(this.data);
    
    let usuarios = new UsuariosComponent(this.cookieService, this.phpserviceService, this.router, this.dialog);
    usuarios.eliminarUsuario(this.data.idpersonal);
    this.onNoClick();
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  } 

}

import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PhpserviceService } from 'src/app/services/phpservice.service';
import { FormGroup, FormControl } from '@angular/forms';

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
  date: any = new Date();
  dateGroup: FormGroup;

  //CHARTS

  single: any[];
  single2: any[];
  view: any[] = [470, 300];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = false;
  showXAxisLabel: boolean = true;
  yAxisLabel1: string = "Campañas";
  yAxisLabel2: string = "Estado de llamada";
  showYAxisLabel: boolean = true;
  xAxisLabel1: string = "Total números gestionados";
  xAxisLabel2: string = "Total números";


  colorScheme = {
    domain: ["#dbddff", "#5d78ff", "#C7B42C", "#AAAAAA"]

  };

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(private cookieService: CookieService, private phpserviceService: PhpserviceService, private router: Router, public dialog: MatDialog) {
    if (this.cookieService.get('datauser') != '') {
      this.dataUser = JSON.parse(this.cookieService.get('datauser'));
    }
    this.dateGroup = this.createFormGroup();

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
    this.date.setDate(this.date.getDate() - 7);
    this.getCampanas();
    this.getDataDashboard();
  }

  createFormGroup() {
    return new FormGroup({      
      campana: new FormControl('0'),
      dateStart: new FormControl(this.date),
      dateEnd: new FormControl(new Date()),
    });
  }


  getDataDashboard(){

    var self = this;
    const data = {
      funcion: 'getDataDashboard',
      nombre_campana: this.dateGroup.get('campana').value,
      dateStart: this.dateGroup.get('dateStart').value.toJSON().slice(0, 10),
      dateEnd: this.dateGroup.get('dateEnd').value.toJSON().slice(0, 10),
      tiponivel: this.dataUser.id_nivel,
      idnegocio: this.dataUser.id_negocio,
    };

    this.phpserviceService.funciones(data).subscribe((datos:any) => {
      if (datos['status'] == 200) {
        
        self.single = datos.data.cuadro1;
        self.single2 = datos.data.cuadro2;

        Object.assign(this, this.single);
        Object.assign(this, this.single2);

        if (datos.data.detalleLLamadas){
          this.calls = datos.data.detalleLLamadas;
          this.callAmount = datos.data.detalleLLamadas.length;
          document.getElementById('subTitle').innerText = this.callAmount.toString() + ' llamadas';
          this.dataSource = new MatTableDataSource(this.calls)
          this.dataSource.paginator = this.paginator;
        }else{
          this.calls = [];
          this.callAmount = 0;
          document.getElementById('subTitle').innerText = this.callAmount.toString() + ' llamadas';
          this.dataSource = new MatTableDataSource(this.calls)
          this.dataSource.paginator = this.paginator;
        }
        
        
      } else {
        console.log(datos['message']);
      }
    });
  }


  openDetail(datos): void {
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
      funcion: 'obtenerLLamadas2',
      tiponivel: this.dataUser.id_nivel,
      idnegocio: this.dataUser.id_negocio,      
    };

    this.phpserviceService.funciones(data).subscribe(datos => {
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

  get dateStart() { return this.dateGroup.get('dateStart'); }
  get dateEnd() { return this.dateGroup.get('dateEnd'); }
  get campana() { return this.dateGroup.get('campana'); }
  

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

import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PhpserviceService } from 'src/app/services/phpservice.service';

@Component({
  selector: 'app-editar-grupo',
  templateUrl: './editar-grupo.component.html',
  styleUrls: ['./editar-grupo.component.scss']
})
export class EditarGrupoComponent implements OnInit {

  public formCrearGrupo: FormGroup;
  public response;
  public dataUser;
  public classValid;
  public idgrupo2;

  constructor(private cookieService: CookieService, private phpserviceService: PhpserviceService) {
    this.formCrearGrupo = this.createFormGroup();
  }

  ngOnInit() {
    if (this.cookieService.get('datauser') != '') {
      this.dataUser = JSON.parse(this.cookieService.get('datauser'));
    } 
    this.obtenerDatosGrupo()

  }

  obtenerDatosGrupo() {
    let path = window.location.pathname;
    let idgrupo = path.split('/')[path.split('/').length - 1];
    this.idgrupo2 = idgrupo;
    let data = {
      funcion: 'obtenerDataPorCampo',
      valor: idgrupo,
      columna: 'idnegocio',
      tabla: 'negocio'
    }

    this.phpserviceService.funciones(data).subscribe(datos => {
      if (datos['status'] == 200) {
        let dataUserEdit = datos['data'][0];

        this.formCrearGrupo.controls['idgrupo'].setValue(dataUserEdit.idnegocio);
        this.formCrearGrupo.controls['grupo'].setValue(dataUserEdit.descripcion);

      } else {
        console.log(datos['message']);
      }
    });

  }
 

  editarGrupo() {

    if (!this.formCrearGrupo.invalid) {

      if (this.dataUser.id_nivel == 1) {
        const data = this.formCrearGrupo.value;
        data.funcion = 'editarGrupo';
        data.idgrupo = this.idgrupo2;

        this.phpserviceService.funciones(data).subscribe(datos => {
          if (datos['status'] == 200) {
            this.classValid = 'text-success';
            this.response = datos['message'];
            this.formCrearGrupo.reset();
          } else if (datos['status'] == 101) {
            this.classValid = 'text-danger';
            this.response = datos['message'];
          } else {
            console.log(datos['message']);
          }
        });
      }

    }

  }

  createFormGroup() {
    return new FormGroup({
      idgrupo: new FormControl('', [Validators.required]),
      grupo: new FormControl('', [Validators.required]),     
    });
  }


  get idgrupo() { return this.formCrearGrupo.get('idgrupo'); }
  get grupo() { return this.formCrearGrupo.get('grupo'); }

}


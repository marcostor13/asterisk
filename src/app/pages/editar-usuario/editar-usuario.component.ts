import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PhpserviceService } from 'src/app/services/phpservice.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {

  public formCrearUsuario: FormGroup;
  public response;
  public dataUser;
  public negocios: [];
  public niveles: [];
  public classValid;
  public idpersonal;

  constructor(private cookieService: CookieService, private phpserviceService: PhpserviceService) {
    this.formCrearUsuario = this.createFormGroup();
  }

  ngOnInit() {
    this.dataUser = JSON.parse(this.cookieService.get('datauser'));

    this.obtenerNegocios();
    this.obtenerTipoNivel();
    this.obtenerDatosUsuario()

  }

  obtenerDatosUsuario(){
    let path = window.location.pathname;
    let idpersonal = path.split('/')[path.split('/').length-1];
    this.idpersonal = idpersonal;
    let data = {
      funcion: 'obtenerDataPorCampo',
      valor: idpersonal,
      columna: 'idpersonal',
      tabla: 'personal'
    }

    this.phpserviceService.funciones(data).subscribe(datos => {
      if (datos['status'] == 200) {
        let dataUserEdit = datos['data'][0];

        this.formCrearUsuario.controls['dni'].setValue(dataUserEdit.dni);
        this.formCrearUsuario.controls['nombres'].setValue(dataUserEdit.nombres);
        this.formCrearUsuario.controls['apellidopaterno'].setValue(dataUserEdit.ape_paterno);
        this.formCrearUsuario.controls['apellidomaterno'].setValue(dataUserEdit.ape_materno);
        this.formCrearUsuario.controls['tipoestado'].setValue(dataUserEdit.idtipo_estado);
        this.formCrearUsuario.controls['usuario'].setValue(dataUserEdit.usuario);
        this.formCrearUsuario.controls['password'].setValue(dataUserEdit.clave);
        this.formCrearUsuario.controls['negocio'].setValue(dataUserEdit.idnegocio);
        this.formCrearUsuario.controls['tiponivel'].setValue(dataUserEdit.idtipo_nivel);
        this.formCrearUsuario.controls['correo'].setValue(dataUserEdit.mail);

      } else {
        console.log(datos['message']);
      }
    });

  }

  obtenerNegocios() {

    const data = {
      tabla: 'negocio',
      funcion: 'obtenerTabla'
    };

    this.phpserviceService.funciones(data).subscribe(datos => {
      if (datos['status'] == 200) {
        this.negocios = datos['data'];
      } else {
        console.log(datos['message']);
      }
    });
  }

  obtenerTipoNivel() {

    const data = {
      tabla: 'tipo_nivel',
      funcion: 'obtenerTabla'
    };

    this.phpserviceService.funciones(data).subscribe(datos => {
      if (datos['status'] == 200) {
        this.niveles = datos['data'];
      } else {
        console.log(datos['message']);
      }
    });
  }

  editarUsuario() {

    if (!this.formCrearUsuario.invalid) {

      if (this.dataUser.id_nivel == 1) {
        const data = this.formCrearUsuario.value;
        data.funcion = 'editarUsuario';
        data.idpersonal = this.idpersonal;

        this.phpserviceService.funciones(data).subscribe(datos => {
          if (datos['status'] == 200) {
            this.classValid = 'text-success';
            this.response = datos['message'];
            this.formCrearUsuario.reset();
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
      dni: new FormControl('', [Validators.required]),
      nombres: new FormControl('', [Validators.required]),
      apellidopaterno: new FormControl('', [Validators.required]),
      apellidomaterno: new FormControl('', [Validators.required]),
      tipoestado: new FormControl('', [Validators.required]),
      usuario: new FormControl(''),
      password: new FormControl('', [Validators.required]),
      negocio: new FormControl('', [Validators.required]),
      tiponivel: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.required, Validators.email]),
    });
  }


  get dni() { return this.formCrearUsuario.get('dni'); }
  get nombres() { return this.formCrearUsuario.get('nombres'); }
  get apellidopaterno() { return this.formCrearUsuario.get('apellidopaterno'); }
  get apellidomaterno() { return this.formCrearUsuario.get('apellidomaterno'); }
  get tipoestado() { return this.formCrearUsuario.get('tipoestado'); }
  get usuario() { return this.formCrearUsuario.get('usuario'); }
  get password() { return this.formCrearUsuario.get('password'); }
  get negocio() { return this.formCrearUsuario.get('negocio'); }
  get tiponivel() { return this.formCrearUsuario.get('tiponivel'); }
  get correo() { return this.formCrearUsuario.get('correo'); }
}


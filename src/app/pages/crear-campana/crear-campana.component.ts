import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PhpserviceService } from 'src/app/services/phpservice.service';



@Component({
  selector: 'app-crear-campana',
  templateUrl: './crear-campana.component.html',
  styleUrls: ['./crear-campana.component.scss']
})
export class CrearCampanaComponent implements OnInit {

  public formCrearGrupo: FormGroup;
  public response;
  public dataUser;
  public classValid;

  errors = '';
  responseFile = '';
  trueimg: Boolean = false;
  loader: Boolean = false;
  myimg: string;
  final: Boolean = true;
  msn: string;

  constructor(private cookieService: CookieService, private phpserviceService: PhpserviceService) {
    this.formCrearGrupo = this.createFormGroup();
  }

  ngOnInit() {
    if (this.cookieService.get('datauser') != '') {
      if (this.cookieService.get('datauser') != '') {
        this.dataUser = JSON.parse(this.cookieService.get('datauser'));
      }
    }

  }

  uploadFile(e){
    if(this.comprueba_extension_wav(e) === true){
      this.uploadFileServer(e);
    }
  }

  

  comprueba_extension_wav(e) {
    let extensiones_permitidas = new Array(".wav");
    let archivo = e.target.files[0].name;

    if (!archivo) {
      this.errors = "No ha seleccionado ningun archivo";
    } else {
      let extension = (archivo.substring(archivo.lastIndexOf("."))).toLowerCase();
      let permitida = false;
      for (var i = 0; i < extensiones_permitidas.length; i++) {
        console.log(extension);
        console.log(extensiones_permitidas[i]);
        if (extensiones_permitidas[i] == extension) {

         
          permitida = true;
          break;
        }
      }
      if (!permitida) {
        this.errors = "Sólo se pueden subir archivos con extensiones: " + extensiones_permitidas.join();
        e.target.form.reset();

      } else {        
        return true;
      }
    }   
    return false;
  }
  

  createFormGroup() {
    return new FormGroup({
      idgrupo: new FormControl('', [Validators.required]),
      grupo: new FormControl('', [Validators.required]),
    });
  }

  uploadFileServer(ev) {

    let img: any = ev.target;
    if (img.files.length > 0) {
      this.loader = true;
      let form = new FormData();
      form.append('file', img.files[0]);
      this.phpserviceService.uploadFile(form).subscribe(
        resp => {
          this.loader = false;
          if (resp.status) {
            console.log(resp);
            this.responseFile = "Archivo Subido";
          }
        },
        error => {
          this.loader = false;
          console.log(error);

        }
      );

      
    }
  }

  get idgrupo() { return this.formCrearGrupo.get('idgrupo'); }
  get grupo() { return this.formCrearGrupo.get('grupo'); }

}


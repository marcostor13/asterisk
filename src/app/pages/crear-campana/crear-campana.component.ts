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

  public formCrearCampana: FormGroup;
  public response;
  public dataUser;
  public classValid;

  proveedores = [];
  troncales = [];
  fechaenvio = '';

  ivrResp = false;

  fileUpload = '';
  fileUpload2 = ''; 
  


  errors = '';
  errors2 = '';
  responseFile = '';
  responseFileExcel = '';
  trueimg: Boolean = false;
  loader: Boolean = false;
  myimg: string;
  final: Boolean = true;
  msn: string;

  constructor(private cookieService: CookieService, private phpserviceService: PhpserviceService) {
    this.formCrearCampana = this.createFormGroup();
  }

  ngOnInit() {
    if (this.cookieService.get('datauser') != '') {
      if (this.cookieService.get('datauser') != '') {
        this.dataUser = JSON.parse(this.cookieService.get('datauser'));
      }
    }

    this.getSelect('getProveedores');
    this.getSelect('getTroncales');

    this.trespuesta.setValue('0');
    this.hora1.setValue('08:00');
    this.hora2.setValue('20:00'); 
    // this.getToday();

    

  }

  // getToday(){
  //   let today = new Date();
  //   let dd = String(today.getDate()).padStart(2, '0');
  //   let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  //   let yyyy = today.getFullYear();

  //   this.dia.setValue(dd + '/' + mm + '/' + yyyy);

  // }

  createFormGroup() {
    return new FormGroup({
      idproveedor: new FormControl('', [Validators.required]),
      troncal: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      callerid: new FormControl('', [Validators.required]),
      dia: new FormControl('', [Validators.required]),
      hora1: new FormControl('', [Validators.required]),
      hora2: new FormControl('', [Validators.required]),
      ivr: new FormControl('', [Validators.required]),
      trespuesta: new FormControl('', []),
      troncalr: new FormControl('', []),
    });
  }

  uploadFile(e){
    if(this.comprueba_extension_wav(e, '.wav') === true){
      this.uploadFileServer(e);
    }
  }

  getSelect(funcion){

    let data = this.dataUser;
    data.funcion = funcion;

    this.phpserviceService.funciones(data).subscribe(datos => {
      console.log(datos);
      if (datos['status'] == 200) {
        switch (funcion) {
          case 'getProveedores':
            this.proveedores = datos['data']; 
            break;
          case 'getTroncales':
            this.troncales = datos['data'];
            break;
        
          default:
            break;
        }
        
        
      } else {
        console.log(datos['message']);
      }
    });
  }

  

  comprueba_extension_wav(e, ext) {
    let extensiones_permitidas = new Array(ext);
    let archivo = e.target.files[0].name;

    if (!archivo) {
      if(ext == '.wav'){
        this.errors = "No ha seleccionado ningun archivo";

      }
      else{
        this.errors2 = "No ha seleccionado ningun archivo";
      }
    } else {
      let extension = (archivo.substring(archivo.lastIndexOf("."))).toLowerCase();
      let permitida = false;
      for (var i = 0; i < extensiones_permitidas.length; i++) {
        if (extensiones_permitidas[i] == extension) {
         
          permitida = true;
          break;
        }
      }
      if (!permitida) {
        if(ext == '.wav'){
          this.errors = "Sólo se pueden subir archivos con extensiones: " + extensiones_permitidas.join();

        }
        else{
          this.errors2 = "No ha seleccionado ningun archivo";
        }

        if(e.target.form){
          e.target.form.reset();

        }

      } else {        
        return true;
      }
    }   
    return false;
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
            console.log(resp.generatedName);
            this.responseFile = "Archivo Subido";
            this.fileUpload = resp.generatedName;
          }
        },
        error => {
          this.loader = false;
          console.log(error);

        }
      );
    }
  }

  uploadFileExcel(e) {
    console.log(e);
    if (this.comprueba_extension_wav(e, '.xlsx') === true || this.comprueba_extension_wav(e, '.xlx') === true) {
      this.uploadFileServerExcel(e);
    }
  }

  uploadFileServerExcel(ev) {

    console.log(ev);

    let img: any = ev.target;
    if (img.files.length > 0) {
      this.loader = true;
      let form = new FormData();
      form.append('file', img.files[0]);
      this.phpserviceService.uploadFile(form).subscribe(
        resp => {
          this.loader = false;
          if (resp.status) {
            console.log(resp.generatedName);
            this.responseFileExcel = "Archivo Subido";
            this.fileUpload2 = resp.generatedName;
          }
        },
        error => {
          this.loader = false;
          console.log(error);

        }
      );
    }
  }


  getName(e){

    if(e.target.value != ''){

      let data = this.dataUser;
      data.funcion = 'crearNombre';
      data.id = e.target.value;

      this.phpserviceService.funciones(data).subscribe(datos => {
        console.log(datos);
        if (datos['status'] == 200) {
          this.formCrearCampana.controls['nombre'].setValue(datos['data']);
        } else {
          console.log(datos['message']);
        }
      });

    }
  }

  colocarArchivo(event){
    console.log(event);
    const file = event.target.files[0];
    this.formCrearCampana.get('carga').setValue(file);
  }

  crearCampana(){

    this.response = '';

    if(this.fileUpload == ''){
      this.response = 'Debe subir un archivo de audio';
      return false;
    }

    if(this.fileUpload2 == ''){
      this.response = 'Debe subir un archivo de de excel';
      return false;
    }
    

    if (!this.formCrearCampana.invalid) {
      const data = this.formCrearCampana.value;      
      data.audiof = this.fileUpload;
      data.session = this.dataUser;

      data.funcion = 'crearCampana';
      data.carga = this.fileUpload2;


      this.phpserviceService.funciones(data).subscribe(datos => {
        if (datos['status'] == 200) {
          this.response = datos['message'];
          this.formCrearCampana.reset();
          console.log(datos);
        } else{
          this.response = datos['message'];
          console.log(datos);
        }
      });


    }
  }

  showIvrResp(){
    console.log('as');

    if(this.formCrearCampana.get('ivr').value != 1){
        this.ivrResp = true;
    }else{
        this.ivrResp = false;
    }

  }

  get idproveedor() { return this.formCrearCampana.get('idproveedor'); }
  get troncal() { return this.formCrearCampana.get('troncal'); }
  get nombre() { return this.formCrearCampana.get('nombre'); }
  get callerid() { return this.formCrearCampana.get('callerid'); }
  get dia() { return this.formCrearCampana.get('dia'); }
  get hora1() { return this.formCrearCampana.get('hora1'); }
  get hora2() { return this.formCrearCampana.get('hora2'); }
  get ivr() { return this.formCrearCampana.get('ivr'); }
  get trespuesta() { return this.formCrearCampana.get('trespuesta'); }
  get troncalr() { return this.formCrearCampana.get('troncalr'); }


  

}


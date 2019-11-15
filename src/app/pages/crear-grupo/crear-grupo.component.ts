import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PhpserviceService } from 'src/app/services/phpservice.service';

@Component({
  selector: 'app-crear-grupo',
  templateUrl: './crear-grupo.component.html',
  styleUrls: ['./crear-grupo.component.scss']
})
export class CrearGrupoComponent implements OnInit {

  public formCrearGrupo: FormGroup;
  public response;
  public dataUser;
  public classValid;

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

  
  crearGrupo() {

    if (!this.formCrearGrupo.invalid) {

      if (this.dataUser.id_nivel == 1) {
        const data = this.formCrearGrupo.value;
        data.funcion = 'crearGrupo';

        console.log(this.formCrearGrupo.value);   
       
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


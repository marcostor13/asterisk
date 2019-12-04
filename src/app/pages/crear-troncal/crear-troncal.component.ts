import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PhpserviceService } from 'src/app/services/phpservice.service';

@Component({
  selector: 'app-crear-troncal',
  templateUrl: './crear-troncal.component.html',
  styleUrls: ['./crear-troncal.component.scss']
})
export class CrearTroncalComponent implements OnInit {

  public formCrearTroncal: FormGroup;
  public favoriteSeason: string;
  public nats: string[] = ['Yes', 'No'];
  public codecs: string[] = ['G729', 'G726'];
  public tipos: string[] = ['Peer', 'User'];
  public response;
  public dataUser; 

  constructor(private cookieService: CookieService, private phpserviceService: PhpserviceService) { 
    this.formCrearTroncal = this.createFormGroup();
  }

  ngOnInit() {
    if (this.cookieService.get('datauser') != '') {
      this.dataUser = JSON.parse(this.cookieService.get('datauser'));
    } 
     
    
  }

  crearTroncal(){
    
    if (!this.formCrearTroncal.invalid) {

      const data = {
        troncal: this.formCrearTroncal.get('troncal').value,
        host: this.formCrearTroncal.get('host').value,
        climit: this.formCrearTroncal.get('climit').value,
        nat: this.formCrearTroncal.get('nat').value,
        codec: this.formCrearTroncal.get('codec').value,
        tipo: this.formCrearTroncal.get('tipo').value,
        idnegocio: this.dataUser.id_negocio,
        funcion: 'crearTroncales'
      };
      this.phpserviceService.funciones(data).subscribe(datos => {
        console.log(datos);  
        if (datos['status'] == 200) {  
                
          this.response = datos['message'];          
        } else {
          console.log(datos['message']);          
        }
      });

    }   

  }

  createFormGroup() {
    return new FormGroup({
      troncal: new FormControl('', [Validators.required]),
      host: new FormControl('', [Validators.required, Validators.minLength(8)]),
      climit: new FormControl('', [Validators.required]),
      nat: new FormControl('', [Validators.required]),
      codec: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required]),
    });
  }


  get troncal() { return this.formCrearTroncal.get('troncal'); }
  get host() { return this.formCrearTroncal.get('host'); }
  get climit() { return this.formCrearTroncal.get('climit'); }
  get nat() { return this.formCrearTroncal.get('nat'); }
  get codec() { return this.formCrearTroncal.get('codec'); }
  get tipo() { return this.formCrearTroncal.get('tipo'); }

}

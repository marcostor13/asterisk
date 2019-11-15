import { PhpserviceService } from './../../services/phpservice.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  response = '';

  public isLogged: boolean = false;

  createFormGroup() {
    return new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])      
    });
  }

  formLogin: FormGroup;

  constructor(private router: Router, private phpserviceService: PhpserviceService, private cookieService: CookieService) {
    this.formLogin = this.createFormGroup();
  }


  ngOnInit() {
    
  }

  onLogin() {
    if (!this.formLogin.invalid) {

      const authData = {
        username: this.formLogin.get('username').value,
        password: this.formLogin.get('password').value,
        funcion: 'ingreso'
      };

      this.phpserviceService.login(authData).subscribe(datos => {

        if (datos['status'] == 200) {
          this.cookieService.set('datauser', JSON.stringify(datos['data']));
          this.router.navigate(['/']);
        } else {
          this.response = datos['message']
        }
      });

    }
  }

  onResetForm() {
    this.formLogin.reset();
  }

  

  onLogout() {
    
  }

  


  get username() { return this.formLogin.get('username'); }
  get password() { return this.formLogin.get('password'); }




}

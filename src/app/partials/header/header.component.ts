import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public dataUser; 
  
  constructor(private cookieService: CookieService, private router: Router) { 
    
  }
  

  ngOnInit() {   
    if (this.cookieService.get('datauser').trim() == ''){
      console.log('k');
      this.router.navigate(['/login']);
    }else{
      this.dataUser = JSON.parse(this.cookieService.get('datauser'));
    }
  }

  exit(){
    this.cookieService.set('datauser', '');
    this.router.navigate(['/login']);
  }

}

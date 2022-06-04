import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  path:string = "";

  isLogged:boolean = false;

  test:any

  user$: Observable <any> = this._authService.afauth.user

  classActivate:string=''

  constructor(private _authService:AuthService, private router:Router) { }

  ngOnInit(): void {

  }

  

  async onLogout(){
    try{
      await this._authService.logout();
      localStorage.removeItem('Usuario');
      this.isLogged = false;
      this.router.navigate(['/']);

    }catch(err){
      console.log(err);
    }

  }

  onClassActivate(item :string){
    this.classActivate = item;
  }

}

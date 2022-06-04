import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';


@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html',
  styleUrls: ['./ingresar.component.css']
})
export class IngresarComponent {

  type : string = 'password'

  eye : boolean = false

  test:any

  isIncorrecto = false;

  form : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService : AuthService,
    private router:Router,
    ) { 

    
    this.form = this.formBuilder.group({
      email: [
        null,
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ]
    })
  }

  ngOnInit(): void {
    
  }

  campoEsValido(campo: string) {
    return (
      this.form.controls[campo].errors &&
      this.form.controls[campo].touched
    );
  }

  async onLogin(){
    const {email, password} = this.form.value;
    try{
      const user = await this.authService.login(email, password);
      if (user){
        localStorage.setItem('Usuario', JSON.stringify(user.user)); 
        this.router.navigate(['/Dashboard']);
        this.test = localStorage.getItem('Usuario' || null);
        this.test = JSON.parse(this.test);
        if(this.test){
          console.log(this.test.uid);
          this.authService.addUser(this.test.uid);
        }
      }else{
        this.isIncorrecto = true;
      }
    }catch(err){
      console.log(err);
    }
  
  }


  async onLoginWithGoogle(){
    try{
      const user = await this.authService.loginWithGoogle();
      if(user){
        this.router.navigate(['/Dashboard']);
        localStorage.setItem('Usuario', JSON.stringify(user.user));
        this.test = localStorage.getItem('Usuario') || null;
        if(this.test){
        }
      }
    }catch(err){
      console.log(err);
    }
  }

  openEye(){
    if(this.eye == false){
      this.eye = true
      this.type = 'text'
    }else{
      this.eye = false; 
      this.type = 'password'
    }
    
  }

}

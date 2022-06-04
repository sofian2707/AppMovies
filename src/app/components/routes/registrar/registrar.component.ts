import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  type : string = 'password'

  eye : boolean = false

  form : FormGroup;

  constructor( 
    private formBuilder: FormBuilder, 
    private auth:AuthService,
    private router:Router
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

  async onRegister(){
    const {email, password} = this.form.value;
    try{
      const user = await this.auth.register(email, password);
      if(user){
        this.router.navigate(['/Ingresar']);
      }

    }catch(err){
      console.log(err);
    }
  }

  openEye(){
    if(this.eye == false){
      this.eye = true;
      this.type = 'text';
    }else{
      this.eye = false; 
      this.type = 'password';
    }
  }

}
import { userError } from '@angular/compiler-cli/src/transformers/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseErrors } from 'src/app/clases/firebase-error';
import { ErrorService } from 'src/app/services/error.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  seleccion: string = '';;
  usuario: string = '';
  clave: string = '';
  message: string = '';
  constructor(private authSvc: AuthService, private router: Router, private error: ErrorService) { }

  ngOnInit(): void {
  }
  async onLogin() {
    const { email, password } = this.loginForm.value;
    try {
      const { user } = await this.authSvc.login(email, password);
      //console.log("pagina " );

      if (user) {
        this.message = "Bienvenido " + email;
        console.log("pagina 2" + JSON.stringify(user.email));
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000);
      }

    } catch (error: any) {
      console.log("pagina error " + error.code);
      /*  if (error instanceof Error) {
  
          console.log("error.message " + error.message);
          console.log("error.name " + error);
        }
        */
      this.message = this.error.getError(error.code);

    }



  }

  /*
    async onLogin() {
      const { email, password } = this.loginForm.value;
  
      const user = await this.authSvc.login(email, password).then(
        (res) => {
  
          this.message = "Bienvenido " + email;
          console.log("lala");
          console.log("user" + res.credential);
          setTimeout(() => {
            this.authSvc.updateLogUser(email);
            this.router.navigateByUrl('/home', { replaceUrl: true });
  
          }, 6000);
  
        },
        async (err) => {
          this.message = this.error.getError(err.code);
        }
      ).catch(err => {
        console.log("eoor", err);
      });
  
    }
  */
  onChange(seleccion: string) {
    console.log(seleccion);
    this.message = "";
    switch (seleccion) {
      case "admin":

        this.loginForm.setValue({ email: "usuario@usuario.com", password: "123456" });
        console.log(this.loginForm.value);

        break;
      case "fulanito":
        // this.usuario ="fulanito@user.com";
        // this.clave ="222222";
        this.loginForm.setValue({ email: "mail@hola.com", password: "clave123" });
        break;
    }
  }

}

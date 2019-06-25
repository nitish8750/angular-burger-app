import { Component } from '@angular/core'
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService,AuthResponseData } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error = null;

    constructor(private authService: AuthService, private router: Router){}

 switchMode(){
     this.isLoginMode = !this.isLoginMode;
 }

 onSubmit(form: NgForm){
     if(!form.valid){
         return;
     }
     this.isLoading = true;
     const email = form.value.email;
     const password = form.value.password;
     let authObs: Observable<AuthResponseData>;
     if(this.isLoginMode){
        authObs = this.authService.login(email, password);
     } else {
        authObs = this.authService.signUp(email, password);
     }

     authObs.subscribe(
        resData => {
            this.isLoading = false;
            this.router.navigate(['/recipes']);
            console.log(resData);
           },
        errorMsg => {
           this.isLoading = false;
            console.log(errorMsg);
            this.error = errorMsg;
        }
    )
     form.reset();
 }
}
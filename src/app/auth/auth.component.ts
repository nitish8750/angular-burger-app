import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core'
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthService,AuthResponseData } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.Directive';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error = null;
   @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
   alertSubs: Subscription;

    constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver){}

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
            this.createAlert(errorMsg);
        }
    )
     form.reset();
 }

 onHandleError(){
     this.error = null;
 }

 createAlert(error: string){
    const alertCompFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostContainerRef = this.alertHost.viewContainerRef;
    hostContainerRef.clear;

    const componentRef = hostContainerRef.createComponent(alertCompFactory);

    componentRef.instance.message = error;
    this.alertSubs = componentRef.instance.close.subscribe(() =>{
        this.alertSubs.unsubscribe();
        hostContainerRef.clear();
    });
 }

}
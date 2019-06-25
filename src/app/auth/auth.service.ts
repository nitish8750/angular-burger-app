import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
    kind: string,
    idToken: string,
    email:string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    userLoginInterval: any;
    constructor(private http: HttpClient, private router: Router){}

    signUp(email: string, password: string){
        return this.http.post<AuthResponseData>
        ('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser', 
            {
                email,
                password,
                returnSecureToken: true
            }
        ).
        pipe(tap(this.handleAuthentication.bind(this)) , catchError(this.handleError));
    }
    login(email: string, password: string){
        return this.http.post<AuthResponseData>
        ('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword', 
            {
                email,
                password,
                returnSecureToken: true
            }
        ).
        pipe(tap(this.handleAuthentication.bind(this)) , catchError(this.handleError));
    }
    autoLogin(){
        const userData:{
             email: string,
             id: string,
             _token: string,
             _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        
        if(!userData){
            return;
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))
        const remainingTime = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        if(loadedUser.token){
            this.user.next(loadedUser);
            this.autoLogout(remainingTime);
        }
        
    }
    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.userLoginInterval){
            clearInterval(this.userLoginInterval);
        }
    }
    autoLogout(expirationDuration: number){
        this.userLoginInterval = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    } 
    private handleAuthentication(resData: AuthResponseData){
        const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
        const user = new User(resData.email, resData.localId, resData.idToken,expirationDate);

        this.user.next(user);
        this.autoLogout(+resData.expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }
    private handleError(errorRes: HttpErrorResponse){
        let errorMsg = "An error Occurred";
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMsg);
        }
        switch (errorRes.error.error.message) {
            case "EMAIL_EXISTS":
                errorMsg = "The email address is already in use by another account.";
                break;
            case "EMAIL_NOT_FOUND":
                errorMsg = "There is no user record corresponding to this identifier. The user may have been deleted.";
                break;
            case "INVALID_PASSWORD":
                errorMsg = "The password is invalid or the user does not have a password.";
                break;
        }
        return throwError(errorMsg);
    }
}
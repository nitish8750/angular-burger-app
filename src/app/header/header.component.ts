import { Component, OnInit, OnDestroy} from '@angular/core';
import { DataStorageSrvice } from '../shared/dataStorage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    userSub : Subscription;
    constructor(private dataService: DataStorageSrvice, private authService: AuthService){}

    ngOnInit(){
        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user;
        })
    }

    onSaveRcipe(){
        this.dataService.onSaveRcipe();
    }

    onFetchRecipe(){
        this.dataService.onFetchRecipe().subscribe();
    }

    onLogout(){
        this.authService.logout();
    }
    

    ngOnDestroy(){
        this.userSub.unsubscribe();
    }
}
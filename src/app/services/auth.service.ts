import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IUser } from "../models/user.model";
import { IAuthResponse } from "../models/auth-response.model";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root'})
export class AuthService {

    constructor(private router: Router){}

    user = new BehaviorSubject<IUser | null>(null);
    getToken(): any{
        let temp =localStorage.getItem("token"); 
        if(temp){
            return JSON.parse(temp); 
        }
    }

    getUser(): any{
        let temp =localStorage.getItem("user"); 
        if(temp){
            return JSON.parse(temp); 
        }
    }
    

    login(authResponse: IAuthResponse){
        localStorage.setItem('token', JSON.stringify(authResponse.token))
        localStorage.setItem('user', JSON.stringify(authResponse.user));
        this.user.next(authResponse.user);
        this.router.navigate(['/']);
    }

    logout(){
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.user.next(null);
        this.router.navigate(['/login']);
    }

    autoLogin(){
        const userData = this.getUser();
        if(!userData){
            return;
        }
        this.user.next(userData);
    }
}
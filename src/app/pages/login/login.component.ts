import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { AuthResponse } from './auth-response.model';
import { baseUrl } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading: boolean = false;
  isError: boolean = false;
  userName: string = "admin@mail.com";
  password: string = "Admin@123";
  constructor(private http: HttpClient, 
    private authService: AuthService){}

  onSubmit(){
    this.isLoading = true;
    this.http.post<AuthResponse>(`${baseUrl}Auth/SignIn`,
    {
      userName: this.userName,
      password: this.password
    }).subscribe(response=>{
      this.authService.login(response);
      this.isLoading = false;
    },error=>{
      this.isLoading = false;
      this.isError= true;
    })
  }
}

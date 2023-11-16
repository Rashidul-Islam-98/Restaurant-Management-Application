import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(private http: HttpClient, 
    private router: Router,
    private authService: AuthService){}

  onSubmit(form: NgForm){
    const { username, password } = form.value;
    const userName = username;
    this.isLoading = true;
    this.http.post<AuthResponse>(`${baseUrl}Auth/SignIn`,
    {
      userName,
      password
    }).subscribe(response=>{
      this.authService.login(response);
      this.isLoading = false;
    },error=>{
      this.isLoading = false;
      this.isError= true;
    })
  }
}

import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bss-restaurant';

  constructor(private authService: AuthService){
  }

  ngOnInit(){
    this.authService.autoLogin();
  }
}
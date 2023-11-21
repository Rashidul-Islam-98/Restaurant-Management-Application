import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { baseImageUrl } from '../../../environments/environment'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  baseImageUrl = baseImageUrl;
  user: any = null;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  onLogOut(){
    this.authService.logout();
  }
  
}


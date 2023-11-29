import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { baseImageUrl } from '../../../environments/environment'
import { FoodService } from 'src/app/services/food.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  baseImageUrl = baseImageUrl;
  user: any = null;

  constructor(private authService: AuthService,
    private foodService: FoodService,
    private menuService: MenuService){}

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  onLogOut(){
    this.authService.logout();
  }

  onClickMenu(){
    this.menuService.isSidebarOpen.next(false);
  }

  onSidebarClick(event: Event) {
    event.stopPropagation();
  }
  
}


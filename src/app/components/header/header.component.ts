import { Component } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  navbarOpen: boolean = true;
  cartOpen: boolean = false;

  constructor(private foodService: FoodService){}

  onNavbarToggle(){
    this.navbarOpen = !this.navbarOpen;
  }

  onCartToggle(){
    this.cartOpen = !this.cartOpen;
    this.foodService.isCartOpen.next(this.cartOpen);
  }
}

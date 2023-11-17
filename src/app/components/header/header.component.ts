import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  navbarOpen: boolean = true;
  cartOpen: boolean = false;
  totalOrders: number = 0;

  constructor(private foodService: FoodService){}

  ngOnInit(){
    this.totalOrders = this.foodService.orderedFoods.length;
    console.log(this.totalOrders);
  }

  onNavbarToggle(){
    this.navbarOpen = !this.navbarOpen;
  }

  onCartToggle(){
    this.cartOpen = !this.cartOpen;
    this.foodService.isCartOpen.next(this.cartOpen);
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ISaveFood } from 'src/app/models/save-food.model';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  navbarOpen: boolean = false;
  cartOpen: boolean = false;
  totalOrders: number = 0;

  @Output() openSidebar = new EventEmitter<boolean>();

  constructor(private foodService: FoodService){}

  ngOnInit(){
    this.foodService.getOrderedFoodChanges().subscribe((orderedFoods: ISaveFood[]) => {
      this.totalOrders = orderedFoods.length;
    });
  }

  onNavbarToggle(){
    this.openSidebar.emit(!this.navbarOpen);
    this.navbarOpen = !this.navbarOpen;
  }

  onCartToggle(){
    this.foodService.isCartOpen.next(!this.cartOpen);
    this.cartOpen = !this.cartOpen;
  }
}

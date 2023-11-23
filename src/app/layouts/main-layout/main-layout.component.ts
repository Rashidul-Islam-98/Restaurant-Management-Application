import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit{
  isCartOpen: boolean = false;
  isSidebarOpen: boolean = false;
  isConfirmDialogOpen: boolean = false;

  constructor(private foodService: FoodService, private orderService: OrderService){}

  ngOnInit(){
    this.foodService.isCartOpen.subscribe(response => {
      this.isCartOpen = response;
    })
    this.orderService.isOrderConfirmed.subscribe(response => {
      this.isConfirmDialogOpen = response;
    })
  }

  openSidebarMenu(event: any){
    this.isSidebarOpen = event;
  }
}

import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit{
  isCartOpen: boolean = false;
  isSidebarOpen: boolean = false;

  constructor(private foodService: FoodService){}

  ngOnInit(){
    this.foodService.isCartOpen.subscribe(response => {
      this.isCartOpen = response;
    })
  }

  openSidebarMenu(event: any){
    this.isSidebarOpen = event;
  }
}

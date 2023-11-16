import { Component, OnInit } from '@angular/core';
import { ISaveFood } from 'src/app/models/save-food.model';
import { FoodService } from 'src/app/services/food.service';
import { baseImageUrl } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  baseImageUrl = baseImageUrl;
  orderedFoods: ISaveFood[] = [];
  isOrderFoodsExist: boolean = false;;
  constructor(private foodService: FoodService){}

  ngOnInit() { 
    this.orderedFoods = this.foodService.orderedFoods;
    if(this.orderedFoods.length>0){
      this.isOrderFoodsExist = true;
    }
  }

  onCloseCart(){
    this.foodService.isCartOpen.next(false);
  }
}

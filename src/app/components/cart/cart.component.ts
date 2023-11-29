import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ISaveFood } from 'src/app/models/save-food.model';
import { FoodService } from 'src/app/services/food.service';
import { OrderService } from 'src/app/services/order.service';
import { TableService } from 'src/app/services/table.service';
import { baseImageUrl, baseUrl } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  baseImageUrl = baseImageUrl;
  baseUrl = baseUrl;
  table: any;
  orderedFoods: ISaveFood[] = [];
  isOrderFoodsExist: boolean = false;
  isOrderPlaced: boolean = false;
  sendFoodDetails: any = [
    {
      foodId: 0,
      foodPackageId: null,
      quantity: 0,
      unitPrice: 0,
      totalPrice: 0
    }
  ];
  totalPrice: number = 0;
  constructor(private foodService: FoodService, 
    private tableService: TableService,
    private http: HttpClient,
    private orderService: OrderService) { }

  ngOnInit() {
    this.tableService.table.subscribe(data => {
      this.table = data;
    })
    this.orderedFoods = this.foodService.orderedFoods;
    if (this.orderedFoods.length > 0) {
      for (let orderFood of this.orderedFoods) {
        const unitPrice = orderFood.discountPrice !== 0 ? orderFood.discountPrice : orderFood.price;
        this.sendFoodDetails.push(
          {
            foodId: orderFood.id,
            foodPackageId: null,
            quantity: 1,
            unitPrice,
            totalPrice: unitPrice
          }
        )
        this.totalPrice += unitPrice;
      }
      this.isOrderFoodsExist = true;
    }
  }

  onCloseCart() {
    this.foodService.isCartOpen.next(false);
  }

  onModalClick(event: Event) {
    event.stopPropagation();
  }

  onOrderFood(food: any) {
    return food;
  }

  onTotalPriceChanged(event: any) {
    this.totalPrice += event.changedPrice;
    for(let sendFoodDetail of this.sendFoodDetails) {
      if(sendFoodDetail.foodId === event.food.id) {
        sendFoodDetail.quantity += event.quantity;
        sendFoodDetail.totalPrice += (sendFoodDetail.unitPrice*event.quantity);
      }
    }
  }

  onSubmitOrder() {
    this.orderService.isOrderConfirmed.next(true);
    this.foodService.isCartOpen.next(false);
    this.isOrderPlaced = false;
    this.sendFoodDetails = this.sendFoodDetails.filter((item: any )=> item.foodId !== 0);
    this.http.post(`${baseUrl}Order/create`,{
      tableId: this.table.id,
      orderNumber: Date.now(),
      amount: this.totalPrice,
      phoneNumber: null,
      items: this.sendFoodDetails
    }).subscribe(response => {
      this.orderedFoods = [];
      this.foodService.isCartOpen.next(false);
    })
  }
}

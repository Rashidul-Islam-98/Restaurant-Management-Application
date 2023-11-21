import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ISaveFood } from 'src/app/models/save-food.model';
import { FoodService } from 'src/app/services/food.service';
import { baseImageUrl } from 'src/environments/environment';

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.css']
})
export class FoodItemComponent {
  baseImageUrl = baseImageUrl;
  isClicked: boolean = false;
  @Input() food: any;

  constructor(private foodService: FoodService,
    private toastr: ToastrService){}

  onOrderFood(food: ISaveFood){
    this.isClicked = true;
    this.foodService.orderFood(food);
    this.toastr.success("Successfully added food.");
  }
}

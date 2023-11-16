import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { ISaveFood } from "../models/save-food.model";

@Injectable({ providedIn: 'root' })
export class FoodService {
    isCartOpen = new Subject<boolean>();
    orderedFoodChanged = new Subject<ISaveFood[]>();
    orderedFoods: ISaveFood[] = [];

    orderFood(food: ISaveFood){
        this.orderedFoods.push(food);
        this.orderedFoodChanged.next(this.orderedFoods.slice());
    }
}
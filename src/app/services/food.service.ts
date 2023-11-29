import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
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

    deleteAllFoods(){
        this.orderedFoods = [];
        this.orderedFoodChanged.next([]);
    }

    deleteFood(food: ISaveFood){
        this.orderedFoods = this.orderedFoods.filter(item => item.id !== food.id);
        this.orderedFoodChanged.next(this.orderedFoods.slice());
    }

    getOrderedFoodChanges(): Observable<ISaveFood[]> {
        return this.orderedFoodChanged.asObservable();
    }
}
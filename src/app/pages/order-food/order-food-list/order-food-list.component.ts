import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IGetFoods } from 'src/app/models/get-foods.model';
import { TableService } from 'src/app/services/table.service';
import { baseImageUrl, baseUrl } from 'src/environments/environment';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-order-food-list',
  templateUrl: './order-food-list.component.html',
  styleUrls: ['./order-food-list.component.css']
})
export class OrderFoodListComponent implements OnInit{
  baseImageUrl = baseImageUrl;
  isLoading = true;
  isTableSelected = false;
  searchText: string = "";
  tables: any = [];
  foods: any = [];

  constructor(private tableService: TableService, 
    private http: HttpClient,
    private foodService: FoodService){}

  ngOnInit() {
    this.isLoading = true;
    this.loadTableData();
    this.loadFoodData();
  }

  loadTableData() {
    this.tableService.getTables().subscribe(res=>{
      this.tables = res.data;
      this.isLoading = false;
    });
  }

  loadFoodData(){
    let queryParams = new HttpParams().append("Search",this.searchText);
    this.http.get<IGetFoods>(`${baseUrl}Food/datatable`, {params:queryParams}).subscribe(res=>{
      this.foods = res.data;
      this.isLoading = false;
    })
  }

  tableSelected(table: any){
    this.isTableSelected = true;
    this.tableService.table.next(table);
  }

  onSearchFood(searchText: string){
    this.loadFoodData();
  }

  onOrderFood(food: any){
    return food;
  }
}

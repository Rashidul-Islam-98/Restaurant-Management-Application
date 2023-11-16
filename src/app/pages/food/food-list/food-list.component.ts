import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IGetFoods } from 'src/app/models/get-foods.model';
import { ISaveFood } from 'src/app/models/save-food.model';
import { baseImageUrl, baseUrl } from 'src/environments/environment';

@Component({
  selector: 'app-food',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent {
  getFoodResponse: IGetFoods = {
    pageNumber: 0,
    current_page: 0,
    per_page: 0,
    pageSize: 0,
    firstPage: "",
    lastPage: "",
    last_page: 0,
    totalPages: 0,
    totalRecords: 0,
    total: 0,
    from: 0,
    to: 0,
    next_page_url: "",
    prev_page_url: "",
    data: []
  };
  foods: ISaveFood[] = [];
  baseImageUrl = baseImageUrl;
  isLoading: boolean = false;
  Page: number = 1;
  Per_Page: number = 10;

  constructor(private http: HttpClient, private toastr: ToastrService){}

  ngOnInit(){
    this.loadFoodData();
  }

  loadFoodData(){
    this.isLoading = true;
    let queryParams = new HttpParams().append("Page",this.Page).append("Per_page",this.Per_Page);
    this.http.get<IGetFoods>(`${baseUrl}Food/datatable`, {params:queryParams}).subscribe(res=>{
      this.getFoodResponse = res;
      this.foods = res.data;
      this.isLoading = false;
    })
  }

  onDelete(id: any){
    this.isLoading
    this.http.delete(`${baseUrl}Food/delete/${id}`).subscribe(res=>{
      this.toastr.success("Ok!","Employee is deleted.");
      this.loadFoodData();
    });
  }

  onChangePage(page: number){
    this.Page+=page;
    this.loadFoodData();
  }
}

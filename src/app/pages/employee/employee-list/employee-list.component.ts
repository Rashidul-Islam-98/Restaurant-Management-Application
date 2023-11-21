import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { baseImageUrl, baseUrl } from 'src/environments/environment';

@Component({
  selector: 'app-employee',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  getEmployeeResponse: any;
  employees: any[] = [];
  baseImageUrl = baseImageUrl;
  isLoading: boolean = false;
  Page: number = 1;
  Per_Page: number = 10;

  constructor(private http: HttpClient, private toastr: ToastrService){}

  ngOnInit(){
    this.loadEmployeeData();
  }

  loadEmployeeData(){
    this.isLoading = true;
    let queryParams = new HttpParams().append("Page",this.Page).append("Per_page",this.Per_Page);
    this.http.get<any>(`${baseUrl}Employee/datatable`, {params:queryParams}).subscribe(res=>{
      this.getEmployeeResponse = res;
      this.employees = res.data;
      this.isLoading = false;
    })
  }

  onDelete(id: string){
    this.isLoading
    this.http.delete(`${baseUrl}Employee/delete/${id}`).subscribe(res=>{
      this.toastr.success("Ok!","Employee is deleted.");
      this.loadEmployeeData();
    });
  }

  onChangePage(page: number){
    this.Page+=page;
    this.loadEmployeeData();
  }
}

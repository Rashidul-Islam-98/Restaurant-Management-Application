import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { baseImageUrl, baseUrl } from 'src/environments/environment';

@Component({
  selector: 'app-employee',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  employees: any[] = [];
  baseImageUrl = baseImageUrl;
  isLoading: boolean = false;

  constructor(private http: HttpClient, private toastr: ToastrService){}

  ngOnInit(){
    this.isLoading = true;
    this.loadEmployeeData();
  }

  loadEmployeeData(){
    this.http.get<any>(`${baseUrl}Employee/datatable`).subscribe(res=>{
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
}

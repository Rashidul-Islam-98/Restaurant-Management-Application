import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ITable } from 'src/app/models/table.model';
import { TableService } from 'src/app/services/table.service';
import { baseImageUrl, baseUrl } from 'src/environments/environment';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent {
  getTableResponse: any;
  tables: any = [];
  baseImageUrl = baseImageUrl;
  isLoading: boolean = false;
  isOccupied: boolean = false;
  isAddEmployeeMode = false;
  Page: number = 1;
  Per_Page: number = 10;
  show: boolean = true;

  constructor( private tableService: TableService, private toastr: ToastrService,private http: HttpClient){}

  ngOnInit() {
    this.isLoading = true;
    this.loadTableData();
    this.tableService.isAddEmployeeMode.subscribe(res=>{
      this.isAddEmployeeMode = res;
    })
  }

  onDelete(id: number){
    this.tableService.deleteTable(id).subscribe(res=>{
      this.toastr.success("Ok!","Table is deleted.");
     this.loadTableData();
    });
  }

  onAddEmployeeToTable(table: ITable) {
    this.tableService.table.next(table);
    this.tableService.isAddEmployeeMode.next(true);
  }

  loadTableData(){
    this.isLoading = true;
    let queryParams = new HttpParams().append("Page",this.Page).append("Per_page",this.Per_Page);
    this.http.get<any>(`${baseUrl}Table/datatable`, {params:queryParams}).subscribe(res=>{
      this.getTableResponse = res;
      this.tables = res.data;
      this.isLoading = false;
    })
  }

  onDeleteEmployee(id: string){
    this.isLoading = true;
    this.http.delete(`${baseUrl}EmployeeTable/delete/${id}`).subscribe(data => {
      this.loadTableData();
    })
  }

  onChangePage(page: number){
    this.Page+=page;
    this.loadTableData();
  }
}

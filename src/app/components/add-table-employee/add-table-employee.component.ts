import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TableService } from 'src/app/services/table.service';
import { baseImageUrl, baseUrl } from 'src/environments/environment';

interface TableEmployee {
  "employeeId": string, 
  "name": string
}

@Component({
  selector: 'app-add-table-employee',
  templateUrl: './add-table-employee.component.html',
  styleUrls: ['./add-table-employee.component.css']
})
export class AddTableEmployeeComponent implements OnInit{
  baseImageUrl = baseImageUrl;
  isOpen: boolean = true;
  isAddingEmployee: boolean = false;
  table: any;
  tableId: number = 0;
  employees: TableEmployee[] = [];
  addedEmployees: TableEmployee[] = [];
  postEmployees: { "employeeId": string, "tableId": number}[] = [];
  @Output() loadTable: EventEmitter<any> = new EventEmitter();
  constructor(private tableService: TableService, 
    private http: HttpClient,
    private toastr: ToastrService){}

  ngOnInit(){

    this.tableService.table.subscribe(res => {
      this.table = res;
      this.tableId = this.table.id;
    })

    this.http.get<TableEmployee[]>(`${baseUrl}Employee/get`).subscribe(res=>{
      res.forEach(item=>{
        let isExist = false;
        for(let employee of this.table.employees){
          if(item.name === employee.name){
            isExist = true;
            break;
          }
        }
        if(!isExist){
          this.employees.push(item);
        }
      })
    });

    this.tableService.isAddEmployeeMode.subscribe(res=>{
      this.isOpen = res;
    })
  }

  onClose(){
    this.tableService.isAddEmployeeMode.next(false);
  }

  onToggleIsAddingEmployee(){
    this.isAddingEmployee = !this.isAddingEmployee;
  }

  addEmployeeToTable(employee: TableEmployee){
    this.addedEmployees.push(employee);
    this.employees = this.employees.filter(item => item.employeeId !== employee.employeeId);
  }

  removeEmployeeFromTable(employee: TableEmployee) {
    this.employees.push(employee);
    this.addedEmployees = this.addedEmployees.filter(item => item.employeeId !== employee.employeeId);
  }

  onAssign() {
    for(let addEmployee of this.addedEmployees) {
      this.postEmployees.push({ employeeId: addEmployee.employeeId, tableId: this.tableId });
    }
    
    this.http.post(`${baseUrl}EmployeeTable/create-range`,this.postEmployees).subscribe(response=>{
      this.toastr.success("Ok!","Employees Added.");
      this.tableService.isAddEmployeeMode.next(false);
      this.loadTable.emit();
    })


  }

}
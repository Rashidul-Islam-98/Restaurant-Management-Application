import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { baseImageUrl, baseUrl } from 'src/environments/environment';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent{
  baseImageUrl = baseImageUrl;
  baseUrl = baseUrl;
  isUpdateStatus: boolean = false;
  isStatusClicked: boolean = false;
  updateStatus: string = "";
  statusOptions: any = [
    {
      text: "All",
      value: null
    },
    {
      text: "Pending",
      value: 0
    },
    {
      text: "Confirmed",
      value: 1
    },
    {
      text: "Preparing",
      value: 2
    },
    {
      text: "PreparedToServe",
      value: 3
    },
    {
      text: "Served",
      value: 4
    },
    {
      text: "Paid",
      value: 5
    }
  ];

  @Input() order: any; 
  @Output() changeOrder: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient, private toastr: ToastrService){}

  onUpdateStatusMode (){
    this.isUpdateStatus = !this.isUpdateStatus;
  }
  
  onUpdateStatus(status: string, value: number){
    this.updateStatus = status;
    this.isStatusClicked = !this.isStatusClicked;
    this.http.put(`${baseUrl}Order/update-status/${this.order.id}`,{
      "status": value
    }).subscribe(() => {
      this.changeOrder.emit();
    });
    this.isUpdateStatus = false;
  }

  onStatusClicked(){
    this.isStatusClicked = !this.isStatusClicked;
  }

  onDeleteCard(id: string){
    this.http.delete(`${baseUrl}Order/delete/${id}`).subscribe(res => {
      this.toastr.success("Ok","Order deleted successfully.");
      this.changeOrder.emit();
    })
  }
}

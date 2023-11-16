import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { baseUrl } from 'src/environments/environment';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrls: ['./add-table.component.css']
})
export class AddTableComponent {
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService){}

  url: string = "https://i.ibb.co/bzK7Ww7/profile.jpg";

  onSelected(e: any){
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event: any)=>{
        this.url = event.target.result;
      }
    }
  }

  onChangeImage(){
    document.getElementById("image")?.click();
  }

  onSubmit(form: NgForm){
    const result = form.value;
    const base64 = this.url;

    this.http.post(`${baseUrl}Table/create`,{
      ...result,base64
    }).subscribe(res=>{
      this.toastr.success("Ok!","Suucessfully created a table.");
      form.reset();
    })
  }
}

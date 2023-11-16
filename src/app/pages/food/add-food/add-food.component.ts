import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ISaveFood } from 'src/app/models/save-food.model';
import { baseUrl } from 'src/environments/environment';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent {
  formData: ISaveFood = {
    name: '',
    description: '',
    price: 0,
    discountType: 0,
    discount: 0,
    discountPrice: 0,
    image: '',
    base64: ''
  }

  discountValue: number = 0;
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService){}

  url: string = "https://i.ibb.co/bzK7Ww7/profile.jpg";

  onSelected(e: any){
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event: any)=>{
        this.url = event.target.result;
        this.formData.base64 = this.url;
      }
    }
  }

  onChangeImage(){
    document.getElementById("image")?.click();
  }

  onChangeDiscountPrice(){
    const discountValue: number = (Number(this.formData.discountType) === 1) ? this.formData.discount : (this.formData.price*this.formData.discount)/100;
    console.log(discountValue);
    this.formData.discountPrice = Number(this.formData.price) - Number(discountValue);
  }

  onSubmit(){
    const { name, description, price, discountType, discount, discountPrice, image ,base64 } = this.formData;
    this.http.post(`${baseUrl}Food/create`,{ name, description, price, discountType, discount, discountPrice, image ,base64 }).subscribe(res=>{
      this.toastr.success("Congratulations!", "Food Creation is successful.");
      this.router.navigate(['/foods']);
    });
  }
}

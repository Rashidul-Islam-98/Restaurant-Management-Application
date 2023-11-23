import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { baseUrl } from 'src/environments/environment';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  url: string = "https://i.ibb.co/bzK7Ww7/profile.jpg";

  onSelected(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
    }
  }

  onChangeImage() {
    document.getElementById("image")?.click();
  }

  isNumber(evt: any) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }

  isPhoneNumber(event: any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode !== 43 && (charCode > 31 && (charCode < 48 || charCode > 57))) {
      return false;
    }
    return true;
  }

  onSubmit(form: NgForm) {
    const { firstName, middleName, lastName, image, email, phoneNumber, joinDate
      , fatherName, motherName, spouseName,
      dob, designation, gender, nid } = form.value;
    var genderId = 1;
    const base64 = this.url;
    if (gender === "Female") {
      genderId = 2;
    } else if (gender === "Others") {
      genderId = 3;
    }

    this.http.post(`${baseUrl}Employee/create`, {
      firstName, middleName, lastName, image, email, phoneNumber, joinDate
      , fatherName, motherName, spouseName,
      dob, designation, genderId, nid, base64
    }).subscribe(res => {
      this.toastr.success("Congratulations!", "Employee registration successful.");
      form.reset();
    });
  }
}

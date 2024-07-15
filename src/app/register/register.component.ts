import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterDTO } from '../dtos/users/register.dto';

import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  @ViewChild('registerForm') registerForm!: NgForm;
  //Khai bao gia tri ban dau
  phoneNumber: string
  password: string
  retypePassword: string
  fullname: string;
  address: string;
  isAccepted: boolean;
  dateOfBirth: Date;
  constructor(private router: Router, private userService: UserService) {
    this.phoneNumber = '';
    this.password = '';
    this.retypePassword = '';
    this.fullname = '';
    this.address = '';
    this.isAccepted = true;
    this.dateOfBirth = new Date();
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18)
  }

  onPhoneNumberChange() {
    console.log(`phone type: ${this.phoneNumber}`)
  }

  register() {
    const message = `Phone : ${this.phoneNumber}`
      + `Password: ${this.password}`
      + `Retype Password: ${this.retypePassword}`
      + `full Name: ${this.fullname}`
      + `address : ${this.address}`
      + `is Accepted: ${this.isAccepted}`
      + `date of birth ${this.dateOfBirth}`
    // alert(message)
    debugger

    const registerDTO: RegisterDTO = {
      "fullname": this.fullname,
      "phone_number": this.phoneNumber,
      "address": this.address,
      "password": this.password,
      "retype_password": this.retypePassword,
      "date_of_birth": this.dateOfBirth,
      "facebook_account_id": 0,
      "google_account_id": 0,
      "role_id": 1
    }

    this.userService.register(registerDTO).subscribe({
      next: (response: any) => {
        debugger
        // this.router.navigate(['/login']);
      },
      complete: () => {
        debugger
      },
      error: (error: any) => {
        alert(`Cannot register, error: ${error.error}`)
      }
    })
  }

  //Kiểm tra 2 mk có khớp nhau không
  checkPasswordMatch() {
    if (this.password !== this.retypePassword) {
      this.registerForm.form.controls['retypePassword'].setErrors({ 'passwordMismatch': true })
    } else {
      this.registerForm.form.controls['retypePassword'].setErrors(null)
    }
  }

  checkAge() {
    if (this.dateOfBirth) {
      const today = new Date()
      const birthDate = new Date(this.dateOfBirth)
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff == 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age < 18) {
        this.registerForm.form.controls['dateOfBirth'].setErrors({ 'invalidAge': true })
      } else {
        this.registerForm.form.controls['dateOfBirth'].setErrors(null);
      }
    }
  }
}

import { Component, ViewChild } from '@angular/core';
import { LoginDTO } from '../dtos/users/login.dto';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  phoneNumber: string = '11223344';
  password: string = '123456';

  constructor(private router: Router, private userService: UserService) { }
  onPhoneNumberChange() {
    console.log(`phone type: ${this.phoneNumber}`)
  }

  login() {
    const message = `Phone : ${this.phoneNumber}` +
      `Password: ${this.password}`;
    debugger

    const loginDTO: LoginDTO = {
      "phone_number": this.phoneNumber,
      "password": this.password
    }

    this.userService.login(loginDTO).subscribe({
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
}

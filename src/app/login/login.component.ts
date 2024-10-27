import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  model: any = {};

  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {}
  userName = '';
  userPass = '';

  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  country = '';

  displayResponsive = false;

  showResponsiveDialog = () => {
    this.displayResponsive = true;
  };

  submitLogin = (userLoginForm: NgForm) => {
    let userInfo = userLoginForm.value;
    console.log(userInfo);

    this.userService.loginUser(userInfo).then((response) => {
      console.log(response);
      console.log(response.data); // response data returns true if valid false if not valid
      if (response.data) {
        console.log('trueeee user is valid  !');
        this.router.navigate(['/home']);
      } else {
        console.log('false !! unvalid user !!');
        this.displayResponsive = true;
      }
    });
  };

  submitSignUp = (form: NgForm) => {
    let data = form.value;
    console.log(data);
    this.displayResponsive = false;
    this.userService.signUpUser(data);
    form.reset();
  };

  checkIfExist = (userInfo: NgForm) => {
    console.log(userInfo.value);
  };
}

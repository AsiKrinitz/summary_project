import { Injectable, OnInit } from '@angular/core';
import axios from 'axios';
import { User } from 'src/model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit {
  ngOnInit(): void {}

  constructor() {}

  signUpUser = (user: User): Promise<any> => {
    return axios.post('http://localhost:54481/api/Login/SignUp', user);
  };

  // login user
  loginUser = (userNameAndPass: any): Promise<any> => {
    return axios.put('http://localhost:54481/api/Login/Login', userNameAndPass);
  };
}

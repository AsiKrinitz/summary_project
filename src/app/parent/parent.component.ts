import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})
export class ParentComponent {
  constructor(private router: Router) {}

  message: string = '';

  reciveData = (data: number) => {
    console.log(data);
    console.log(typeof data);
  };
}

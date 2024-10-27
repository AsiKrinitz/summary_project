import { Component, OnInit } from '@angular/core';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  selectedName = '';

  ngOnInit(): void {}

  visible = false;

  position: string = '';

  selectedFood = '';

  cities = ['Haifa', 'Jerusalem', 'TLV'];

  selectedCity1 = '';

  NAMES = [
    'Maia',
    'Asher',
    'Olivia',
    'Atticus',
    'Amelia',
    'Jack',
    'Charlotte',
    'Theodore',
    'Isla',
    'Mia',
    'Thomas',
    'Elizabeth',
  ];

  showDialog(position: string) {
    this.position = position;
    this.visible = true;
  }

  onChangeName = ($event: any) => {
    console.log('the name you choose is >> ' + this.selectedName);
  };
}

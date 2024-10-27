import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-donnetion',
  templateUrl: './donnetion.component.html',
  styleUrls: ['./donnetion.component.css'],
})
export class DonnetionComponent {
  countries = [
    'Israel',
    'United States',
    'Canada',
    'Mexico',
    'Brazil',
    'Argentina',
    'United Kingdom',
    'France',
    'Germany',
    'Italy',
    'Spain',
    'China',
    'Japan',
    'South Korea',
    'Australia',
    'New Zealand',
    'Russia',
    'India',
    'South Africa',
    'Nigeria',
    'Egypt',
  ];

  selectedCountry = '';
  userName = '';
  amount = 0;
  gender = '';
  checked = false;

  submitForm = (form: NgForm) => {
    console.log(form.value);
  };
}

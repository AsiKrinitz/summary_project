import { Component, OnInit } from '@angular/core';

export interface Country {
  name: string;
  code: string;
  belongToEuropeUnion?: boolean;
}

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
})
export class CountriesComponent implements OnInit {
  countries: Country[] = [
    { name: 'European Union', code: 'EU', belongToEuropeUnion: false },
    { name: 'Israel', code: 'ISR', belongToEuropeUnion: false },
    { name: 'Spain', code: 'ES', belongToEuropeUnion: true },
    { name: 'Italy', code: 'IT', belongToEuropeUnion: true },
    { name: 'United States', code: 'US', belongToEuropeUnion: false },
    { name: 'Canada', code: 'CA', belongToEuropeUnion: false },
    { name: 'Australia', code: 'AU', belongToEuropeUnion: false },
    { name: 'United Kingdom', code: 'UK', belongToEuropeUnion: true },
    { name: 'France', code: 'FR', belongToEuropeUnion: true },
    { name: 'Germany', code: 'DE', belongToEuropeUnion: true },
    { name: 'Japan', code: 'JP', belongToEuropeUnion: false },
    { name: 'South Korea', code: 'KR', belongToEuropeUnion: false },
    { name: 'China', code: 'CN', belongToEuropeUnion: false },
    { name: 'India', code: 'IN', belongToEuropeUnion: false },
  ];

  selectedCountry: Country = { name: '', code: '', belongToEuropeUnion: false };
  selectedCountryName = '';
  newCountry = '';

  selectedCountries: Array<Country> = [];
  euCountries: Array<Country> = [];

  euCountry = false;

  ngOnInit(): void {}

  showSelectedCountries = () => {
    console.log(this.selectedCountries);
  };

  onlyEuCountries = () => {
    this.euCountries = this.countries.filter(
      (country) => country.belongToEuropeUnion
    );
    console.log(this.euCountries);
  };

  onCountrySelection = () => {
    console.log('hello !! ');
  };
  onChange(event: any) {
    console.log(event.value[event.value.length - 1]);
    this.selectedCountry = event.value[event.value.length - 1];
    console.log('you choose : ' + this.selectedCountry.name);
  }
}

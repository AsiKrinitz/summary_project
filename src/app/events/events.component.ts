import { Component } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent {
  selectedOption = '';

  userInput = '';

  handleOptionChange = () => {
    console.log('you choose ' + this.selectedOption);
  };

  handleInput = () => {
    console.log(this.userInput);
  };
}

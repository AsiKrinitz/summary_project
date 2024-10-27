import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-on-change',
  templateUrl: './on-change.component.html',
  styleUrls: ['./on-change.component.css'],
})
export class OnChangeComponent implements OnInit {
  input = '';
  name = '';
  selectedValue = '';
  userInput = '';

  checked = false;
  isAbove18 = false;

  color = '';

  options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  colorOptions = ['Red', 'Blue', 'Green'];
  selectedColor = '';

  values = '';
  values2: any;

  name2 = '';

  ngOnInit(): void {}

  onKeyPress = (event: any) => {
    console.log(event);
    this.input = event.key;
    console.log(this.input);
  };

  onChange = (event: any) => {
    let key = event.target.value;
    console.log(key);
    console.log(event);
  };

  onChange2(event: any) {
    this.name = event.target.value;
    console.log(this.name);
  }

  onChange3(newValue: any) {
    console.log(newValue.target.value);
    console.log(newValue);
  }

  onChangeAge = (event: any) => {
    console.log(event);
  };

  onChangeColor = () => {
    console.log(this.selectedColor);
    // alert('you choose ' + this.selectedColor);
  };

  onInput = (event: any) => {
    console.log(event);
    // console.log(event.data);
    console.log(
      'this method will be triggered every time a input is entered.. you can accsess the input value with event.data you enterd >> ' +
        event.data + this.input
    );
  };

  doSomething = () => {
    console.log('do something i guess');
  };

  check1 = () => {
    console.log('hello world');
  };

  check2 = () => {
    console.log('yoyoo im check 222 !!! ');
  };

  check3 = () => {
    console.log('ma kore?');
  };

  onKey(event: any) {
    // without type cast
    console.log(event);
    let a = event.key;
    console.log(a);
    this.values = event.target.value;
  }

  onClick(event: MouseEvent) {
    // with type info
    console.log(event);
    this.values2 = (event.target as HTMLInputElement).value;
  }

  dontComeHere = (event: Event) => {
    console.log(event);
  };

  onBlur() {
    console.log('Input blurred!');
    // Your code here
  }

  onFocus() {
    console.log('Input focused!');
    // Your code here
  }

  catchName = (event: Event) => {
    this.name2 = (event.target as HTMLInputElement).value;
  };

  onCheckBoxChange(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    console.log(`Checkbox state changed to ${checked}`);
    // Your code here
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent implements OnInit {
  name: string = 'Asi123';

  @Input() messageFromOutside: string = '';

  @Output() test123 = new EventEmitter<number>();

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {}

  someFunc = () => {
    this.test123.emit(666);
  };


}

import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-success-payment',
  templateUrl: './success-payment.component.html',
  styleUrls: ['./success-payment.component.css']
})
export class SuccessPaymentComponent implements OnInit {
  ngOnInit(): void {
    axios.get("")
  }

  tranzilaResponse : any = []



}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';

export interface Product {
  Id: number;
  ProductName: string;
  ProductPrice: number;
}

@Component({
  selector: 'app-payment-cart',
  templateUrl: './payment-cart.component.html',
  styleUrls: ['./payment-cart.component.css'],
})
export class PaymentCartComponent implements OnInit {
  productsList: Product[] = [];

  userSum = 20;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getAllProdcuts();
  }

  onSubmitForm = (form: NgForm) => {
    let product: Product;
    product = form.value;
    console.log(product);
    this.addProduct(product);
    form.reset();
  };

  addProduct = (product: Product) => {
    axios
      .post('http://localhost:54481/api/Product/AddProduct', product)
      .then((response) => {
        console.log(response.data);
        this.getAllProdcuts();
        // this.productsList.push(product);
      });
  };

  getAllProdcuts = () => {
    axios
      .get('http://localhost:54481/api/Product/GetAllProducts')
      .then((response) => {
        console.log(response);
        this.productsList = response.data;
        console.log(this.productsList);
      });
  };

  payProduct = (price: number, productName : string) => {
    const params = {
      param1: price,
      param2 : productName
    };

    this.router.navigate(['/hostedFieldsPayment'], { state: params });

    // console.log(price);
    // axios
    //   .post(
    //     // 'https://direct.tranzila.com/naamat100/iframenew.php?sum=' +
    //     //   price +
    //     //   '&currency=1&cred_type=1&notify_url_address=https://localhost:4200/notifiyPayment'

    //    'https://direct.tranzila.com/naamat100/iframenew.php?sum=' + price + `&response_return_format=qstr&success_url_address=https://localhost:4200/successPayment& fail_url_address=https://localhost:4200/failedPayment&notify_url_address=https://localhost:4200/notifiyPayment&u71=1&currency=1&cred_type=1`

    //   )
    //   .then((response) => {
    //     console.log(response);
    //   });
  };

  buyProduct = (price: number) => {
    console.log(price);
    const url = `https://direct.tranzila.com/naamat100/iframenew.php?sum=${price}&currency=1&cred_type=1`;
    window.open(url, '_blank');
  };
}

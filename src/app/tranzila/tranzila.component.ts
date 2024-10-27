import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-tranzila',
  templateUrl: './tranzila.component.html',
  styleUrls: ['./tranzila.component.css'],
})
export class TranzilaComponent {
  userSum = 0;
  // currency = 1;
  // cred_type = 1;

  tryToPay = (sum: number) => {
    console.log(sum);

    axios
      .post(
        'https://direct.tranzila.com/naamat100/iframenew.php?sum=' +
          this.userSum +
          '&currency=1&cred_type=1'
      )
      .then((response) => {
        console.log(response);
      });
  };
}

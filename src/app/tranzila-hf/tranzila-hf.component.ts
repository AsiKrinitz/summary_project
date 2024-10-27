import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CreditCardValidators } from 'angular-cc-library';

import { environment } from '../../environments/environment';

import { TransactionData } from '../../model/TransactionData';

declare const TzlaHostedFields: any;

@Component({
  selector: 'app-tranzila-hf',
  templateUrl: './tranzila-hf.component.html',
  styleUrls: ['./tranzila-hf.component.css'],
})
export class TranzilaHFComponent implements OnInit {
  paymentForm!: FormGroup;
  fields: any;

  // @Input() amount: string = environment.testAmount;
  amount = 0;
  currencyCode: any = environment.currencyCode;

  creditCardNumber: string;
  expiry: string;
  cvv: string;
  imageSrc: string;

  cardNumValid: boolean = true;
  cvvValid: boolean = true;
  cardHolderValid: boolean = true;
  expiryValid: boolean = true;

  successHiden: boolean = true;
  failedHiden: boolean = true;
  errorMessage!: string;
  auth_number!: string;

  tranzilaRes!: TransactionData;

  priceForProduct: any;

  nameOfProduct = '';

  tranzilaResponse!: any;

  constructor(private _fb: FormBuilder, private elementRef: ElementRef) {
    this.creditCardNumber = '';
    this.expiry = '';
    this.cvv = '';
    this.imageSrc = 'assets/icons/cardExample.png';
  }

  ngOnInit() {
    let params = history.state;

    this.priceForProduct = params.param1;

    this.nameOfProduct = params.param2;

    console.log(this.nameOfProduct);

    console.log(this.priceForProduct);

    this.amount = this.priceForProduct;

    this.paymentForm = this._fb.group({
      amount: ['', []],
      creditCardNumber: ['', [CreditCardValidators.validateCCNumber]],
      expiry: ['', [CreditCardValidators.validateExpDate]],
      cvv: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(4)],
      ],
      creditCardHolderId: ['', [Validators.required]],
    });
  }

  ngAfterViewInit() {
    let holderIdPlaceholder = '';
    let cardNumPlaceholder = '';
    let cvvPlaceholder = '';
    let expiryPlaceholder = '';

    this.fields = TzlaHostedFields.create({
      sandbox: false,
      styles: {},
      fields: {
        credit_card_number: {
          selector: '#credit_card_num',
          placeholder: cardNumPlaceholder,
          tabindex: 1,
        },
        cvv: {
          selector: '#cvv',
          placeholder: cvvPlaceholder,
          tabindex: 4,
        },
        card_holder_id_number: {
          selector: '#card_holder_id_number',
          placeholder: holderIdPlaceholder,
          tabindex: 2,
        },
        expiry: {
          selector: '#expiry',
          placeholder: expiryPlaceholder,
          version: '1',
          tabindex: 3,
        },
      },
    });
    this.fields.onEvent('cardTypeChange', this.onCardNumberChanged);
    this.fields.onEvent('validityChange', this.onValidityChange);

    // this.paymentForm.controls.amount.setValue(this.amount);
    this.paymentForm.controls['amount'].setValue(this.amount);
  }

  onValidityChange = (result: any) => {
    console.log(result);

    if (result.field == 'expiry') {
      this.expiryValid = true;
    } else if (result.field == 'credit_card_number') {
      this.cardNumValid = true;
    } else if (result.field == 'card_holder_id_number') {
      this.cardHolderValid = true;
    } else if (result.field == 'cvv') {
      this.cvvValid = true;
    }
  };
  onCardNumberChanged = (result: any) => {
    console.log(result);
    //alert('onCardNumberChanged');
    //alert('onCardNumberChanged');
    if (result.cardType !== 'unknown') {
      this.imageSrc = '';
      this.imageSrc = 'assets/icons/' + result.cardType + '.png';
    } else {
      this.imageSrc = 'assets/icons/cardExample.png';
    }
  };

  onSubmit() {
    this.fields.charge(
      {
        expiry_month: this.paymentForm.controls['expiry'].value.substring(0, 2),
        expiry_year: this.paymentForm.controls['expiry'].value.substring(3, 7),
        terminal_name: environment.terminalName,
        amount: this.amount,
        currency_code: environment.currencyCode,
        response_language: environment.responseLanguage,
      },

      (error: { error: string; messages: any[] }, result: any) => {
        debugger;
        console.log(result);

        this.tranzilaResponse = result;

        console.log(JSON.stringify(this.tranzilaResponse));

        this.tranzilaRes = result;

        console.log(
          JSON.stringify(this.tranzilaRes) +
            'this is my object contaion the response '
        );

        if (error || result.transaction_response.success == false) {
          if (error.error == 'invalid_resource') {
            if (error.messages.length != 0) {
              error.messages.forEach((message) => {
                if (message.param == 'credit_card_number') {
                  this.cardNumValid = false;
                } else if (message.param == 'cvv') {
                  this.cvvValid = false;
                } else if (message.param == 'card_holder_id_number') {
                  this.cardHolderValid = false;
                } else if (message.param == 'expiry') {
                  this.expiryValid = false;
                }
              });
            }
            return;
          } else {
            this.errorMessage = result.transaction_response.error;
            this.failedHiden = false;
          }
        } else {
          this.auth_number = result.transaction_response.auth_number;
          this.successHiden = false;
        }
      }
    );
  }
}

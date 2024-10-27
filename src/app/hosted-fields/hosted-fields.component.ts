import { Component, ElementRef, Input } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { environment } from 'src/environments/environment.development';

declare const TzlaHostedFields: any;

export declare class CreditCardValidators {
  static validateCCNumber(control: AbstractControl): ValidationErrors | null;
  static validateExpDate(control: AbstractControl): ValidationErrors | null;
}

@Component({
  selector: 'app-hosted-fields',
  templateUrl: './hosted-fields.component.html',
  styleUrls: ['./hosted-fields.component.css'],
})
export class HostedFieldsComponent {
  paymentForm!: FormGroup;
  fields: any;

  @Input() amount: string = environment.testAmount;
  currencyCode: any = environment.currencyCode;

  creditCardNumber = '';
  expiry = '';
  cvv = '';
  imageSrc = '';

  cardNumValid: boolean = true;
  cvvValid: boolean = true;
  cardHolderValid: boolean = true;
  expiryValid: boolean = true;

  successHiden: boolean = true;
  failedHiden: boolean = true;
  errorMessage: string = '';
  auth_number: string = '';

  constructor(private _fb: FormBuilder, private elementRef: ElementRef) {
    this.creditCardNumber = '';
    this.expiry = '';
    this.cvv = '';
    this.imageSrc = 'assets/icons/cardExample.png';
  }

  ngOnInit() {
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

  onCardNumberChanged = (result: any) => {
    console.log(result);
    //alert('onCardNumberChanged');
    if (result.cardType !== 'unknown') {
      this.imageSrc = '';
      this.imageSrc = 'assets/icons/' + result.cardType + '.png';
    } else {
      this.imageSrc = 'assets/icons/cardExample.png';
    }
  };

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

    this.paymentForm.controls['amount'].setValue(this.amount);
  }

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

      (
        error: { error: string; messages: { param: string }[] },
        result: {
          transaction_response: {
            success: boolean;
            error: string;
            auth_number: string;
          };
        }
      ) => {
        console.log(result);
        if (error || result.transaction_response.success == false) {
          if (error.error == 'invalid_resource') {
            if (error.messages.length != 0) {
              error.messages.forEach((message: { param: string }) => {
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

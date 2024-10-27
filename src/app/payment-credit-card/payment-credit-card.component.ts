import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
  Inject,
  Input,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/components/common/api';
import { exit } from 'process';
import { Activity } from '../model/activity';
import { CartForm } from '../model/cartForm';
import { CreditCardData } from '../model/credit-card-data';
import { CreditCardPaymentResult } from '../model/creditCardPaymentResult';
import { PaymentFullInfo } from '../model/paymentFullInfo';
import { ActivityService } from '../service/activity.service';
import { UserService } from '../shared/user.service';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
//import { CreditCardValidators } from 'angular-cc-library';

declare const TzlaHostedFields: any;

@Component({
  selector: 'app-payment-credit-card',
  templateUrl: './payment-credit-card.component.html',
  styleUrls: ['./payment-credit-card.component.css'],
})
export class PaymentCreditCardComponent implements OnInit {
  @ViewChild('paytForm') f: HTMLFormElement;

  userClaims: any;
  msgs: Message[] = [];

  dataActivities: any[] = null;
  dataCartForm: CartForm = null;

  cardCardNumber: string;
  cardCardCvv: string;
  cardCardExpiration: Date;
  cardCardOwnerIdentityNumber: string;
  paymentsNumber: string;

  showPaginator: boolean = false;
  rowsInPage: number = 20;
  yearsRange: string;

  inProcess: boolean = false;
  creditCardPaymentResult: CreditCardPaymentResult;

  paymentsNumberOptions: any[] = [];

  paymentForm: FormGroup;
  fields: any;

  @Input() amount: string = '0'; //environment.testAmount;
  currencyCode: any = 'ILS'; // environment.currencyCode;
  @Input() Installments: number = 1;
  MaxInstallments: number;

  creditCardNumber: string;
  expiry: string;
  cvv: string;
  imageSrc: string;

  cardNumValid: boolean = true;
  cvvValid: boolean = true;
  cardHolderValid: boolean = true;
  expiryValid: boolean = true;
  InstallmentsValid: boolean = true;

  successHiden: boolean = true;
  failedHiden: boolean = true;
  errorMessage: string;
  Submited: boolean = false;

  amountDisabled: boolean = true;
  isTruma: boolean = false;

  constructor(
    private router: Router,
    private activityService: ActivityService,
    private elementRef: ElementRef,
    private _fb: FormBuilder
  ) {
    this.creditCardNumber = '';
    this.expiry = '';
    this.cvv = '';
    this.imageSrc = 'assets/icons/cardExample.png';
  }

  ngOnInit() {
    this.paymentsNumberOptions = [];
    for (let i = 1; i <= 12; i++) {
      this.paymentsNumberOptions.push({
        label: i.toString(),
        value: i.toString(),
      });
    }
    this.paymentsNumber = '1';

    let d = new Date();
    this.yearsRange =
      d.getFullYear().toString() + ':' + (d.getFullYear() + 10).toString();
    this.restoreCart();
    this.getCart();
    this.recalcAllPayments();

    this.isTruma = this.dataActivities[0].ActivityTypeId == 11 ? true : false;
    this.amountDisabled = this.isTruma ? false : true;

    if (this.dataActivities.length > 1) {
      this.MaxInstallments = this.dataActivities.reduce(function (
        prev,
        current
      ) {
        return prev.ActivityMaxInstallments > current.ActivityMaxInstallments
          ? prev.ActivityMaxInstallments
          : current.ActivityMaxInstallments;
      });
    } else {
      this.MaxInstallments = this.dataActivities[0].ActivityMaxInstallments;
    }

    this.cardCardOwnerIdentityNumber = this.dataCartForm.IdentityNumber;

    this.paymentForm = this._fb.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      Installments: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(this.MaxInstallments),
        ],
      ],
      creditCardNumber: ['', [Validators.required]], //creditCardNumber: ['', [CreditCardValidators.validateCCNumber]],
      expiry: ['', [Validators.required]], //      expiry: ['', [CreditCardValidators.validateExpDate]],
      cvv: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(4)],
      ],
      creditCardHolderId: ['', [Validators.required]],
    });

    this.amount = this.getTotal().toString();
  }

  ngAfterViewInit() {
    let holderIdPlaceholder = '';
    let cardNumPlaceholder = '';
    let cvvPlaceholder = '';
    let expiryPlaceholder = '';
    //this.translate.get('placeholder_card_holder_id').subscribe(
    //  res => {
    holderIdPlaceholder = 'id'; //res;
    //this.translate.get('placeholder_card_number').subscribe(
    //  res1 => {
    cardNumPlaceholder = 'credit card'; //res1;
    //this.translate.get('placeholder_expiry').subscribe(
    //  res2 => {
    expiryPlaceholder = 'MM/YY'; //'MM/YYYY'; //res2;
    //this.translate.get('placeholder_cvv').subscribe(
    //  res3 => {
    cvvPlaceholder = 'CVV'; //res3;
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
    this.fields.onEvent('blur', this.validityChange);
    //});

    //});
    //});

    //});
    this.paymentForm.controls.amount.setValue(this.amount);
    this.paymentForm.controls.Installments.setValue(this.Installments);
  }
  getCart() {
    this.dataActivities = null;
    this.dataActivities = this.itemsInCart();
  }

  restoreCart() {
    let currentCartForm = sessionStorage.getItem('cartForm');
    let cartF: CartForm;
    if (!currentCartForm || currentCartForm === '') {
      this.showMessage(
        'error',
        '',
        'תקלה באתחול סל פעילויות. נא לחזור לסל  מחדש'
      );
      return;
    }

    cartF = JSON.parse(currentCartForm);
    if (cartF.BirthDate) {
      cartF.BirthDate = this.fixTime(cartF.BirthDate);
    }
    this.dataCartForm = cartF;
  }

  recalcAllPayments() {
    for (let i = 0; i < this.dataActivities.length; i++) {
      this.recalcPayment(this.dataActivities[i]);
    }
  }

  recalcPayment(activity: Activity) {
    // activity.IsHistadrutMember = this.dataCartForm.IsHistadrutMember;
    activity.IdentityNumberForCheckHistradrutMemebr =
      this.dataCartForm.IdentityNumber;
    activity.GenderForCheckHistradrutMemebr = this.dataCartForm.GenderId;
    this.activityService.recalcPayment(activity).subscribe(
      (result: Activity) => {
        let recalculatedActivity = result;
        activity.DicountAmount = recalculatedActivity.DicountAmount;
        activity.DicountTypeId = recalculatedActivity.DicountTypeId;
        activity.DicountType = recalculatedActivity.DicountType;
        activity.AmountToPayTotal =
          recalculatedActivity.AmountToPayTotal +
          this.addNumOfOrderdItems(
            recalculatedActivity.DicountTypeId == 2
              ? recalculatedActivity.AmountToPayTotal
              : activity.PricePerParticipant
          );
        activity.CouponNum = recalculatedActivity.CouponNum;
        activity.CouponDiscount = recalculatedActivity.CouponDiscount;
      },
      (err: HttpErrorResponse) => {
        this.showMessage('error', '', 'תקלה בחישוב גובה תשלום לפעילות ');
      }
    );
  }

  addNumOfOrderdItems(PricePerParticipant: any) {
    if (this.dataActivities[0].NumOfOrderdItems > 1 && PricePerParticipant) {
      let toPay: number;
      toPay =
        (this.dataActivities[0].NumOfOrderdItems - 1) * PricePerParticipant;
      return toPay;
    }
    return 0;
  }

  itemsInCart(): Activity[] {
    let nowIncart = localStorage.getItem('cart');
    let cart: Activity[] = [];
    if (!nowIncart || nowIncart === '') {
      cart = [];
    } else {
      cart = JSON.parse(nowIncart);
    }
    return cart;
  }

  getTotal() {
    let total = 0;
    for (let i = 0; i < this.dataActivities.length; i++) {
      total += this.dataActivities[i].AmountToPayTotal;
    }

    total = Math.round(total * 100) / 100;
    return total;
  }

  //payNow(isFormInvalid) {
  payNow(response) {
    //if (!isFormInvalid) {
    if (response) {
      this.inProcess = true;
      this.creditCardPaymentResult = null;

      let creditCard = new CreditCardData();
      creditCard.CardNumber =
        response.transaction_response.credit_card_last_4_digits; //this.cardCardNumber;
      creditCard.CardCvv = '123'; //this.cardCardCvv;
      creditCard.CardOwnerIdentityNumber =
        response.transaction_response.user_form_data.card_holder_id_number; //this.cardCardOwnerIdentityNumber;
      //let m = (this.cardCardExpiration.getMonth()+1).toString().padStart(2, '0');
      //let y = this.cardCardExpiration.getFullYear().toString();
      //y=y.substr(y.length-2);
      creditCard.CardExpiration =
        response.transaction_response.expiry_month +
        response.transaction_response.expiry_year; //m + y;
      creditCard.PaymentsNumber = parseInt(this.paymentsNumber);

      let paymentFullInfo = new PaymentFullInfo();
      paymentFullInfo.activities = this.dataActivities;
      paymentFullInfo.cartForm = this.dataCartForm;
      paymentFullInfo.creditCardData = creditCard;
      paymentFullInfo.totalAmount = this.isTruma
        ? parseInt(response.transaction_response.user_form_data.payment_amount)
        : this.getTotal();
      paymentFullInfo.ExecuteCreaditCardCharge = true;
      paymentFullInfo.ConfirmationCode =
        response.transaction_response.auth_number;
      paymentFullInfo.TransactionId =
        response.transaction_response.transaction_id;
      paymentFullInfo.CurrencyCode =
        response.transaction_response.currency_code;
      paymentFullInfo.PaymentPlan = response.transaction_response.payment_plan;
      paymentFullInfo.Token = response.transaction_response.token;

      this.activityService.register(paymentFullInfo).subscribe(
        (result: CreditCardPaymentResult) => {
          let res = result;
          if (res.isSucceed) {
            //TODO:  ייתכן ולא כל הפעילויות תקינות
            // במקרה כזה יש להסיר את אלה שכן הצליחו ולהשאיר אלה שלא
            let res = result;
            if (res.NotPayedActivities.length > 0) {
              this.dataActivities = res.NotPayedActivities;
              localStorage.setItem('cart', JSON.stringify(this.dataActivities));
              sessionStorage.setItem('paymentResult', JSON.stringify(res));
              window.location.href = '/finish';
            } else {
              localStorage.removeItem('cart');
              sessionStorage.setItem('paymentResult', JSON.stringify(res));
              window.location.href = '/finish';
            }
          } else {
            //TODO:
            // לא בוצע כלל תשלום. להציג שגיאה והמלצות
            this.inProcess = false;
            this.creditCardPaymentResult = res;
            this.showMessage('error', '', ' תשלום לא בוצע ');
          }
        },
        (err: HttpErrorResponse) => {
          this.showMessage('error', '', 'תקלה בביצוע התשלום ');
          this.inProcess = false;
        }
      );
    }
  }

  fixTime(date: Date): Date {
    return new Date(date.toString());
  }

  showMessage(type, summaryMessage, message): void {
    this.msgs = [];
    this.msgs.push({
      severity: type,
      summary: summaryMessage,
      detail: message,
    });
  }

  showSuccess() {
    this.msgs = [];
    this.msgs.push({
      severity: 'success',
      summary: '',
      detail: ' העדכון נשמר בהצלחה',
    });
  }

  showError() {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: '', detail: ' שגיאה בעדכון' });
  }

  validityChange = (result: any) => {
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
    if (result.cardType !== 'unknown') {
      this.imageSrc = '';
      this.imageSrc = 'assets/icons/' + result.cardType + '.png';
    } else {
      this.imageSrc = 'assets/icons/cardExample.png';
    }
  };

  onSubmit() {
    this.Submited = true;
    this.amount = this.paymentForm.controls.amount.value;
    let Installments = this.paymentForm.controls.Installments.value;
    let installment_amount = (
      (Math.round(parseInt(this.amount) / Installments + Number.EPSILON) *
        100) /
      100
    ).toString();

    this.fields.charge(
      {
        //expiry_month: this.paymentForm.controls.expiry.value.substring(0, 2),
        //expiry_year: this.paymentForm.controls.expiry.value.substring(3, 7),
        terminal_name: this.dataActivities[0].TerminalUser, //'naamat100', //environment.terminalName,
        amount: this.amount,
        currency_code: this.currencyCode, //environment.currencyCode,
        payment_plan: Installments > 1 ? '8' : '1',
        first_installment_amount: (
          parseFloat(this.amount) -
          parseInt(installment_amount) * (Installments - 1)
        ).toString(),
        other_installments_amount: installment_amount,
        total_installments_number: Installments - 0, // בניגוד לתיעוד שלהם ולמה שדוד עשה בממשק, מתברר שלא צריך להוריד 1 מהתשלומים. אם עושים זאת מקבלים שגיאה . טרנזילה מסתבר עושים זאת בעצמם
        tokenize: true,
        response_language: 'Hebrew', //environment.responseLanguage
        payment_amount: this.amount,
        email: this.dataCartForm.Email,
        contact: this.dataCartForm.FirstName + ' ' + this.dataCartForm.LastName,
        pdesc: this.dataActivities[0].ActivityDesc, //this.dataActivities[0].ActivityId,
        remarks: this.dataActivities[0].OrganizationUnitDesc.toString(),
      },
      (error, response) => {
        if (response) {
          if (response.errors) {
            this.failedHiden = false;
            response.errors.forEach((error) => {
              this.showMessage('error', '', error.message);
            });
          } else {
            if (response.transaction_response.error) {
              this.failedHiden = false;
              this.showMessage(
                'error',
                '',
                response.transaction_response.error
              );
            } else {
              this.successHiden = false;
              this.payNow(response);
            }
          }
        }
        if (error) {
          if (error.error == 'invalid_resource') {
            if (error.messages.length != 0) {
              error.messages.forEach((message) => {
                if (message.param == 'credit_card_number') {
                  this.cardNumValid = false;
                  this.showMessage('error', '', message.message);
                } else if (message.param == 'cvv') {
                  this.cvvValid = false;
                  this.showMessage('error', '', message.message);
                } else if (message.param == 'card_holder_id_number') {
                  this.cardHolderValid = false;
                  this.showMessage('error', '', message.message);
                } else if (message.param == 'expiry') {
                  this.expiryValid = false;
                  this.showMessage('error', '', message.message);
                } else {
                  this.showMessage('error', '', message.message);
                }
              });
            }
            this.Submited = false;
            return;
          } else {
            this.failedHiden = false;
            this.errorMessage = error.error_description;
            this.showMessage('error', '', error.error_description);
          }
        }
        //else if (response) {
        //   this.successHiden = false;
        //   }
        this.Submited = false;
      }
    );
  }
}

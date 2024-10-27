import {
  Component,
  OnInit,
  Input,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Contact } from '../model/contact';
import { NgForm } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Message } from 'primeng/components/common/api';

import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { RadioButtonModule } from 'primeng/radiobutton';
//import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

declare const TzlaHostedFields: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
//@Pipe({ name: 'safe' })
export class HomeComponent implements OnInit {
  onShow: EventEmitter<any>;

  contactData: Contact;
  userDetails: any = null;
  message: string = '';
  msgs: Message[] = [];

  //selectedCity: any;
  CityOptions: SelectItem[] = null;
  //selectedGender: any;
  GenderOptions: SelectItem[] = null;
  HashalRankOptions: SelectItem[] = null;
  HashalServiceTypeOptions: SelectItem[] = null;
  HashalDonateAmountOther: number;

  hashalPensionDisplay: boolean = false;
  notHashalPensionDisplay: boolean = false;

  urlSafe: SafeResourceUrl;

  @ViewChild('f') myForm: NgForm;

  VerCode: any;
  Sender: any;

  paymentForm: FormGroup;
  fields: any;

  terminalUser: any; //'naamat100'
  @Input() amount: string = '0'; //environment.testAmount;
  currencyCode: any = 'ILS'; // environment.currencyCode;
  //@Input() Installments: number = 1;
  //MaxInstallments: number;

  creditCardNumber: string;
  expiry: string;
  cvv: string;
  imageSrc: string;

  cardNumValid: boolean = true;
  cvvValid: boolean = true;
  cardHolderValid: boolean = true;
  expiryValid: boolean = true;
  //InstallmentsValid: boolean = true;

  successHiden: boolean = true;
  failedHiden: boolean = true;
  errorMessage: string | undefined;

  constructor(
    public route: ActivatedRoute,

    public router: Router,
    public sanitizer: DomSanitizer,
    private _fb: FormBuilder
  ) {
    this.contactData = new Contact();
    this.creditCardNumber = '';
    this.expiry = '';
    this.cvv = '';
    this.imageSrc = 'assets/icons/cardExample.png';
  }

  ngOnInit() {
    this.getContact();
    //this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl("https://direct.tranzila.com/naamat100/iframenew.php?lang=il&currency=1&accessibility=2&nologo=1&cred_type=1&u71=1&tranmode=AK&sum=" + this.contactData.HashalDonateAmount);

    this.paymentForm = this._fb.group({
      amount: ['', []],
      //Installments: ['', [Validators.required, Validators.min(1), Validators.max(this.MaxInstallments)]],
      creditCardNumber: ['', [Validators.required]], //creditCardNumber: ['', [CreditCardValidators.validateCCNumber]],
      expiry: ['', [Validators.required]], //      expiry: ['', [CreditCardValidators.validateExpDate]],
      cvv: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(4)],
      ],
      creditCardHolderId: ['', [Validators.required]],
    });

    this.amount = this.contactData.HashalDonateAmount.toString();
  }

  //ngAfterViewInit() {
  ViewInit() {
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
    //this.paymentForm.controls.Installments.setValue(this.Installments);
  }

  getContact() {
    this.Sender = 'Hashal'; //To decide if to get from DB or Config or ...???

    //this.userService.getUserClaims().subscribe((result: any) => {
    //this.userDetails = result;

    //this.selectedCity = null;
    this.contactService.getListActivityCityDDL().subscribe(
      (result: any) => {
        this.CityOptions = result;
      },
      (err: HttpErrorResponse) => {
        this.showMessage('error', '', 'תקלה בקבלת רשימת ישובים לאיש קשר ');
      }
    );

    //this.selectedGender = null;
    //this.contactService.getListGenderDDL().subscribe((result: any) => {
    //  this.GenderOptions = result;
    //},
    //  (err: HttpErrorResponse) => {
    //    this.showMessage('error', '', 'תקלה בקבלת רשימת מגדר לאיש קשר ');
    //  });

    this.contactService.getListHashalRankDDL().subscribe(
      (result: any) => {
        this.HashalRankOptions = result;
      },
      (err: HttpErrorResponse) => {
        this.showMessage('error', '', 'תקלה בקבלת רשימת דרגות לאיש קשר ');
      }
    );

    this.contactService.getListHashalServiceTypeDDL().subscribe(
      (result: any) => {
        this.HashalServiceTypeOptions = result;
      },
      (err: HttpErrorResponse) => {
        this.showMessage('error', '', 'תקלה בקבלת רשימת סוג שירות לאיש קשר ');
      }
    );

    this.contactService.getTerminalData().subscribe(
      (result: any) => {
        this.terminalUser = result.TerminalUser;
      },
      (err: HttpErrorResponse) => {
        this.showMessage('error', '', 'תקלה בקבלת נתוני טרנזילה ');
      }
    );

    //const ContactId = this.route.snapshot.paramMap.get('id');
    //if (ContactId) {
    //  if (this.userDetails) { // && (this.userDetails.ClientRoleAdministration)) {
    //    this.contactService.getContactDetails(ContactId).subscribe((result: Contact) => {
    //      this.contactData = result;
    //      this.contactData.BirthdayDate = this.fixTime(this.contactData.BirthdayDate);
    //      //this.contactData.CreateDate = this.fixTime(this.contactData.CreateDate);
    //      //this.contactData.UpdateDate = this.fixTime(this.contactData.UpdateDate);
    //      //this.contactData.ApproveDate = this.fixTime(this.contactData.ApproveDate);
    //    },
    //      (err: HttpErrorResponse) => {
    //        this.showMessage('error', '', 'תקלה בקבלת פרטי איש קשר');
    //      });
    //  }
    //  else {
    //    this.showMessage('error', '', 'Access denied');
    //  }

    //} else {
    //this.contactData = new Contact();
    //this.contactData = {
    //  ContactId: null,
    //  CityId: null,
    //  Address: '',
    //  //isPrivate: this.userDetails.ClientRoleAdministration ? null : true,
    //  Active: true
    //};

    this.getDefaults();
    //}

    //}, (err: HttpErrorResponse) => {
    //  this.userDetails = null;
    //  this.showMessage('error', '', 'Access denied');
    //});
  }

  onSubmit(f: NgForm) {
    if (f.valid) {
      if (!this.isValidIdentityNumber(this.contactData.IdentityNumber)) {
        f.form.controls['formIdentityNumber'].setErrors({ incorrect: true });
        f.form.controls['formIdentityNumber'].markAsDirty();
      } else {
        // this.user.Id = this.route.snapshot.paramMap.get('o');
        //this.contactData.Active = f.value.Active;
        //this.contactData.isPrivate = f.value.isPrivate;
        this.contactData.BirthdayDate = new Date(
          Date.UTC(
            this.contactData.BirthdayDate.getFullYear(),
            this.contactData.BirthdayDate.getMonth(),
            this.contactData.BirthdayDate.getDate()
          )
        );
        //this.contactData.CreateDate = new Date(Date.UTC(this.contactData.CreateDate.getFullYear(), this.contactData.CreateDate.getMonth(), this.contactData.CreateDate.getDate()));
        //this.contactData.UpdateDate = new Date(Date.UTC(this.contactData.UpdateDate.getFullYear(), this.contactData.UpdateDate.getMonth(), this.contactData.UpdateDate.getDate()));
        //this.contactData.ApproveDate = new Date(Date.UTC(this.contactData.ApproveDate.getFullYear(), this.contactData.ApproveDate.getMonth(), this.contactData.ApproveDate.getDate()));
        if (this.contactData.DraftDate) {
          this.contactData.DraftDate = new Date(
            Date.UTC(
              this.contactData.DraftDate.getFullYear(),
              this.contactData.DraftDate.getMonth(),
              this.contactData.DraftDate.getDate()
            )
          );
        }
        if (this.contactData.DischargeDate) {
          this.contactData.DischargeDate = new Date(
            Date.UTC(
              this.contactData.DischargeDate.getFullYear(),
              this.contactData.DischargeDate.getMonth(),
              this.contactData.DischargeDate.getDate()
            )
          );
        }
        if (this.contactData.HashalDonateAmount == 0) {
          this.contactData.HashalDonateAmount = this.HashalDonateAmountOther;
        }
        if (this.contactData.HashalServiceTypeId == 4) {
          this.contactData.IsHashalPension = false;
        }

        this.contactService
          .SaveContactFrontEnd(this.contactData, this.Sender)
          .subscribe(
            (res) => {
              this.showMessage('success', '', 'פרטי איש קשר נשמרו');
              if (res == '0') {
                this.showMessage(
                  'error',
                  '',
                  'נכשלה שליחת הודעת אימות לנייד. בדוק שמספר הנייד תקין או פנה למנהל המערכת'
                );
              } else {
                if (
                  !this.contactData.ContactId ||
                  this.contactData.ContactId === 0
                ) {
                  let newContactId = res;
                  if (this.contactData.IsHashalPension == true) {
                    this.hashalPensionDisplay = true;
                  } else {
                    this.notHashalPensionDisplay = true;
                    this.amount =
                      this.contactData.HashalDonateAmount.toString();
                    //this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl("https://direct.tranzila.com/naamat100/iframenew.php?lang=il&currency=1&accessibility=2&nologo=1&cred_type=1&u71=1&tranmode=AK&sum=" + this.contactData.HashalDonateAmount);
                  }
                  this.contactData.ContactId = newContactId;
                  //window.location.href = "/contact-edit/" + newContactId;
                }
              }
              //this.router.navigate(['contact-list']);
            },
            (err: HttpErrorResponse) => {
              this.showMessage('error', '', 'תקלה בשמירת פרטי איש קשר');
            }
          );
      }
    }
  }

  showMessage(type, summaryMessage, message): void {
    this.msgs = [];
    this.msgs.push({
      severity: type,
      summary: summaryMessage,
      detail: message,
    });
  }

  fixTime(date: Date): Date {
    return new Date(date.toString());
  }

  updateMonthlyChargeApproval() {
    this.contactService
      .VerifyCode(this.contactData.ContactId, this.VerCode)
      .subscribe(
        (res) => {
          if (res) {
            this.hashalPensionDisplay = false;

            this.contactService
              .UpdateMonthlyChargeApproval(this.contactData)
              .subscribe(
                (res) => {
                  this.contactService
                    .CheckContactActiveExistAndUpdStatus(this.contactData)
                    .subscribe(
                      (res) => {
                        this.showMessage('success', '', 'הרישום נקלט בהצלחה');

                        this.contactService
                          .createChargeFormPdf(this.contactData.ContactId)
                          .subscribe(
                            (result: any) => {
                              let fileName =
                                'ChargeForm' +
                                this.contactData.ContactId +
                                '.pdf';

                              window.URL.createObjectURL(
                                new Blob([result], {
                                  type: 'application/octet-stream',
                                })
                              );
                              if (
                                window.navigator &&
                                window.navigator.msSaveOrOpenBlob
                              ) {
                                window.navigator.msSaveOrOpenBlob(
                                  result,
                                  fileName
                                );
                              }
                              let url = window.URL.createObjectURL(result);
                              let link = document.createElement('a');
                              link.href = url;
                              link.download = `${fileName}`;
                              link.click();
                            },
                            (err: HttpErrorResponse) => {
                              this.showMessage(
                                'error',
                                '',
                                'תקלה ביצירת קובץ הרשמה '
                              );
                            }
                          );

                        //this.router.navigate(['contact-list']);
                        //setTimeout(() => { window.location.reload(); }, 2500);
                        this.myForm.resetForm();
                        //this.getDefaults();
                        //setTimeout(() => { this.router.navigate(['/home']); }, 1500);
                        //this.router.navigate(['/home']);
                      },
                      (err: HttpErrorResponse) => {
                        this.showMessage(
                          'error',
                          '',
                          'תקלה בחיפוש רשומות קודמות לאיש קשר ועדכון סטטוס '
                        );
                      }
                    );
                },
                (err: HttpErrorResponse) => {
                  this.showMessage('error', '', 'תקלה בשמירת אישור חיוב חודשי');
                }
              );
          } else {
            this.showMessage(
              'error',
              '',
              'קוד אימות שהוכנס לא תואם לקוד שנשלח לנייד'
            );
          }
        },
        (err: HttpErrorResponse) => {
          this.showMessage('error', '', 'תקלה באימות קוד שנשלח לנייד');
        }
      );
    //this.contactData = new Contact();
  }

  getChargeForm() {
    this.hashalPensionDisplay = false;

    this.contactService
      .createChargeFormPdf(this.contactData.ContactId)
      .subscribe(
        (result: any) => {
          let fileName = 'ChargeForm' + this.contactData.ContactId + '.pdf';

          window.URL.createObjectURL(
            new Blob([result], { type: 'application/octet-stream' })
          );
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(result, fileName);
          }
          let url = window.URL.createObjectURL(result);
          let link = document.createElement('a');
          link.href = url;
          link.download = `${fileName}`;
          link.click();
        },
        (err: HttpErrorResponse) => {
          this.showMessage('error', '', 'תקלה ביצירת קובץ טופס הסכמה ');
        }
      );
    setTimeout(() => {
      window.location.reload();
    }, 1500);
    //this.myForm.resetForm();
    //this.getDefaults();
    //this.router.navigate(['/home']);
  }

  chargeCreditCard() {
    this.notHashalPensionDisplay = false;

    this.contactService.UpdateCreditCardCharge(this.contactData).subscribe(
      (res) => {
        this.contactService
          .CheckContactActiveExistAndUpdStatus(this.contactData)
          .subscribe(
            (res) => {
              this.showMessage('success', '', 'הרישום נקלט בהצלחה');
              //window.location.reload();
              this.myForm.resetForm();
              //this.getDefaults();
              //this.router.navigate(['/home']);
            },
            (err: HttpErrorResponse) => {
              this.showMessage(
                'error',
                '',
                'תקלה בחיפוש רשומות קודמות לאיש קשר ועדכון סטטוס '
              );
            }
          );
      },
      (err: HttpErrorResponse) => {
        this.showMessage('error', '', 'תקלה בשמירת נתוני חיוב אשראי');
      }
    );
  }

  getDefaults() {
    this.contactData.IsSmsAllowed = true;
    this.contactData.IsEmailAllowed = true;

    this.contactData.IsHashalPension = true;
    this.contactData.HashalServiceTypeId = 1;

    this.contactData.HashalDonateAmount = 30;
    this.contactData.ContactId = null;

    this.contactData.GenderId = 3;
  }

  isValidIdentityNumber(str) {
    if (!str) {
      return true;
    }

    var R_ELEGAL_INPUT = false; //-1;
    var R_NOT_VALID = false; //-2;
    var R_VALID = true; //1;

    //INPUT VALIDATION

    // Just in case -> convert to string
    var IDnum = str; //String(str);

    // Validate correct input
    if (IDnum.length > 9 || IDnum.length < 5) return R_ELEGAL_INPUT;
    if (isNaN(IDnum)) return R_ELEGAL_INPUT;

    // The number is too short - add leading 0000
    if (IDnum.length < 9) {
      while (IDnum.length < 9) {
        IDnum = '0' + IDnum;
      }
    }

    // CHECK THE ID NUMBER
    var mone = 0,
      incNum;
    for (var i = 0; i < 9; i++) {
      incNum = Number(IDnum.charAt(i));
      incNum *= (i % 2) + 1;
      if (incNum > 9) incNum -= 9;
      mone += incNum;
    }
    if (mone % 10 == 0) return R_VALID;
    else return R_NOT_VALID;
  }

  checkIsValidIdentityNumber(str) {
    if (!this.isValidIdentityNumber(str)) {
      this.myForm.form.controls['formIdentityNumber'].setErrors({
        incorrect: true,
      });
      this.myForm.form.controls['formIdentityNumber'].markAsDirty();

      return false;
    } else {
      return true;
    }
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

  onCharge() {
    let Installments = 1; //this.paymentForm.controls.Installments.value;
    //let installment_amount = ((Math.round((parseInt(this.amount) / Installments) + Number.EPSILON) * 100) / 100).toString();

    this.fields.charge(
      {
        terminal_name: this.terminalUser, //environment.terminalName,
        amount: this.amount,
        currency_code: this.currencyCode, //environment.currencyCode,
        payment_plan: Installments > 1 ? '8' : '1',
        //first_installment_amount: (parseInt(this.amount) - (parseInt(installment_amount) * (Installments - 1))).toString(),
        //other_installments_amount: installment_amount,
        //total_installments_number: (Installments - 0),   // בניגוד לתיעוד שלהם ולמה שדוד עשה בממשק, מתברר שלא צריך להוריד 1 מהתשלומים. אם עושים זאת מקבלים שגיאה . טרנזילה מסתבר עושים זאת בעצמם
        tokenize: true,
        response_language: 'Hebrew', //environment.responseLanguage
        email: this.contactData.Email,
        contact: this.contactData.FirstName + ' ' + this.contactData.LastName,
        pdesc: 'דמי חבר',
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

              //this.contactData.success = response.transaction_response.success;
              this.contactData.Token = response.transaction_response.token;
              this.contactData.TransactionId =
                response.transaction_response.transaction_id;
              this.contactData.CurrencyCode =
                response.transaction_response.currency_code;
              this.contactData.CardLast4Digits =
                response.transaction_response.credit_card_last_4_digits;
              this.contactData.ValidityMonth =
                response.transaction_response.expiry_month;
              this.contactData.ValidityYear =
                response.transaction_response.expiry_year;
              this.contactData.HowManyPayments = Installments;
              this.contactData.CardHolderIdNumber =
                response.transaction_response.user_form_data.card_holder_id_number;

              this.chargeCreditCard();
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
      }
    );
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PlayerFormComponent } from './player-form/player-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlayersRankComponent } from './players-rank/players-rank.component';
import { GalleryComponent } from './gallery/gallery.component';
import { PaymentComponent } from './payment/payment.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';

// all this are realated to primeNG
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ChildComponent } from './child/child.component';
import { ParentComponent } from './parent/parent.component';
import { CountriesComponent } from './countries/countries.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { OnChangeComponent } from './on-change/on-change.component';
import { CheckboxModule } from 'primeng/checkbox';
import { DonnetionComponent } from './donnetion/donnetion.component';
import { DatesComponent } from './dates/dates.component';
import { PaymentCartComponent } from './payment-cart/payment-cart.component';
import { TranzilaComponent } from './tranzila/tranzila.component';
import { SuccessPaymentComponent } from './success-payment/success-payment.component';
import { FailedPaymentComponent } from './failed-payment/failed-payment.component';
import { NotifyPaymentComponent } from './notify-payment/notify-payment.component';
import { HostedFieldsComponent } from './hosted-fields/hosted-fields.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranzilaHFComponent } from './tranzila-hf/tranzila-hf.component';
import { CreditCardDirectivesModule } from "angular-cc-library";
import { EventsComponent } from './events/events.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PlayerFormComponent,
    PlayersRankComponent,
    GalleryComponent,
    PaymentComponent,
    ContactUsComponent,
    HomeComponent,
    ErrorComponent,
    LoginComponent,
    ChildComponent,
    ParentComponent,
    CountriesComponent,
    OnChangeComponent,
    DonnetionComponent,
    DatesComponent,
    PaymentCartComponent,
    TranzilaComponent,
    SuccessPaymentComponent,
    FailedPaymentComponent,
    NotifyPaymentComponent,
    HostedFieldsComponent,
    TranzilaHFComponent,
    EventsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    InputTextModule,
    DropdownModule,
    MultiSelectModule,
    CheckboxModule,
    HttpClientModule,
    ReactiveFormsModule,
    CreditCardDirectivesModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

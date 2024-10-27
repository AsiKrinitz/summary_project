import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ErrorComponent } from './error/error.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PaymentComponent } from './payment/payment.component';
import { PlayerFormComponent } from './player-form/player-form.component';
import { PlayersRankComponent } from './players-rank/players-rank.component';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
import { CountriesComponent } from './countries/countries.component';
import { OnChangeComponent } from './on-change/on-change.component';
import { DonnetionComponent } from './donnetion/donnetion.component';
import { DatesComponent } from './dates/dates.component';
import { PaymentCartComponent } from './payment-cart/payment-cart.component';
import { TranzilaComponent } from './tranzila/tranzila.component';
import { SuccessPaymentComponent } from './success-payment/success-payment.component';
import { FailedPaymentComponent } from './failed-payment/failed-payment.component';
import { NotifyPaymentComponent } from './notify-payment/notify-payment.component';
import { HostedFieldsComponent } from './hosted-fields/hosted-fields.component';
import { TranzilaHFComponent } from './tranzila-hf/tranzila-hf.component';
import { EventsComponent } from './events/events.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'ranking', component: PlayersRankComponent },
  { path: 'form', component: PlayerFormComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'contactUs', component: ContactUsComponent },
  { path: 'parent', component: ParentComponent },
  { path: 'child', component: ChildComponent },
  { path: 'countries', component: CountriesComponent },
  { path: 'onChange', component: OnChangeComponent },
  { path: 'donnetion', component: DonnetionComponent },
  { path: 'dates', component: DatesComponent },
  { path: 'paymentCart', component: PaymentCartComponent },
  { path: 'tranzila', component: TranzilaComponent },
  { path: 'successPayment', component: SuccessPaymentComponent },
  { path: 'failedPayment', component: FailedPaymentComponent },
  { path: 'notifiyPayment', component: NotifyPaymentComponent },
  { path: 'hostedFields', component: HostedFieldsComponent },
  { path: 'hostedFieldsPayment', component: TranzilaHFComponent },
  { path: 'events', component: EventsComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

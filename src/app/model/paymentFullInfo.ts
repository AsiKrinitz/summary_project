import { Activity } from "./activity";
import { CartForm } from "./cartForm";
import { CreditCardData } from "./credit-card-data";

export class PaymentFullInfo {
  activities: Activity[] ;
  cartForm: CartForm ;
  creditCardData: CreditCardData ;
  totalAmount: number ;
  ExecuteCreaditCardCharge: boolean;
};

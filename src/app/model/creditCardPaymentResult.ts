import { Activity } from "./activity";
import { CartForm } from "./cartForm";

export class CreditCardPaymentResult {
  isSucceed: boolean;  
  Details: string;
  ErrorMessage: string;
  Reccomendations: string;  
  PaiedActivities: Activity[];
  NotPayedActivities: Activity[]; 
  CartId: string; 
  ExecuteCreaditCardCharge: boolean;
};

import { Byte } from "@angular/compiler/src/util";

export class PaymentDetail {
  paymentDetailId:number=0; 
  cardOwnerName:string=''; 
  cardNumber:string=''; 
  expirationDate:string=''; 
  securityCode:string='';
  isActive : Byte = 1;
}




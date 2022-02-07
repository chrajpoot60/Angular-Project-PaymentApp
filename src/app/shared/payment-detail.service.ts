import { Injectable } from '@angular/core';
import { PaymentDetail } from './payment-detail/payment-detail.module';
import { HttpClient } from "@angular/common/http";
import { observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  constructor(private http: HttpClient) { 

  }
  //initialise formData refrence with PaymentDetail obj
  formData: PaymentDetail = new PaymentDetail();
  list: PaymentDetail[]=[];
  readonly baseURL = "http://localhost:40060/api/PaymentDetails"
  postPaymentDetail() {
    return this.http.post(this.baseURL, this.formData)
  }
  putPaymentDetail(){
    return this.http.put(this.baseURL+'/'+this.formData.paymentDetailId,this.formData)
    //return this.http.put('${{this.baseURL}}/${{this.formData.paymentDetailId}}',this.formData)
  }
  deletePaymentDetail(id:number){
    return this.http.delete(this.baseURL+'/'+id);
    //return this.http.delete('${this.baseURL}/${id}');
  }
  refreshlist() {
    this.http.get(this.baseURL).toPromise()
      .then(res => this.list = res as PaymentDetail[]);

  }

}

import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from 'src/app/shared/payment-detail/payment-detail.module';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {

  constructor(public service: PaymentDetailService, private toastr: ToastrService) { }
  @ViewChild('form')
  form!: NgForm;
 
  ngOnInit(): void {
    this.service.refreshlist();
  }
  //this method is used to reflect the list data into our PaymentDetail class instance (formData)
  //this method help us to perform update operation
  populateForm(selectedRecord: PaymentDetail) {
    //can't use direct assignment because the data reflect in list
    //so need to create a copy of that data obj
    this.service.formData = Object.assign({}, selectedRecord);
  }
  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?'+id)) {
      console.log(id);
      //this deletePaymentDetails return Observable so we need to suscribe it
      //suscribe method has two callback functiion 1)res and 2)err
      this.service.deletePaymentDetail(id)
        .subscribe(
          res => {
            
            this.service.refreshlist();
            this.toastr.error("Deleted successfully", "Payment Details Register");
          },
          err => { console.log(err) }
        )
    }
  }

}

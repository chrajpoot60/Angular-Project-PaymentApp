import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { resetFakeAsyncZone } from '@angular/core/testing';
import {PaymentDetail}from 'src/app/shared/payment-detail/payment-detail.module';
import {ToastrService} from 'ngx-toastr';



@Component({
  selector: 'app-payment-details-form',
  templateUrl: './payment-details-form.component.html',
  styleUrls: ['./payment-details-form.component.css']
})
export class PaymentDetailsFormComponent implements OnInit {

  constructor(public service: PaymentDetailService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.paymentDetailId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form)
  }
  insertRecord(form: NgForm) {
    this.service.postPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshlist();
        this.toastr.success("Submitted successfull", "Payment Details Register")
      },
      err => { console.log(err); }
    );
  }
  updateRecord(form: NgForm) {
    // whenever this putPaymentDetails called it return Observable so we need to suscribe it to get response
      //suscribe method has two callback functiion 1)res and 2)err
    this.service.putPaymentDetail().subscribe(
      res => {

        this.resetForm(form);
        this.service.refreshlist();
        this.toastr.info("Updated successfull", "Payment Details Register")
      },
      err => { console.log(err); }
    );

  }
  //this resetForm need to call after insertion and updation of record to create new instance of PaymentDetail class
  //which is using in two way binding 
  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new PaymentDetail();
  }
}

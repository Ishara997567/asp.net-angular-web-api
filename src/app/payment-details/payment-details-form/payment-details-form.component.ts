import { Component, OnInit } from '@angular/core';
import {PaymentDetailsService} from "../../shared/payment-details.service";
import {NgForm} from "@angular/forms";
import {PaymentDetails} from "../../shared/payment-details.model";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details-form',
  templateUrl: './payment-details-form.component.html',
  styles: [
  ]
})
export class PaymentDetailsFormComponent implements OnInit {

  constructor(public service : PaymentDetailsService, private toastr: ToastrService) { }
  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    if(this.service.formData.paymentDetailId == null)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm){
    this.service.postPaymentDetails().subscribe(
      res => {
        // @ts-ignore
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Submitted Successfully', 'Payment Detail Register')
      },
      err => {
        console.log(err)
      }
    )
  }

  updateRecord(form: NgForm){
    this.service.putPaymentDetails().subscribe(
      res => {
        // @ts-ignore
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Updated Successfully', 'Payment Detail Register')
      },
      err => {
        console.log(err)
      }
    )
  }


  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData = new PaymentDetails();
  }

}

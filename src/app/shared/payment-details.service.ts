import { Injectable } from '@angular/core';
import {PaymentDetails} from "./payment-details.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailsService {

  constructor(private http:HttpClient) { }

  readonly baseUrl = 'https://localhost:44366/api/PaymentDetail'
  formData : PaymentDetails = new PaymentDetails();
  // @ts-ignore
  list : PaymentDetails[]

  postPaymentDetails(){
    return this.http.post(this.baseUrl, this.formData);
  }

  putPaymentDetails(){
    return this.http.put(`${this.baseUrl}/${this.formData.paymentDetailId}`, this.formData);
  }

  deletePaymentDetail(id:number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  refreshList(){
    this.http.get(this.baseUrl)
      .toPromise()
      .then(res => this.list = res as PaymentDetails[]);
  }

}

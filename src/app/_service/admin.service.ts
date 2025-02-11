import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Admin, AdminLogin,AllSubscription,GetAllLendingRequestAndApproved, GetAllReturn, PaymentSummary, globalDiscount } from '../_Inerface/AdminInterFace';
import { map } from 'rxjs';
import { BookId } from '../_Inerface/BookInterFace';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient)
  baseUrl = environment.apiUrl;

  Admin = signal<Admin|null>(null)
  LendingRequestSignal = signal<GetAllLendingRequestAndApproved[]>([])
  ApprovedBookSignal = signal<GetAllLendingRequestAndApproved[]>([])
  BookReturnSignal = signal<GetAllReturn[]>([])

  AdminLogin(admin:AdminLogin){
    return this.http.post(this.baseUrl + "Admin/authenticate", admin).pipe(
      map((admin:any)=>{
        if(admin){
          localStorage.setItem('Admin',JSON.stringify(admin))
          this.Admin.set(admin)
        }
      })
    )
  }

  AllLendingRequest(search:string){
    return this.http.get<GetAllLendingRequestAndApproved[]>(this.baseUrl + `BookLending/GetAllLendingRequest?searchText=${search}`).subscribe({
      next: res =>{
        this.LendingRequestSignal.set(res)
      }
    })
  }

  ApproveLending(id:BookId)
  {
    var data= this.http.put<BookId>(this.baseUrl + `BookLending/BookApprove`,id,{responseType: 'text' as 'json'})

    return data;
  }

  UpdateToLending(id:BookId)
  {
    var data= this.http.put<BookId>(this.baseUrl + `BookLending/UpdateLended`,id,{responseType: 'text' as 'json'})

    return data;
  }

  GetAllReturn(search:string){
    return this.http.get<GetAllReturn[]>(this.baseUrl + `BookLending/GetAllReturn?searchText=${search}`).subscribe({
      next:res=>{
        this.BookReturnSignal.set(res)
      }
    })
  }

  GetBookReturn(lendId:number)
  {
    return this.http.post(this.baseUrl + `HistoryContoller/UpdateHistory/${lendId}`,{})
  }

  GetAllApprove(Text:string){
    return this.http.get<GetAllLendingRequestAndApproved[]>(this.baseUrl +`BookLending/GetAllApproved?searchText=${Text}`).subscribe({
      next:res=>{
        this.ApprovedBookSignal.set(res)
      }
    })
  }

  AcceptReturn(lendId:number){
    return this.http.post(this.baseUrl + `HistoryContoller/UpdateHistory/${lendId}`,[]);
  }

  GetAllSubscriptionRequest(){
    return this.http.get<AllSubscription[]>(this.baseUrl +`Payment/Subscription-Request`);
  }

  GetAllUserCount(){
    return this.http.get<number>(this.baseUrl +`HistoryContoller/GetAll-UsersCount`)
  }

  GetAllBookCount(){
    return this.http.get<number>(this.baseUrl + `HistoryContoller/GetAll-BookCount`)
  }

  GetAllApprovedBookCount(){
    return this.http.get<number>(this.baseUrl + `HistoryContoller/GetAll-Approved-Books`)
  }

  ApproveSubscription(userId:any){
    return this.http.post(this.baseUrl + `Payment/BuySubscription`,userId)
  }

  Getpaymentsummary(){
    return this.http.get<PaymentSummary[]>(this.baseUrl + `Payment/summary`)
  }

  AddglobalDiscount(data:globalDiscount){
    return this.http.post(this.baseUrl + `BookPrice/update-all-discounts`,data)
  }
}

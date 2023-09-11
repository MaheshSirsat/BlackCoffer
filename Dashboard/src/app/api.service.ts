import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  dataavailable:boolean=false
  error:boolean=false
  errormessage:string=''
  data:any;

  getdata():Observable<any>{
    return this.http.get('http://127.0.0.1:8000/api/data')

    // if (!this.dataavailable) {
    //   this.http.get('https://angularbackend-82283-default-rtdb.firebaseio.com/store.json').subscribe((data)=>{
    //   this.data=data
    //   this.dataavailable=true
    //   console.log(data,this.data);
      
     
    // },(err)=>{
    //   console.log('this is err from service',err);
    //     this.error=true
    //     this.errormessage=err.message
    //     this.getdata()
    // })
    // } else {
    //   console.log('esle part',this.data);
      
    //   return this.data
    // }
    
  }
}

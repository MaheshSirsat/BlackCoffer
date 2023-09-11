import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dashboard';
  dataavailable:boolean=false
  error:boolean=false
  errormessage:string=''
  data:any;
  
  constructor(private service:ApiService){}
  ngOnInit(): void {
  
    
    this.data= this.service.getdata().subscribe((data)=>{
         this.data=data.modelschemadata
         this.service.data=data
         console.log(this.data);
         
      this.service.dataavailable=true
      this.dataavailable=true
     
    },(err)=>{
        console.log('this is err from service',err);
          this.error=true
          this.errormessage=err.message
     
      })
    
    
   
  }
}

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-sortdata',
  templateUrl: './sortdata.component.html',
  styleUrls: ['./sortdata.component.css']
})
export class SortdataComponent implements OnChanges {
  @Input() dataavailable:boolean=false;
  @Input() error:boolean=false
   @Input() errormessage:string=''
   @Input() data:any;
   searchdata:string=''
   filterdata:string='topic'
  dam?:any[]
   
    givesearchvalue(){
      if (this.searchdata) {
     
      this.dam=this.data.filter((item:any)=>item[this.filterdata].toLowerCase().includes(this.searchdata.toLowerCase()))
      } else {
        this.dam=this.data
      }
    
      // console.log(this.dam);
      
    
   }
   ngOnChanges(changes: SimpleChanges): void {
    if(changes['dataavailable'].currentValue){
      console.log(this.data);
      
      this.dam=this.data
    }
   }
}

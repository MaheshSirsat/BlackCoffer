import { Component, DoCheck, Input, OnChanges, SimpleChanges } from '@angular/core';



@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.css']
})
export class CountComponent implements OnChanges {
  constructor() {
    
  }
 @Input() dataavailable:boolean=false;
 @Input() error:boolean=false
  @Input() errormessage:string=''
  @Input() data:any;

 topiccount:number=0
 regioncount:number=0
 countrycount:number=0
 sourcescount:number=0
 ngOnChanges(changes: SimpleChanges): void {
  if(changes['dataavailable'].currentValue){this.countchanges()}

   
 }
 private countchanges(){

  this.countrycount=new Set(this.data.map((item:any)=>item.country)).size;
  this.regioncount=new Set(this.data.map((item:any)=>item.region)).size;
  this.sourcescount=new Set(this.data.map((item:any)=>item.source)).size;
  this.topiccount=new Set(this.data.map((item:any)=>item.topic)).size;
  
 }
}

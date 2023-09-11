import { Component,OnInit, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import * as d3 from 'd3';
// import { Map } from 'typescript';
@Component({
  selector: 'app-sectorpie',
  templateUrl: './sectorpie.component.html',
  styleUrls: ['./sectorpie.component.css']
})
export class SectorpieComponent implements OnInit, OnChanges {
  @Input() dataavailable:boolean=false;
  @Input() error:boolean=false
   @Input() errormessage:string=''
   @Input() data:any;
   constructor(private el: ElementRef) {}
   
  ngOnInit(): void {
   
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['dataavailable'].currentValue){
      const sectorOccurrences = this.countSectorOccurrences(this.data);
      
      // Display the sector names and their respective counts
      for (const [sector, count] of sectorOccurrences.entries()) {
        console.log(`${sector}: ${count}`);
        this.mysectorfilterdata.push({ sector, count })
      }
    }
    console.log(this.mysectorfilterdata);
    
    this.createPieChart()

    
  }
   mysectorfilterdata:any[]=[]
  private  countSectorOccurrences(data: any[]): Map<string, number>{
    const sectorCountMap = new Map<string, number>();
    for (const item of data) {
      const sector = item.sector;
      if (sector && sector.trim() !== "") { // Check for non-null and non-empty string
        if (sectorCountMap.has(sector)) {
          // Increment the count if the sector is already in the map
          sectorCountMap.set(sector, sectorCountMap.get(sector)! + 1);
        } else {
          // Initialize the count to 1 if the sector is encountered for the first time
          sectorCountMap.set(sector, 1);
        }
      }
    }
    return sectorCountMap;
  }
  @ViewChild('chart', { static: true })  chartContainer?: ElementRef;
  private host?:d3.Selection<d3.BaseType,{},d3.BaseType,any>;
  private svg?: d3.Selection<SVGGElement, {}, d3.BaseType, any>;
  private width?:number;
  private height?:number;
  private radius?:number;
  private htmlElement?:HTMLElement;
  private pieData?:any[];

  // Assuming your data is in an array called 'yourData'
  private createPieChart() {
       console.log('called pie');
       
        this.htmlElement=(this.chartContainer?.nativeElement);
        this.host=d3.select(this.chartContainer?.nativeElement)
        this.width=250
        this.height=250
        this.radius=Math.min(this.width,this.height)/2
        this.host?.html('')
        this.svg = this.host.append('svg').attr('viewBox', `0 0 ${this.width} ${this.height}`)
        .append('g')
        .attr('transform', `translate(${this.width / 2},${this.height / 2})`);
        let pie=d3.pie()
        let values=this.mysectorfilterdata.map(data=>data.count)
        let arcsel=this.svg?.selectAll('.arc')
        .data(pie(values))
        .enter()
        .append('g')
        .attr("class","arc")
        this.populatepie(arcsel)
  }
  private populatepie(arcsel:any):void{
    let innerRadius = this.radius! - 50;
    let outerRadius = this.radius! - 10;
    let pieColor = d3.scaleOrdinal(d3.schemeCategory10);
    let arc = d3.arc<any, d3.DefaultArcObject>().innerRadius(0).outerRadius(outerRadius);
    arcsel.append('path').attr("d",arc).attr('fill',(datum:any,index:any)=>{
      return pieColor(this.mysectorfilterdata[index].sector)
    })
    arcsel.append('text').attr('transform',(datum:any)=>{
      datum.innerRadius=0;
      datum.outerRadius=outerRadius;
      return 'translate(" + arc.centroid(datum) + ")';
    })
  }
}

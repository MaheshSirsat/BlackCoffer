import { Component, Input, ElementRef, OnChanges, SimpleChanges , ViewChild} from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnChanges {
  @Input() dataavailable:boolean=false;
  @Input() error:boolean=false
   @Input() errormessage:string=''
   @Input() data:any;
   start_year_data?:any[]
   end_year_data?:any[]
   pestle_data?:any[];
   start_year:any
   end_year:any
   pestle:any
   start_yearcount:any
   end_yearcount:any
   pestlecount:any
   

    barwidth=600
    barheight=400
    barmargin={top:20,right:50,bottom:40,left:40}
    
   ngOnChanges(changes: SimpleChanges): void {
    if(changes['dataavailable'].currentValue){
      const sectorOccurrences = this.countSectorOccurrences(this.data,'start_year');
      console.log(sectorOccurrences);
      
      // Display the sector names and their respective counts
      for (const [sector, count] of sectorOccurrences.entries()) {
        console.log(`${sector}: ${count}`);
        this.start_year_data?.push({ sector, count })
      }
      this.start_yearcount=Array.from(sectorOccurrences.values())
      this.start_year=Array.from(sectorOccurrences.keys())
      console.log('ghedata',this.start_yearcount,this.start_year);
      
      

      console.log('straye',this.start_year_data);
      
      const sectorOccurrences1 = this.countSectorOccurrences(this.data,'end_year');
      console.log('endye',sectorOccurrences1);
      this.end_yearcount=Array.from(sectorOccurrences1.values())
      this.end_year=Array.from(sectorOccurrences1.keys())

      
      
      const sectorOccurrences2 = this.countSectorOccurrences(this.data,'pestle');
      console.log('pestle',sectorOccurrences2);
      console.log('pesyle end');
      
      this.pestle=Array.from(sectorOccurrences2.values())
      this.pestlecount=Array.from(sectorOccurrences2.keys())
    }
    console.log(this.start_year_data,this.end_year_data);
    this.createPieChart()
      
    }

    

    








    private  countSectorOccurrences(data: any[],stringdata:string): Map<string, number>{
      const sectorCountMap = new Map<string, number>();
      for (const item of data) {
        let sector =  item[stringdata]
        
        
        if (typeof sector==='number' || typeof sector==='string'){ sector=sector.toString() 
          if (sector) { // Check for non-null and non-empty string
            if (sectorCountMap.has(sector)) {
              // Increment the count if the sector is already in the map
              sectorCountMap.set(sector, sectorCountMap.get(sector)! + 1);
            } else {
              // Initialize the count to 1 if the sector is encountered for the first time
              sectorCountMap.set(sector, 1);
            }
          }}
        // console.log(sector);
        
        
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
        let values=this.pestle
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
      return pieColor(this.pestle[index])
    })
    arcsel.append('text').attr('transform',(datum:any)=>{
      datum.innerRadius=0;
      datum.outerRadius=outerRadius;
      return 'translate(" + arc.centroid(datum) + ")';
    })
  }
   }
   
  

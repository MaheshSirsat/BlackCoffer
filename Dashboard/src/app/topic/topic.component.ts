import { Component, DoCheck, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnChanges {
  @Input() dataavailable:boolean=false;
  @Input() error:boolean=false
   @Input() errormessage:string=''
   @Input() data:any;
   topiccount:any[]=[]
   private  countSectorOccurrences(data: any[]): Map<string, number>{
    const sectorCountMap = new Map<string, number>();
    for (const item of data) {
      const topic = item.topic
      if (topic && topic.trim() !== "") { // Check for non-null and non-empty string
        if (sectorCountMap.has(topic)) {
          // Increment the count if the sector is already in the map
          sectorCountMap.set(topic, sectorCountMap.get(topic)! + 1);
        } else {
          // Initialize the count to 1 if the sector is encountered for the first time
          sectorCountMap.set(topic, 1);
        }
      }
    }
    return sectorCountMap;
  }
   ngOnChanges(changes: SimpleChanges): void {
    if(changes['dataavailable'].currentValue){
      const sectorOccurrences = this.countSectorOccurrences(this.data);
      for (const [topic, count] of sectorOccurrences.entries()) {
        console.log(`${topic}: ${count}`);
        this.topiccount.push({ topic, count })
      }
    }
    console.log(this.topiccount);
    }
   }
   



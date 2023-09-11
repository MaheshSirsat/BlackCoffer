import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountComponent } from './count/count.component';
import { SectorpieComponent } from './sectorpie/sectorpie.component';
import { TopicComponent } from './topic/topic.component';
import { SortdataComponent } from './sortdata/sortdata.component';
import { FormsModule } from '@angular/forms';
import { BarchartComponent } from './barchart/barchart.component';

@NgModule({
  declarations: [
    AppComponent,
    CountComponent,
    SectorpieComponent,
    TopicComponent,
    SortdataComponent,
    BarchartComponent
  ],
  imports: [
    BrowserModule,FormsModule,
    AppRoutingModule,HttpClientModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }

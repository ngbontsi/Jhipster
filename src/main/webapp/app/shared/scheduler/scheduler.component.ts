import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {DayPilotSchedulerComponent} from "daypilot-pro-angular";
import {DataService} from "./data.service";{}

@Component({
  selector: 'scheduler-component',
  template: `
  <div class="body">
    <h1>Schedule Report</h1>
    <daypilot-scheduler [config]="config" [events]="events" #scheduler1></daypilot-scheduler>
  </div>
  `,
  styles: [`
  .body {
    padding: 10px;
  }
  `]
})
export class SchedulerComponent implements AfterViewInit{
  
  @ViewChild("scheduler1")
  scheduler: DayPilotSchedulerComponent;
  events: any;

  config: any = {
    timeHeaders : [
      {groupBy: "Month", format: "MMMM yyyy"},
      {groupBy: "Day", format: "d"}
    ],
     eventHeight: 40,
    scale: "Day",
    days: 31,
    startDate: "2017-11-01",
    treeEnabled: true,
    onBeforeEventRender : (args) => {
      args.data.barColor = args.data.color;
    }
  };

  constructor(private ds: DataService) {}
  
  ngAfterViewInit(): void {
    this.ds.getResources().subscribe(result => this.config.resources = result);

    var from = this.scheduler.control.visibleStart();
    var to = this.scheduler.control.visibleEnd();
    this.ds.getEvents(from, to).subscribe(result => this.events = result);
  }



}
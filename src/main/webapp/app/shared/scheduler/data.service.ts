import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {DayPilot} from "daypilot-pro-angular";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class DataService {

  resources: any[] = [
    { name: "Group A", id: "GA", expanded: true, children: [
      { name: "Booked Rooms", id: "R1"},
      { name: "Available Rooms", id: "R2"}
    ]},
    { name: "Group B", id: "GB", expanded: true, children: [
      { name: "Available Events", id: "R3"},
      { name: "To do List", id: "R4"}
    ]}
  ];

  events: any[] = [
    {
      id: "1",
      resource: "R1",
      start: "2017-11-01",
      end: "2017-11-07",
      text: "Room 48 ",
      color: "#e69138"
    },
    {
      id: "2",
      resource: "R1",
      start: "2017-11-08",
      end: "2017-11-10",
      text: "Room 8",
      color: "#e69138"
    },
    {
      id: "3",
      resource: "R1",
      start: "2017-11-11",
      end: "2017-11-15",
      text: "Room 12",
      color: "#e69138"
    },
    {
      id: "4",
      resource: "R1",
      start: "2017-11-25",
      end: "2017-11-30",
      text: "Room 22",
      color: "#e69138"
    },
    {
      id: "5",
      resource: "R2",
      start: "2017-11-01",
      end: "2017-11-05",
      text: "Room 22",
      color: "#6aa84f"
    },
    {
      id: "6",
      resource: "R2",
      start: "2017-11-07",
      end: "2017-11-10",
      text: "Room 12",
      color: "#6aa84f"
    },
    {
      id: "7",
      resource: "R3",
      start: "2017-11-01",
      end: "2017-11-05",
      text: "Musical event",
      color: "#3c78d8"
    },
    {
      id: "8",
      resource: "R3",
      start: "2017-11-08",
      end: "2017-11-17",
      text: "Soccer Tornament",
      color: "#3c78d8"
    },
    {
      id: "9",
      resource: "R4",
      start: "2017-11-02",
      end: "2017-11-05",
      text: "Meeting with Marc",
      color: "#6aa84f"
    },
    {
      id: "10",
      resource: "R3",
      start: "2017-11-20",
      end: "2017-11-22",
      text: "Rugby Tornament",
      color: "#3c78d8"
    },
    {
      id: "11",
      resource: "R4",
      start: "2017-11-07",
      end: "2017-11-11",
      text: "Trip to Dubia",
      color: "#6aa84f"
    },
    {
      id: "12",
      resource: "R3",
      start: "2017-11-21",
      end: "2017-11-27",
      text: "Tennis Games",
      color: "#3c78d8"
    },
    {
      id: "13",
      resource: "R4",
      start: "2017-11-10",
      end: "2017-11-20",
      text: "Coming back Home",
      color: "#6aa84f"
    }
  ];

  constructor(private http : HttpClient){
  }

  getEvents(from: DayPilot.Date, to: DayPilot.Date): Observable<any[]> {

    // simulating an HTTP request
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.events);
      }, 200);
    });

    // return this.http.get("/api/events?from=" + from.toString() + "&to=" + to.toString());
  }

  getResources(): Observable<any[]> {

    // simulating an HTTP request
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.resources);
      }, 200);
    });

    // return this.http.get("/api/resources");
  }

}

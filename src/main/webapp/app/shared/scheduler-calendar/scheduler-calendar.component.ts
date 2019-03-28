import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { Subject } from 'rxjs';

import {
    endOfDay,
    addMonths,
} from 'date-fns';
import {
    SchedulerViewDay,
    SchedulerViewHour,
    SchedulerViewHourSegment,
    CalendarSchedulerEvent,
    CalendarSchedulerEventAction,
    startOfPeriod,
    endOfPeriod,
    addPeriod,
    subPeriod,
    SchedulerDateFormatter,
    SchedulerEventTimesChangedEvent
} from 'angular-calendar-scheduler';
import {
    CalendarView,
    CalendarDateFormatter,
    DateAdapter
} from 'angular-calendar';

import { SchedularCalendarService } from './scheduler-calendar.service';

@Component({
    selector: 'scheduler-calendar',
    templateUrl: './scheduler-calendar.component.html',
    styleUrls: ['./scheduler-calendar.style.scss'],
    providers: [{
        provide: CalendarDateFormatter,
        useClass: SchedulerDateFormatter
    }]
})
export class SchedulerCalendarComponent implements OnInit {
    title = 'Angular Calendar Scheduler Demo';

    CalendarView = CalendarView;

    view: CalendarView = CalendarView.Week;
    viewDate: Date = new Date();
    refresh: Subject<any> = new Subject();
    locale: string = 'en';
    weekStartsOn: number = 1;
    startsWithToday: boolean = true;
    activeDayIsOpen: boolean = true;
    excludeDays: number[] = []; // [0];
    dayStartHour: number = 6;
    dayEndHour: number = 22;

    minDate: Date = new Date();
    maxDate: Date = endOfDay(addMonths(new Date(), 1));
    dayModifier: Function;
    hourModifier: Function;
    segmentModifier: Function;
    eventModifier: Function;
    prevBtnDisabled: boolean = false;
    nextBtnDisabled: boolean = false;

    actions: CalendarSchedulerEventAction[] = [
        {
            when: 'enabled',
            label: '<span class="valign-center"><i class="material-icons md-18 md-red-500">cancel</i></span>',
            title: 'Delete',
            onClick: (event: CalendarSchedulerEvent): void => {
                console.log('Pressed action \'Delete\' on event ' + event.id);
            }
        },
        {
            when: 'disabled',
            label: '<span class="valign-center"><i class="material-icons md-18 md-red-500">autorenew</i></span>',
            title: 'Restore',
            onClick: (event: CalendarSchedulerEvent): void => {
                console.log('Pressed action \'Restore\' on event ' + event.id);
            }
        }
    ];

    events: CalendarSchedulerEvent[];

    constructor(@Inject(LOCALE_ID) locale: string, private appService: SchedularCalendarService, private dateAdapter: DateAdapter) {
        this.locale = locale;

        // this.dayModifier = ((day: SchedulerViewDay): void => {
        //     day.cssClass = this.isDateValid(day.date) ? '' : 'cal-disabled';
        // }).bind(this);
        // this.hourModifier = ((hour: SchedulerViewHour): void => {
        //     hour.cssClass = this.isDateValid(hour.date) ? '' : 'cal-disabled';
        // }).bind(this);
        this.segmentModifier = ((segment: SchedulerViewHourSegment): void => {
            segment.isDisabled = !this.isDateValid(segment.date);
        }).bind(this);

        this.eventModifier = ((event: CalendarSchedulerEvent): void => {
            event.isDisabled = !this.isDateValid(event.start);
        }).bind(this);

        this.dateOrViewChanged();
    }

    ngOnInit(): void {
        this.appService.getEvents(this.actions)
            .then((events: CalendarSchedulerEvent[]) => this.events = events);
    }

    changeDate(date: Date): void {
        console.log('changeDate', date);
        this.viewDate = date;
        this.dateOrViewChanged();
    }

    changeView(view: CalendarView): void {
        console.log('changeView', view);
        this.view = view;
        this.dateOrViewChanged();
    }

    dateOrViewChanged(): void {
        if (this.startsWithToday) {
            this.prevBtnDisabled = !this.isDateValid(subPeriod(this.dateAdapter, this.view, this.viewDate, 1));
            this.nextBtnDisabled = !this.isDateValid(addPeriod(this.dateAdapter, this.view, this.viewDate, 1));
        } else {
            this.prevBtnDisabled = !this.isDateValid(endOfPeriod(this.dateAdapter, this.view, subPeriod(this.dateAdapter, this.view, this.viewDate, 1)));
            this.nextBtnDisabled = !this.isDateValid(startOfPeriod(this.dateAdapter, this.view, addPeriod(this.dateAdapter, this.view, this.viewDate, 1)));
        }

        if (this.viewDate < this.minDate) {
            this.changeDate(this.minDate);
        } else if (this.viewDate > this.maxDate) {
            this.changeDate(this.maxDate);
        }
    }

    private isDateValid(date: Date): boolean {
        return /*isToday(date) ||*/ date >= this.minDate && date <= this.maxDate;
    }

    dayHeaderClicked(day: SchedulerViewDay): void {
        console.log('dayHeaderClicked Day', day);
    }

    hourClicked(hour: SchedulerViewHour): void {
        console.log('hourClicked Hour', hour);
    }

    segmentClicked(action: string, segment: SchedulerViewHourSegment): void {
        console.log('segmentClicked Action', action);
        console.log('segmentClicked Segment', segment);
    }

    eventClicked(action: string, event: CalendarSchedulerEvent): void {
        console.log('eventClicked Action', action);
        console.log('eventClicked Event', event);
    }

    eventTimesChanged({ event, newStart, newEnd, type }: SchedulerEventTimesChangedEvent): void {
        console.log('eventTimesChanged Type', type);
        console.log('eventTimesChanged Event', event);
        console.log('eventTimesChanged New Times', newStart, newEnd);
        const ev: CalendarSchedulerEvent = this.events.find(e => e.id === event.id);
        ev.start = newStart;
        ev.end = newEnd;
        this.refresh.next();
    }
}
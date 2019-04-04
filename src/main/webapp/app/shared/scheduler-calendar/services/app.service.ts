import { Injectable } from '@angular/core';
import {
    CalendarSchedulerEvent,
    CalendarSchedulerEventStatus,
    CalendarSchedulerEventAction
} from 'angular-calendar-scheduler';
import {
    addDays,
    startOfHour,
    addHours,
    setHours,
    subMinutes
} from 'date-fns';

@Injectable()
export class AppService {
    getEvents(actions: CalendarSchedulerEventAction[]): Promise<CalendarSchedulerEvent[]> {
        const events = [
            <CalendarSchedulerEvent>{
                id: '1',
                start: addDays(startOfHour(new Date()), 1),
                end: addDays(addHours(startOfHour(new Date()), 1), 1),
                title: 'Event 1',
                content: 'IMPORTANT EVENT',
                color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
                actions: actions,
                status: 'danger' as CalendarSchedulerEventStatus,
                isClickable: true,
                isDisabled: false,
                draggable: true,
                resizable: {
                    beforeStart: true,
                    afterEnd: true
                }
            },
            <CalendarSchedulerEvent>{
                id: '2',
                start: addDays(startOfHour(new Date()), 2),
                end: subMinutes(addDays(addHours(startOfHour(new Date()), 2), 2), 15),
                title: 'Event 2',
                content: 'LESS IMPORTANT EVENT',
                color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
                actions: actions,
                status: 'warning' as CalendarSchedulerEventStatus,
                isClickable: true,
                isDisabled: false
            },
            <CalendarSchedulerEvent>{
                id: '3',
                start: addDays(startOfHour(new Date()), 3),
                end: addDays(addHours(startOfHour(new Date()), 3), 3),
                title: 'Event 3',
                content: 'NOT IMPORTANT EVENT',
                color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
                actions: actions,
                status: 'ok' as CalendarSchedulerEventStatus,
                isClickable: true,
                isDisabled: false
            },
            <CalendarSchedulerEvent>{
                id: '4',
                start: startOfHour(addHours(new Date(), 2)),
                end: addHours(startOfHour(addHours(new Date(), 2)), 2),
                title: 'Event 4',
                content: 'TODAY EVENT',
                color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
                actions: actions,
                status: 'ok' as CalendarSchedulerEventStatus,
                isClickable: true,
                isDisabled: false
            },
            <CalendarSchedulerEvent>{
                id: '5',
                start: addDays(startOfHour(setHours(new Date(), 6)), 2),
                end: addHours(addDays(startOfHour(setHours(new Date(), 6)), 2), 1),
                title: 'Event 5',
                content: 'EARLY EVENT',
                color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
                actions: actions,
                status: 'ok' as CalendarSchedulerEventStatus,
                isClickable: true,
                isDisabled: false
            },
            <CalendarSchedulerEvent>{
                id: '6',
                start: startOfHour(setHours(new Date(), 22)),
                end: addHours(startOfHour(setHours(new Date(), 22)), 10),
                title: 'Event 6',
                content: 'TWO DAYS EVENT',
                color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
                actions: actions,
                status: 'ok' as CalendarSchedulerEventStatus,
                isClickable: true,
                isDisabled: false
            },
            <CalendarSchedulerEvent>{
                id: '7',
                start: addDays(startOfHour(setHours(new Date(), 14)), 4),
                end: addDays(addDays(startOfHour(setHours(new Date(), 14)), 4), 2),
                title: 'Event 7',
                content: 'THREE DAYS EVENT',
                color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
                actions: actions,
                status: 'ok' as CalendarSchedulerEventStatus,
                isClickable: true,
                isDisabled: false
            },
            <CalendarSchedulerEvent>{
                id: '8',
                start: startOfHour(addHours(new Date(), 2)),
                end: addHours(startOfHour(addHours(new Date(), 2)), 3),
                title: 'Event 8',
                content: 'CONCURRENT EVENT',
                color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
                actions: actions,
                status: 'ok' as CalendarSchedulerEventStatus,
                isClickable: true,
                isDisabled: false
            }
        ];

        return new Promise(resolve => setTimeout(() => resolve(events), 3000));
    }
}
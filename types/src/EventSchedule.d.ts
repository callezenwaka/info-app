import '../assets/event-schedule.css';
export interface Event {
    date: string;
    name: string;
}
export declare class EventSchedule {
    private element;
    private events;
    private currentDate;
    private selectedDate;
    constructor(element: HTMLElement, events: Event[]);
    private render;
    private createHeader;
    private createCalendarTable;
    private createNavigation;
    private getMonthAndYear;
    private getMonthDays;
    private hasEvent;
    private onDateClick;
    private showEvents;
    private previousMonth;
    private nextMonth;
}

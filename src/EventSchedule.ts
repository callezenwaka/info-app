// src/EventSchedule.ts

import '../assets/event-schedule.css';

export interface Event {
    date: string;
    name: string;
}

export class EventSchedule {
    private element: HTMLElement;
    private events: Event[];
    private currentDate: Date;
    private selectedDate: Date | null;

    constructor(element: HTMLElement, events: Event[]) {
        this.element = element;
        this.events = events;
        this.currentDate = new Date();
        this.selectedDate = null;
        this.render();
    }

    private render(): void {
        this.element.innerHTML = '';
        const calendar = document.createElement('div');
        calendar.className = 'event-schedule';

        const header = this.createHeader();
        const table = this.createCalendarTable();
        const navigation = this.createNavigation();

        calendar.appendChild(header);
        calendar.appendChild(table);
        calendar.appendChild(navigation);

        this.element.appendChild(calendar);
    }

    private createHeader(): HTMLElement {
        const header = document.createElement('h2');
        header.textContent = this.getMonthAndYear();
        return header;
    }

    private createCalendarTable(): HTMLElement {
        const table = document.createElement('table');
        table.className = 'event-schedule-table';

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
            const th = document.createElement('th');
            th.textContent = day;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        const monthDays = this.getMonthDays();
        for (let i = 0; i < monthDays.length; i += 7) {
            const row = document.createElement('tr');
            for (let j = i; j < i + 7; j++) {
                const cell = document.createElement('td');
                if (monthDays[j]) {
                    cell.textContent = monthDays[j].getDate().toString();
                    if (this.hasEvent(monthDays[j])) {
                        cell.classList.add('has-event');
                    }
                    cell.addEventListener('click', () => this.onDateClick(monthDays[j]));
                }
                row.appendChild(cell);
            }
            tbody.appendChild(row);
        }
        table.appendChild(tbody);

        return table;
    }

    private createNavigation(): HTMLElement {
        const nav = document.createElement('div');
        nav.className = 'event-schedule-nav';

        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.addEventListener('click', () => this.previousMonth());

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.addEventListener('click', () => this.nextMonth());

        nav.appendChild(prevButton);
        nav.appendChild(nextButton);

        return nav;
    }

    private getMonthAndYear(): string {
        return this.currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    }

    private getMonthDays(): Date[] {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        const days: Date[] = [];
        for (let i = 0; i < firstDay.getDay(); i++) {
            days.push(new Date(year, month, -firstDay.getDay() + i + 1));
        }
        for (let i = 1; i <= lastDay.getDate(); i++) {
            days.push(new Date(year, month, i));
        }
        const remainingDays = 7 - (days.length % 7);
        if (remainingDays < 7) {
            for (let i = 1; i <= remainingDays; i++) {
                days.push(new Date(year, month + 1, i));
            }
        }

        return days;
    }

    private hasEvent(date: Date): boolean {
        return this.events.some(event => {
            const eventDate = new Date(event.date);
            return eventDate.getDate() === date.getDate() &&
                eventDate.getMonth() === date.getMonth() &&
                eventDate.getFullYear() === date.getFullYear();
        });
    }

    private onDateClick(date: Date): void {
        this.selectedDate = date;
        this.showEvents();
    }

    private showEvents(): void {
        if (!this.selectedDate) return;

        const eventsForDay = this.events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.getDate() === this.selectedDate!.getDate() &&
                eventDate.getMonth() === this.selectedDate!.getMonth() &&
                eventDate.getFullYear() === this.selectedDate!.getFullYear();
        });

        const eventList = document.createElement('div');
        eventList.className = 'event-list';

        const title = document.createElement('h3');
        title.textContent = this.selectedDate.toLocaleDateString();
        eventList.appendChild(title);

        if (eventsForDay.length > 0) {
            const list = document.createElement('ul');
            eventsForDay.forEach(event => {
                const item = document.createElement('li');
                item.textContent = event.name;
                list.appendChild(item);
            });
            eventList.appendChild(list);
        } else {
            const noEvents = document.createElement('p');
            noEvents.textContent = 'No events for this day.';
            eventList.appendChild(noEvents);
        }

        const existingEventList = this.element.querySelector('.event-list');
        if (existingEventList) {
            this.element.removeChild(existingEventList);
        }
        this.element.appendChild(eventList);
    }

    private previousMonth(): void {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.render();
    }

    private nextMonth(): void {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.render();
    }
}
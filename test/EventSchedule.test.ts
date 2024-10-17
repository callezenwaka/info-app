// test/EventSchedule.test.ts

import { EventSchedule } from '../src/EventSchedule';

describe('EventSchedule', () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.removeChild(container);
    });

    it('should render the calendar', () => {
        const events = [
            { date: '2024-10-15', name: 'Meeting' },
            { date: '2024-10-20', name: 'Conference' }
        ];

        new EventSchedule(container, events);

        expect(container.querySelector('.event-schedule')).not.toBeNull();
        expect(container.querySelector('.event-schedule-table')).not.toBeNull();
        expect(container.querySelectorAll('.event-schedule-table th').length).toBe(7);
        expect(container.querySelector('.event-schedule-nav')).not.toBeNull();
    });

    it('should highlight days with events', () => {
        const events = [
            { date: new Date().toISOString().split('T')[0], name: 'Today\'s Event' }
        ];

        new EventSchedule(container, events);

        const today = new Date().getDate().toString();
        const eventCell = Array.from(container.querySelectorAll('td')).find(td => td.textContent === today);
        expect(eventCell?.classList.contains('has-event')).toBe(true);
    });

    it('should show event details when a date is clicked', () => {
        const events = [
            { date: new Date().toISOString().split('T')[0], name: 'Clicked Event' }
        ];

        new EventSchedule(container, events);

        const today = new Date().getDate().toString();
        const eventCell = Array.from(container.querySelectorAll('td')).find(td => td.textContent === today);
        eventCell?.click();

        expect(container.querySelector('.event-list')).not.toBeNull();
        expect(container.querySelector('.event-list li')?.textContent).toBe('Clicked Event');
    });
});
// README.md
# Vanilla Event Schedule

A lightweight, framework-agnostic event schedule component written in TypeScript.

## Installation

```bash
npm install vanilla-event-schedule
```

## Contribute
Run to start a development server with hot reloading
```
npm run dev
```

Run in the root folder to execute the tests
```
npm test
```

Built your package by running
```
npm run build
```

## Usage

```javascript
import { EventSchedule } from 'vanilla-event-schedule';

const element = document.getElementById('calendar');
const events = [
  { date: '2024-10-15', name: 'Meeting' },
  { date: '2024-10-20', name: 'Conference' }
];

const calendar = new EventSchedule(element, events);
```

Make sure to include some basic CSS to style the calendar:

## Usage

Import the CSS in your project:

```javascript
import 'kronicle/src/styles.css';
```

```css
.event-schedule-table {
  width: 100%;
  border-collapse: collapse;
}

.event-schedule-table th,
.event-schedule-table td {
  border: 1px solid #ccc;
  padding: 5px;
  text-align: center;
}

.event-schedule-table .has-event {
  background-color: #e6f3ff;
  cursor: pointer;
}

.event-schedule-nav {
  margin-top: 10px;
}

.event-schedule-nav button {
  margin: 0 5px;
}

.event-list {
  margin-top: 20px;
}
```

## API

### `EventSchedule`

#### Constructor

```typescript
constructor(element: HTMLElement, events: Event[])
```

- `element`: The HTML element where the calendar will be rendered.
- `events`: An array of event objects with `date` and `name` properties.

## License

MIT
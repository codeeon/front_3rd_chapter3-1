import { http, HttpResponse } from 'msw';

import { Event } from '../types';
import { events } from './response/events.json' assert { type: 'json' };
import { createNewId } from '../__tests__/utils';

let eventList: Event[] = [...(events as Event[])];

// ! HARD
// ! 각 응답에 대한 MSW 핸들러를 작성해주세요. GET 요청은 이미 작성되어 있는 events json을 활용해주세요.
export const handlers = [
  http.get('/api/events', () => {
    return HttpResponse.json({ events: eventList });
  }),

  http.post('/api/events', async ({ request }) => {
    const event = (await request.json()) as Event | Omit<Event, 'id'>;

    const newId = createNewId(eventList as Event[]);

    const newEvent = {
      ...event,
      id: newId,
    };

    eventList = [...eventList, newEvent];

    return HttpResponse.json(
      eventList.find((event) => event.id === newEvent.id),
      { status: 201 }
    );
  }),

  http.put('/api/events/:id', async ({ params, request }) => {
    const { id } = params;

    const updates = (await request.json()) as Event;

    if (!id || !eventList.find((event) => event.id === id)) {
      return new HttpResponse(null, { status: 404 });
    }

    eventList = eventList.map((event) => (event.id === id ? { ...event, ...updates } : event));

    return HttpResponse.json(
      eventList.find((event) => event.id === id),
      { status: 200 }
    );
  }),

  http.delete('/api/events/:id', ({ params }) => {
    const { id } = params;

    eventList = eventList.filter((event) => event.id !== id);

    return new HttpResponse(null, { status: 204 });
  }),
];

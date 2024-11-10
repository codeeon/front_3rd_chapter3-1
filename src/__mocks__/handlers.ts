import { http, HttpResponse } from 'msw';
import { Event } from '../types';
import { events } from './response/events.json' assert { type: 'json' };
import { createNewId } from '../__tests__/utils';

export const createEventHandlers = (initialEvents: Event[] = [...(events as Event[])]) => {
  let eventList = [...initialEvents];

  return {
    handlers: [
      http.get('/api/events', () => {
        return HttpResponse.json({ events: eventList });
      }),

      http.post('/api/events', async ({ request }) => {
        const event = (await request.json()) as Event | Omit<Event, 'id'>;
        const newId = createNewId(eventList);
        const newEvent = { ...event, id: newId };
        eventList = [...eventList, newEvent];
        return HttpResponse.json(newEvent, { status: 201 });
      }),

      http.put('/api/events/:id', async ({ params, request }) => {
        const { id } = params;
        const updates = (await request.json()) as Event;

        if (!id || !eventList.find((event) => event.id === id)) {
          return new HttpResponse(null, { status: 404 });
        }

        eventList = eventList.map((event) => 
          event.id === updates.id ? updates : event
        );

        return HttpResponse.json(updates, { status: 200 });
      }),

      http.delete('/api/events/:id', ({ params }) => {
        const { id } = params;
        eventList = eventList.filter((event) => event.id !== id);
        return new HttpResponse(null, { status: 204 });
      }),
    ],
  };
};

export const handlers = createEventHandlers().handlers;

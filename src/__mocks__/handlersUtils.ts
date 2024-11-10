import { http, HttpResponse } from 'msw';

import { Event } from '../types';
import { events } from './response/events.json' assert { type: 'json' };
import { createNewId, deleteData } from '../__tests__/utils';
import { server } from '../setupTests';

// ! Hard
// ! 이벤트는 생성, 수정 되면 fetch를 다시 해 상태를 업데이트 합니다. 이를 위한 제어가 필요할 것 같은데요. 어떻게 작성해야 테스트가 병렬로 돌아도 안정적이게 동작할까요?
// ! 아래 이름을 사용하지 않아도 되니, 독립적이게 테스트를 구동할 수 있는 방법을 찾아보세요. 그리고 이 로직을 PR에 설명해주세요.

const createMockEventState = (initialEvents: Event[] = [...(events as Event[])]) => {
  let eventList = [...initialEvents];
  return {
    getEvents: () => eventList,
    setEvents: (newEvents: Event[]) => {
      eventList = [...newEvents];
    },
    addEvent: (event: Event) => {
      eventList = [...eventList, event];
    },
    updateEvent: (updatedEvent: Event) => {
      eventList = eventList.map((event) => (event.id === updatedEvent.id ? updatedEvent : event));
    },
    deleteEvent: (id: string) => {
      eventList = deleteData(eventList, id);
    },
  };
};

export const setupMockHandlerCreation = (initEvents = [] as Event[]) => {
  const eventState = createMockEventState(initEvents);

  return {
    setup: () => {
      server.use(
        http.post('/api/events', async ({ request }) => {
          const event = (await request.json()) as Event;
          const newId = createNewId(eventState.getEvents());
          const newEvent = { ...event, id: newId };
          eventState.addEvent(newEvent);
          return HttpResponse.json(newEvent, { status: 201 });
        }),
        http.get('/api/events', () => {
          return HttpResponse.json({ events: eventState.getEvents() });
        })
      );
    },
  };
};

export const setupMockHandlerUpdating = (initEvents = [] as Event[]) => {
  const eventState = createMockEventState(initEvents);

  return {
    setup: () => {
      server.use(
        http.put('/api/events/:id', async ({ params, request }) => {
          const { id } = params;
          const updates = (await request.json()) as Event;

          if (!id || !eventState.getEvents().find((event) => event.id === id)) {
            return new HttpResponse(null, { status: 404 });
          }

          eventState.updateEvent(updates);
          return HttpResponse.json(updates, { status: 200 });
        }),
        http.get('/api/events', () => {
          return HttpResponse.json({ events: eventState.getEvents() });
        })
      );
    },
  };
};

export const setupMockHandlerDeletion = (initEvents = [] as Event[]) => {
  const eventState = createMockEventState(initEvents);

  return {
    setup: () => {
      server.use(
        http.delete('/api/events/:id', ({ params }) => {
          const { id } = params;
          eventState.deleteEvent(id as Event['id']);
          return new HttpResponse(null, { status: 204 });
        }),
        http.get('/api/events', () => {
          return HttpResponse.json({ events: eventState.getEvents() });
        })
      );
    },
  };
};

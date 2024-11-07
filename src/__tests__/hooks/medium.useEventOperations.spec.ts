import { useToast } from '@chakra-ui/react';
import { act, renderHook, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { Mock } from 'vitest';

import {
  setupMockHandlerCreation,
  setupMockHandlerDeletion,
  setupMockHandlerUpdating,
} from '../../__mocks__/handlersUtils.ts';
import { useEventOperations } from '../../hooks/useEventOperations.ts';
import { server } from '../../setupTests.ts';
import type { Event } from '../../types.ts';
import { createNewId, deleteData, sortEventList } from '../utils.ts';

vi.mock('@chakra-ui/react', () => ({
  ...vi.importActual('@chakra-ui/react'),
  useToast: vi.fn(() => () => {}),
}));

describe('useEventOperations', () => {
  beforeEach(() => {
    server.resetHandlers();
    setupMockHandlerCreation();
    setupMockHandlerUpdating();
    setupMockHandlerDeletion();
  });

  it('저장되어있는 초기 이벤트 데이터를 적절하게 불러온다', async () => {
    const { result } = renderHook(() => useEventOperations(false));

    await act(async () => {
      await result.current.fetchEvents();
    });

    expect(result.current.events).toEqual([
      {
        id: '1',
        title: '기존 회의',
        date: '2024-10-15',
        startTime: '09:00',
        endTime: '10:00',
        description: '기존 팀 미팅',
        location: '회의실 B',
        category: '업무',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 10,
      },
    ]);
  });

  it('정의된 이벤트 정보를 기준으로 적절하게 저장이 된다', async () => {
    const mockNewEvent: Event = {
      id: '0',
      title: '새 회의',
      date: '2024-10-16',
      startTime: '09:00',
      endTime: '10:00',
      description: '새로운 팀 미팅',
      location: '회의실 C',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    };

    const { result } = renderHook(() => useEventOperations(false));

    await act(async () => {
      await result.current.fetchEvents();
    });

    const initialEvents = result.current.events;
    const newId = createNewId(initialEvents);

    await act(async () => {
      await result.current.saveEvent(mockNewEvent);
    });

    expect(result.current.events).toEqual([
      ...initialEvents,
      {
        ...mockNewEvent,
        id: newId,
      },
    ]);
  });

  it("새로 정의된 'title', 'endTime' 기준으로 적절하게 일정이 업데이트 된다", async () => {
    const { result } = renderHook(() => useEventOperations(true));

    await waitFor(async () => {
      await result.current.fetchEvents();
    });

    const initialEvents: Event[] = result.current.events;

    const targetEventId = initialEvents[0]?.id ?? '1';

    const targetEvent: Event = initialEvents.find((event) => event.id === targetEventId) as Event;

    const mockUpdatedEventInfo: Partial<Event> = {
      title: '기존 회의(수정됨)',
      endTime: '11:00',
    };

    const mockUpdatedEvent: Event = {
      ...targetEvent,
      ...mockUpdatedEventInfo,
    };

    const restEvents = deleteData(initialEvents, targetEventId);

    await act(async () => {
      await result.current.saveEvent({ ...mockUpdatedEvent });
    });

    const sortedUpdatedEvents = sortEventList(result.current.events);
    const sortedExpectedEvents = sortEventList([...restEvents, mockUpdatedEvent]);

    await waitFor(() => {
      expect(sortedUpdatedEvents).toEqual(sortedExpectedEvents);
    });
  });

  it('존재하는 이벤트 삭제 시 에러없이 아이템이 삭제된다.', async () => {
    const { result } = renderHook(() => useEventOperations(true));

    await waitFor(async () => {
      await result.current.fetchEvents();
    });

    const initialEvents = result.current.events;
    const testId = '1';

    await act(async () => {
      await result.current.deleteEvent(testId);
    });

    await waitFor(() => {
      expect(result.current.events).toEqual(deleteData(initialEvents, testId));
    });
  });

  it("이벤트 로딩 실패 시 '이벤트 로딩 실패'라는 텍스트와 함께 에러 토스트가 표시되어야 한다", async () => {
    server.use(
      http.get('/api/events', () =>
        HttpResponse.json({ error: 'Failed to load events' }, { status: 500 })
      )
    );

    const mockToast = vi.fn();
    (useToast as Mock).mockReturnValue(mockToast);

    const { result } = renderHook(() => useEventOperations(false));

    await result.current.fetchEvents();

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: '이벤트 로딩 실패',
          status: 'error',
        })
      );
    });
  });

  it("존재하지 않는 이벤트 수정 시 '일정 저장 실패'라는 토스트가 노출되며 에러 처리가 되어야 한다", async () => {
    const mockToast = vi.fn();
    (useToast as Mock).mockReturnValue(mockToast);

    const { result } = renderHook(() => useEventOperations(true));

    await act(async () => {
      await result.current.saveEvent({ title: '테스트' } as Event);
    });

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: '일정 저장 실패',
          status: 'error',
        })
      );
    });
  });

  it("네트워크 오류 시 '일정 삭제 실패'라는 텍스트가 노출되며 이벤트 삭제가 실패해야 한다", async () => {
    server.use(
      http.delete('/api/events/:id', () =>
        HttpResponse.json({ error: 'Failed to delete event' }, { status: 500 })
      )
    );

    const mockToast = vi.fn();
    (useToast as Mock).mockReturnValue(mockToast);

    const { result } = renderHook(() => useEventOperations(true));

    await act(async () => {
      await result.current.deleteEvent('1');
    });

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: '일정 삭제 실패',
          status: 'error',
        })
      );
    });
  });
});

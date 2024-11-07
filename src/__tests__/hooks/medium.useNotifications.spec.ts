import { act, renderHook } from '@testing-library/react';

import { useNotifications } from '../../hooks/useNotifications.ts';
import { Event } from '../../types.ts';
import { formatDate } from '../../utils/dateUtils.ts';
import { parseHM } from '../utils.ts';

beforeEach(() => {
  // tell vitest we use mocked time
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2024-10-01'));
});

afterEach(() => {
  // restoring date after each test run
  vi.useRealTimers();
});

it('초기 상태에서는 알림이 없어야 한다', () => {
  const events: Event[] = [
    {
      id: '1',
      title: '기존 회의',
      date: '2024-10-01',
      startTime: '00:10',
      endTime: '10:00',
      description: '기존 팀 미팅',
      location: '회의실 B',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    },
  ];

  const { result } = renderHook(() => useNotifications(events));

  expect(result.current.notifications).toEqual([]);
});

it('지정된 시간이 된 경우 알림이 새롭게 생성되어 추가된다', () => {
  const events: Event[] = [
    {
      id: '1',
      title: '기존 회의',
      date: '2024-10-01',
      startTime: '00:10',
      endTime: '10:00',
      description: '기존 팀 미팅',
      location: '회의실 B',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    },
  ];

  const { result } = renderHook(() => useNotifications(events));

  act(() => {
    vi.setSystemTime(new Date('2024-10-01T00:00:00'));
    vi.advanceTimersByTime(1000);
  });

  expect(result.current.notifications).toEqual([
    {
      id: '1',
      message: '10분 후 기존 회의 일정이 시작됩니다.',
    },
  ]);
  expect(result.current.notifiedEvents).toEqual(['1']);
});

it('index를 기준으로 알림을 적절하게 제거할 수 있다', () => {
  const events: Event[] = [
    {
      id: '3',
      title: '회의 1',
      date: '2024-10-01',
      startTime: '00:11',
      endTime: '10:00',
      description: '팀 미팅 1',
      location: '회의실 A',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    },
    {
      id: '4',
      title: '회의 2',
      date: '2024-10-01',
      startTime: '00:12',
      endTime: '11:00',
      description: '팀 미팅 2',
      location: '회의실 B',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    },
  ];

  const { result } = renderHook(() => useNotifications(events));

  act(() => {
    vi.setSystemTime(new Date('2024-10-01T00:01:00'));
    vi.advanceTimersByTime(1000);
  });

  act(() => {
    vi.setSystemTime(new Date('2024-10-01T00:02:00'));
    vi.advanceTimersByTime(1000);
  });

  expect(result.current.notifications.length).toBe(2);
  expect(result.current.notifiedEvents).toEqual(['3', '4']);

  act(() => {
    result.current.removeNotification(0);
  });

  expect(result.current.notifications.length).toBe(1);
  expect(result.current.notifications[0].id).toBe('4');
});

it('이미 알림이 발생한 이벤트에 대해서는 중복 알림이 발생하지 않아야 한다', () => {
  const events: Event[] = [
    {
      id: '3',
      title: '회의 1',
      date: '2024-10-01',
      startTime: '00:11',
      endTime: '10:00',
      description: '팀 미팅 1',
      location: '회의실 A',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    },
  ];

  const { result } = renderHook(() => useNotifications(events));

  act(() => {
    vi.setSystemTime(new Date('2024-10-01T00:01:00'));
    vi.advanceTimersByTime(1000);
  });

  expect(result.current.notifications.length).toBe(1);
  expect(result.current.notifiedEvents).toEqual(['3']);

  act(() => {
    vi.setSystemTime(new Date('2024-10-01T00:02:00'));
    vi.advanceTimersByTime(1000);
  });

  expect(result.current.notifications.length).toBe(1);
  expect(result.current.notifiedEvents).toEqual(['3']);
});

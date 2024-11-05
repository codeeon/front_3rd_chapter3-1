import { act, renderHook } from '@testing-library/react';

import { useSearch } from '../../hooks/useSearch.ts';
import { Event } from '../../types.ts';

const eventList: Event[] = [
  {
    id: '1',
    date: '2024-06-29',
    title: 'event 1',
    startTime: '09:00',
    endTime: '10:00',
    description: 'event 1 description',
    location: 'event 1 location',
    category: 'event 1 category',
    repeat: { type: 'none', interval: 1 },
    notificationTime: 1,
  },
  {
    id: '2',
    date: '2024-07-03',
    title: 'event 2',
    startTime: '10:00',
    endTime: '12:00',
    description: 'event 2 description',
    location: 'event 2 location',
    category: 'event 2 category',
    repeat: { type: 'none', interval: 1 },
    notificationTime: 1,
  },
  {
    id: '3',
    date: '2024-08-01',
    title: 'event 3',
    startTime: '11:00',
    endTime: '12:00',
    description: 'event 3 description',
    location: 'event 3 location',
    category: 'event 3 category',
    repeat: { type: 'none', interval: 1 },
    notificationTime: 1,
  },
  {
    id: '4',
    date: '2024-07-04',
    title: 'event 4',
    startTime: '13:00',
    endTime: '14:00',
    description: 'event 4 description',
    location: 'event 4 location',
    category: 'event 4 category',
    repeat: { type: 'none', interval: 1 },
    notificationTime: 1,
  },
  {
    id: '5',
    date: '2024-07-14',
    title: 'event 5',
    startTime: '15:00',
    endTime: '16:00',
    description: 'event 5 description',
    location: 'event 5 location',
    category: 'event 5 category',
    repeat: { type: 'none', interval: 1 },
    notificationTime: 1,
  },
  {
    id: '6',
    date: '2024-06-30',
    title: '이벤트 6',
    startTime: '09:00:30',
    endTime: '10:00',
    description: '이벤트 6 description',
    location: '이벤트 6 location',
    category: '이벤트 6 category',
    repeat: { type: 'none', interval: 1 },
    notificationTime: 1,
  },
];

it('검색어가 비어있을 때 모든 이벤트를 반환해야 한다', () => {
  const { result } = renderHook(() => useSearch(eventList, new Date('2024-06-30'), 'month'));

  expect(result.current.filteredEvents).toEqual([
    {
      id: '1',
      date: '2024-06-29',
      title: 'event 1',
      startTime: '09:00',
      endTime: '10:00',
      description: 'event 1 description',
      location: 'event 1 location',
      category: 'event 1 category',
      repeat: { type: 'none', interval: 1 },
      notificationTime: 1,
    },
    {
      id: '6',
      date: '2024-06-30',
      title: '이벤트 6',
      startTime: '09:00:30',
      endTime: '10:00',
      description: '이벤트 6 description',
      location: '이벤트 6 location',
      category: '이벤트 6 category',
      repeat: { type: 'none', interval: 1 },
      notificationTime: 1,
    },
  ]);
});

it('검색어에 맞는 이벤트만 필터링해야 한다', () => {
  const { result } = renderHook(() => useSearch(eventList, new Date('2024-06-30'), 'month'));

  act(() => {
    result.current.setSearchTerm('event 1');
  });

  expect(result.current.filteredEvents).toEqual([
    {
      id: '1',
      date: '2024-06-29',
      title: 'event 1',
      startTime: '09:00',
      endTime: '10:00',
      description: 'event 1 description',
      location: 'event 1 location',
      category: 'event 1 category',
      repeat: { type: 'none', interval: 1 },
      notificationTime: 1,
    },
  ]);
});

it('검색어가 제목, 설명, 위치 중 하나라도 일치하면 해당 이벤트를 반환해야 한다', () => {
  const { result } = renderHook(() => useSearch(eventList, new Date('2024-06-30'), 'month'));

  act(() => {
    result.current.setSearchTerm('6 description');
  });

  expect(result.current.filteredEvents).toEqual([
    {
      id: '6',
      date: '2024-06-30',
      title: '이벤트 6',
      startTime: '09:00:30',
      endTime: '10:00',
      description: '이벤트 6 description',
      location: '이벤트 6 location',
      category: '이벤트 6 category',
      repeat: { type: 'none', interval: 1 },
      notificationTime: 1,
    },
  ]);
});

it('현재 뷰(주간/월간)에 해당하는 이벤트만 반환해야 한다', () => {
  const { result } = renderHook(() => useSearch(eventList, new Date('2024-06-30'), 'week'));

  expect(result.current.filteredEvents).toEqual([
    {
      id: '2',
      date: '2024-07-03',
      title: 'event 2',
      startTime: '10:00',
      endTime: '12:00',
      description: 'event 2 description',
      location: 'event 2 location',
      category: 'event 2 category',
      repeat: { type: 'none', interval: 1 },
      notificationTime: 1,
    },
    {
      id: '4',
      date: '2024-07-04',
      title: 'event 4',
      startTime: '13:00',
      endTime: '14:00',
      description: 'event 4 description',
      location: 'event 4 location',
      category: 'event 4 category',
      repeat: { type: 'none', interval: 1 },
      notificationTime: 1,
    },
    {
      id: '6',
      date: '2024-06-30',
      title: '이벤트 6',
      startTime: '09:00:30',
      endTime: '10:00',
      description: '이벤트 6 description',
      location: '이벤트 6 location',
      category: '이벤트 6 category',
      repeat: { type: 'none', interval: 1 },
      notificationTime: 1,
    },
  ]);
});

it("검색어를 '회의'에서 '점심'으로 변경하면 필터링된 결과가 즉시 업데이트되어야 한다", () => {
  const eventList: Event[] = [
    {
      id: '1',
      date: '2024-06-29',
      title: 'event 1',
      startTime: '09:00',
      endTime: '10:00',
      description: 'event 1 description',
      location: 'event 1 location',
      category: 'event 1 category',
      repeat: { type: 'none', interval: 1 },
      notificationTime: 1,
    },
    {
      id: '2',
      date: '2024-07-03',
      title: 'event 2',
      startTime: '10:00',
      endTime: '12:00',
      description: 'event 2 회의',
      location: 'event 2 location',
      category: 'event 2 category',
      repeat: { type: 'none', interval: 1 },
      notificationTime: 1,
    },
    {
      id: '3',
      date: '2024-08-01',
      title: 'event 3',
      startTime: '11:00',
      endTime: '12:00',
      description: 'event 3 description',
      location: 'event 3 location',
      category: 'event 3 category',
      repeat: { type: 'none', interval: 1 },
      notificationTime: 1,
    },
    {
      id: '4',
      date: '2024-07-04',
      title: 'event 4',
      startTime: '13:00',
      endTime: '14:00',
      description: 'event 4 점심',
      location: 'event 4 location',
      category: 'event 4 category',
      repeat: { type: 'none', interval: 1 },
      notificationTime: 1,
    },
    {
      id: '5',
      date: '2024-07-14',
      title: 'event 5',
      startTime: '15:00',
      endTime: '16:00',
      description: 'event 5 회의',
      location: 'event 5 location',
      category: 'event 5 category',
      repeat: { type: 'none', interval: 1 },
      notificationTime: 1,
    },
    {
      id: '6',
      date: '2024-06-30',
      title: '이벤트 6',
      startTime: '09:00:30',
      endTime: '10:00',
      description: '이벤트 6 description',
      location: '이벤트 6 location',
      category: '이벤트 6 category',
      repeat: { type: 'none', interval: 1 },
      notificationTime: 1,
    },
  ];

  const { result } = renderHook(() => useSearch(eventList, new Date('2024-07-31'), 'month'));

  act(() => {
    result.current.setSearchTerm('점심');
  });

  expect(result.current.filteredEvents).toEqual([
    {
      id: '4',
      date: '2024-07-04',
      title: 'event 4',
      startTime: '13:00',
      endTime: '14:00',
      description: 'event 4 점심',
      location: 'event 4 location',
      category: 'event 4 category',
      repeat: { type: 'none', interval: 1 },
      notificationTime: 1,
    },
  ]);

  act(() => {
    result.current.setSearchTerm('회의');
  });

  expect(result.current.filteredEvents).toEqual([
    {
      id: '2',
      date: '2024-07-03',
      title: 'event 2',
      startTime: '10:00',
      endTime: '12:00',
      description: 'event 2 회의',
      location: 'event 2 location',
      category: 'event 2 category',
      repeat: { type: 'none', interval: 1 },
      notificationTime: 1,
    },
    {
      id: '5',
      date: '2024-07-14',
      title: 'event 5',
      startTime: '15:00',
      endTime: '16:00',
      description: 'event 5 회의',
      location: 'event 5 location',
      category: 'event 5 category',
      repeat: { type: 'none', interval: 1 },
      notificationTime: 1,
    },
  ]);
});

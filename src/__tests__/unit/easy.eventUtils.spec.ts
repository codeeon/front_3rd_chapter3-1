import { Event } from '../../types';
import { getFilteredEvents } from '../../utils/eventUtils';

describe('getFilteredEvents', () => {
  it("검색어 '이벤트 2'에 맞는 이벤트만 반환한다", () => {
    const eventList: Event[] = [
      {
        id: '1',
        date: '2024-11-01',
        title: '이벤트 1',
        startTime: '09:00',
        endTime: '10:00',
        description: '이벤트 1 description',
        location: '이벤트 1 location',
        category: '이벤트 1 category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 1,
      },
      {
        id: '2',
        date: '2024-11-03',
        title: '이벤트 2',
        startTime: '10:00',
        endTime: '12:00',
        description: '이벤트 2 description',
        location: '이벤트 2 location',
        category: '이벤트 2 category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 1,
      },
      {
        id: '3',
        date: '2024-11-01',
        title: '이벤트 3',
        startTime: '11:00',
        endTime: '12:00',
        description: '이벤트 3 description',
        location: '이벤트 3 location',
        category: '이벤트 3 category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 1,
      },
      {
        id: '4',
        date: '2024-11-04',
        title: '이벤트 4',
        startTime: '13:00',
        endTime: '14:00',
        description: '이벤트 4 description',
        location: '이벤트 4 location',
        category: '이벤트 4 category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 1,
      },
      {
        id: '5',
        date: '2024-11-04',
        title: '이벤트 5',
        startTime: '15:00',
        endTime: '16:00',
        description: '이벤트 5 description',
        location: '이벤트 5 location',
        category: '이벤트 5 category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 1,
      },
    ];

    const result = getFilteredEvents(eventList, '이벤트 2', new Date('2024-11-05'), 'week');

    expect(result).toEqual([
      {
        id: '2',
        date: '2024-11-03',
        title: '이벤트 2',
        startTime: '10:00',
        endTime: '12:00',
        description: '이벤트 2 description',
        location: '이벤트 2 location',
        category: '이벤트 2 category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 1,
      },
    ]);
  });

  it('주간 뷰에서 2024-07-01 주의 이벤트만 반환한다', () => {
    const eventList: Event[] = [
      {
        id: '1',
        date: '2024-06-29',
        title: '이벤트 1',
        startTime: '09:00',
        endTime: '10:00',
        description: '이벤트 1 description',
        location: '이벤트 1 location',
        category: '이벤트 1 category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 1,
      },
      {
        id: '2',
        date: '2024-07-03',
        title: '이벤트 2',
        startTime: '10:00',
        endTime: '12:00',
        description: '이벤트 2 description',
        location: '이벤트 2 location',
        category: '이벤트 2 category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 1,
      },
      {
        id: '3',
        date: '2024-08-01',
        title: '이벤트 3',
        startTime: '11:00',
        endTime: '12:00',
        description: '이벤트 3 description',
        location: '이벤트 3 location',
        category: '이벤트 3 category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 1,
      },
      {
        id: '4',
        date: '2024-07-04',
        title: '이벤트 4',
        startTime: '13:00',
        endTime: '14:00',
        description: '이벤트 4 description',
        location: '이벤트 4 location',
        category: '이벤트 4 category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 1,
      },
      {
        id: '5',
        date: '2024-07-14',
        title: '이벤트 5',
        startTime: '15:00',
        endTime: '16:00',
        description: '이벤트 5 description',
        location: '이벤트 5 location',
        category: '이벤트 5 category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 1,
      },
      {
        id: '6',
        date: '2024-06-30',
        title: '이벤트 6',
        startTime: '09:00',
        endTime: '10:00',
        description: '이벤트 6 description',
        location: '이벤트 6 location',
        category: '이벤트 6 category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 1,
      },
    ];

    const result = getFilteredEvents(eventList, '', new Date('2024-07-01'), 'week');

    expect(result).toEqual([
      {
        id: '2',
        date: '2024-07-03',
        title: '이벤트 2',
        startTime: '10:00',
        endTime: '12:00',
        description: '이벤트 2 description',
        location: '이벤트 2 location',
        category: '이벤트 2 category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 1,
      },
      {
        id: '4',
        date: '2024-07-04',
        title: '이벤트 4',
        startTime: '13:00',
        endTime: '14:00',
        description: '이벤트 4 description',
        location: '이벤트 4 location',
        category: '이벤트 4 category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 1,
      },
      {
        id: '6',
        date: '2024-06-30',
        title: '이벤트 6',
        startTime: '09:00',
        endTime: '10:00',
        description: '이벤트 6 description',
        location: '이벤트 6 location',
        category: '이벤트 6 category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 1,
      },
    ]);
  });

  it('월간 뷰에서 2024년 7월의 모든 이벤트를 반환한다', () => {
    const eventList: Event[] = [
      {
        id: '1',
        date: '2024-06-29',
        title: '이벤트 1',
        startTime: '09:00',
        endTime: '10:00',
        description: '이벤트 1 description',
        location: '이벤트 1 location',
        category: '이벤트 1 category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 1,
      },
      {
        id: '2',
        date: '2024-07-03',
        title: '이벤트 2',
        startTime: '10:00',
        endTime: '12:00',
        description: '이벤트 2 description',
        location: '이벤트 2 location',
        category: '이벤트 2 category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 1,
      },
      {
        id: '3',
        date: '2024-08-01',
        title: '이벤트 3',
        startTime: '11:00',
        endTime: '12:00',
        description: '이벤트 3 description',
        location: '이벤트 3 location',
        category: '이벤트 3 category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 1,
      },
      {
        id: '4',
        date: '2024-07-04',
        title: '이벤트 4',
        startTime: '13:00',
        endTime: '14:00',
        description: '이벤트 4 description',
        location: '이벤트 4 location',
        category: '이벤트 4 category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 1,
      },
      {
        id: '5',
        date: '2024-07-14',
        title: '이벤트 5',
        startTime: '15:00',
        endTime: '16:00',
        description: '이벤트 5 description',
        location: '이벤트 5 location',
        category: '이벤트 5 category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 1,
      },
      {
        id: '6',
        date: '2024-06-30',
        title: '이벤트 6',
        startTime: '09:00',
        endTime: '10:00',
        description: '이벤트 6 description',
        location: '이벤트 6 location',
        category: '이벤트 6 category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 1,
      },
    ];

    const result = getFilteredEvents(eventList, '', new Date('2024-07-31'), 'month');

    expect(result).toEqual([
      {
        id: '2',
        date: '2024-07-03',
        title: '이벤트 2',
        startTime: '10:00',
        endTime: '12:00',
        description: '이벤트 2 description',
        location: '이벤트 2 location',
        category: '이벤트 2 category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 1,
      },
      {
        id: '4',
        date: '2024-07-04',
        title: '이벤트 4',
        startTime: '13:00',
        endTime: '14:00',
        description: '이벤트 4 description',
        location: '이벤트 4 location',
        category: '이벤트 4 category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 1,
      },
      {
        id: '5',
        date: '2024-07-14',
        title: '이벤트 5',
        startTime: '15:00',
        endTime: '16:00',
        description: '이벤트 5 description',
        location: '이벤트 5 location',
        category: '이벤트 5 category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 1,
      },
    ]);
  });

  it("검색어 '이벤트'와 주간 뷰 필터링을 동시에 적용한다", () => {
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
        startTime: '09:00',
        endTime: '10:00',
        description: '이벤트 6 description',
        location: '이벤트 6 location',
        category: '이벤트 6 category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 1,
      },
    ];

    const result = getFilteredEvents(eventList, '이벤트', new Date('2024-07-01'), 'week');

    expect(result).toEqual([
      {
        id: '6',
        date: '2024-06-30',
        title: '이벤트 6',
        startTime: '09:00',
        endTime: '10:00',
        description: '이벤트 6 description',
        location: '이벤트 6 location',
        category: '이벤트 6 category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 1,
      },
    ]);
  });

  describe('검색어가 없을 때 모든 이벤트를 반환한다', () => {
    it.each(['week', 'month'] as const)('%s 뷰에서 해당하는 모든 이벤트를 반환한다', (view) => {
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
          startTime: '09:00',
          endTime: '10:00',
          description: '이벤트 6 description',
          location: '이벤트 6 location',
          category: '이벤트 6 category',
          repeat: { type: 'none', interval: 1 },
          notificationTime: 1,
        },
      ];

      const result = getFilteredEvents(eventList, '', new Date('2024-07-01'), view);

      const expectArray =
        view === 'week'
          ? [
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
                startTime: '09:00',
                endTime: '10:00',
                description: '이벤트 6 description',
                location: '이벤트 6 location',
                category: '이벤트 6 category',
                repeat: { type: 'none', interval: 1 },
                notificationTime: 1,
              },
            ]
          : [
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
            ];

      expect(result).toEqual(expectArray);
    });
  });

  it('검색어가 대소문자를 구분하지 않고 작동한다', () => {
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
        startTime: '09:00',
        endTime: '10:00',
        description: '이벤트 6 description',
        location: '이벤트 6 location',
        category: '이벤트 6 category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 1,
      },
      {
        id: '7',
        date: '2024-07-31',
        title: '이벤트 7',
        startTime: '09:00',
        endTime: '10:00',
        description: '이벤트 7 description',
        location: '이벤트 7 location',
        category: '이벤트 7 category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 1,
      },
    ];

    const result = getFilteredEvents(eventList, 'EVeNT', new Date('2024-07-01'), 'week');

    expect(result).toEqual([
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
    ]);
  });

  describe('월의 경계에 있는 이벤트를 올바르게 필터링한다', () => {
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
        startTime: '09:00',
        endTime: '10:00',
        description: '이벤트 6 description',
        location: '이벤트 6 location',
        category: '이벤트 6 category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 1,
      },
    ];

    it.each([
      {
        date: '2024-06-30',
        view: 'week',
        expectValue: [
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
            startTime: '09:00',
            endTime: '10:00',
            description: '이벤트 6 description',
            location: '이벤트 6 location',
            category: '이벤트 6 category',
            repeat: { type: 'none', interval: 1 },
            notificationTime: 1,
          },
        ],
      },
      {
        date: '2024-06-30',
        view: 'month',
        expectValue: [
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
            startTime: '09:00',
            endTime: '10:00',
            description: '이벤트 6 description',
            location: '이벤트 6 location',
            category: '이벤트 6 category',
            repeat: { type: 'none', interval: 1 },
            notificationTime: 1,
          },
        ],
      },
      {
        date: '2024-07-01',
        view: 'week',
        expectValue: [
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
            startTime: '09:00',
            endTime: '10:00',
            description: '이벤트 6 description',
            location: '이벤트 6 location',
            category: '이벤트 6 category',
            repeat: { type: 'none', interval: 1 },
            notificationTime: 1,
          },
        ],
      },
      {
        date: '2024-07-01',
        view: 'month',
        expectValue: [
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
        ],
      },
    ] as const)('날짜 $date 로 $view 뷰에서 올바르게 필터링한다', ({ date, view, expectValue }) => {
      const result = getFilteredEvents(eventList, '', new Date(date), view);

      expect(result).toEqual(expectValue);
    });
  });

  it('빈 이벤트 리스트에 대해 빈 배열을 반환한다', () => {
    const result = getFilteredEvents([], '', new Date('2024-07-01'), 'week');

    expect(result).toEqual([]);
  });
});

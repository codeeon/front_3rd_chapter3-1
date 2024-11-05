import { Event } from '../../types';
import { createNotificationMessage, getUpcomingEvents } from '../../utils/notificationUtils';

describe('getUpcomingEvents', () => {
  it('알림 시간이 정확히 도래한 이벤트를 반환한다', () => {
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

    const result = getUpcomingEvents(eventList, new Date('2024-06-30'), []);

    expect(result).toEqual([
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

  it('이미 알림이 간 이벤트는 제외한다', () => {
    const eventList: Event[] = [
      {
        id: '1',
        date: '2024-06-29',
        title: 'event 1',
        startTime: '09:30',
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
      {
        id: '7',
        date: '2024-06-30',
        title: '이벤트 7',
        startTime: '09:00:30',
        endTime: '10:00',
        description: '이벤트 7 description',
        location: '이벤트 7 location',
        category: '이벤트 7 category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 1,
      },
    ];

    const result = getUpcomingEvents(eventList, new Date('2024-06-30'), ['6']);

    expect(result).toEqual([
      {
        id: '7',
        date: '2024-06-30',
        title: '이벤트 7',
        startTime: '09:00:30',
        endTime: '10:00',
        description: '이벤트 7 description',
        location: '이벤트 7 location',
        category: '이벤트 7 category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 1,
      },
    ]);
  });

  it('알림 시간이 아직 도래하지 않은 이벤트는 반환하지 않는다', () => {
    const eventList: Event[] = [
      {
        id: '1',
        date: '2024-06-30',
        title: '이벤트 1',
        startTime: '09:01:01',
        endTime: '10:00',
        description: '이벤트 1 description',
        location: '이벤트 1 location',
        category: '이벤트 1 category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 1,
      },
    ];

    const result = getUpcomingEvents(eventList, new Date('2024-06-30'), []);

    expect(result).toEqual([]);
  });

  it('알림 시간이 지난 이벤트는 반환하지 않는다', () => {
    const eventList: Event[] = [
      {
        id: '1',
        date: '2024-06-30',
        title: '이벤트 1',
        startTime: '09:00',
        endTime: '10:00',
        description: '이벤트 1 description',
        location: '이벤트 1 location',
        category: '이벤트 1 category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 1,
      },
    ];

    const result = getUpcomingEvents(eventList, new Date('2024-06-30'), []);

    expect(result).toEqual([]);
  });
});

describe('createNotificationMessage', () => {
  it('올바른 알림 메시지를 생성해야 한다', () => {
    const event: Event = {
      id: '1',
      date: '2024-06-29',
      title: 'event 1',
      startTime: '09:30',
      endTime: '10:00',
      description: 'event 1 description',
      location: 'event 1 location',
      category: 'event 1 category',
      repeat: { type: 'none', interval: 1 },
      notificationTime: 1,
    };

    const result = createNotificationMessage(event);

    expect(result).toBe('1분 후 event 1 일정이 시작됩니다.');
  });
});

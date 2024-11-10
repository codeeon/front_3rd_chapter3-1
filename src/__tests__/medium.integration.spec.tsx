import { ChakraProvider } from '@chakra-ui/react';
import { render, screen, within, act, waitFor } from '@testing-library/react';
import { UserEvent, userEvent } from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { ReactElement } from 'react';

import {
  setupMockHandlerCreation,
  setupMockHandlerUpdating,
  setupMockHandlerDeletion,
} from '../__mocks__/handlersUtils';
import App from '../App';
import { server } from '../setupTests';
import { Event } from '../types';

const renderApp = () => {
  return render(
    <ChakraProvider>
      <App />
    </ChakraProvider>
  );
};

describe('일정 CRUD 및 기본 기능', () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
    server.resetHandlers();
  });

  it('입력한 새로운 일정 정보에 맞춰 모든 필드가 이벤트 리스트에 정확히 저장된다.', async () => {
    const mockHandlers = setupMockHandlerCreation([]);
    mockHandlers.setup();

    renderApp();

    await user.type(screen.getByLabelText('제목'), '새로운 회의');
    await user.type(screen.getByLabelText('날짜'), '2024-11-15');
    await user.type(screen.getByLabelText('시작 시간'), '14:00');
    await user.type(screen.getByLabelText('종료 시간'), '15:00');
    await user.type(screen.getByLabelText('설명'), '새로운 팀 미팅');
    await user.type(screen.getByLabelText('위치'), '회의실 A');
    await user.selectOptions(screen.getByLabelText('카테고리'), '업무');
    await user.selectOptions(screen.getByLabelText('알림 설정'), '10');

    await user.click(screen.getByTestId('event-submit-button'));

    const eventList = screen.getByTestId('event-list');
    await waitFor(() => {
      expect(within(eventList).getByText('새로운 회의')).toBeInTheDocument();
      expect(within(eventList).getByText('2024-11-15')).toBeInTheDocument();
      expect(within(eventList).getByText('14:00 - 15:00')).toBeInTheDocument();
      expect(within(eventList).getByText('새로운 팀 미팅')).toBeInTheDocument();
      expect(within(eventList).getByText('회의실 A')).toBeInTheDocument();
      expect(within(eventList).getByText('카테고리: 업무')).toBeInTheDocument();
    });
  });

  it('기존 일정의 세부 정보를 수정하고 변경사항이 정확히 반영된다', async () => {
    const initialEvent: Event = {
      id: '1',
      title: '기존 회의',
      date: '2024-11-15',
      startTime: '09:00',
      endTime: '10:00',
      description: '기존 팀 미팅',
      location: '회의실 A',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    };

    const mockHandlers = setupMockHandlerUpdating([initialEvent]);
    mockHandlers.setup();

    renderApp();

    await waitFor(() => {
      expect(screen.getByText('기존 회의')).toBeInTheDocument();
    });

    const editButton = screen.getAllByLabelText('Edit event')[0];
    await user.click(editButton);
    await user.clear(screen.getByLabelText('제목'));
    await user.type(screen.getByLabelText('제목'), '수정된 회의');
    await user.clear(screen.getByLabelText('설명'));
    await user.type(screen.getByLabelText('설명'), '수정된 설명');

    await user.click(screen.getByTestId('event-submit-button'));

    const eventList = screen.getByTestId('event-list');
    await waitFor(() => {
      expect(within(eventList).getByText('수정된 회의')).toBeInTheDocument();
      expect(within(eventList).getByText('수정된 설명')).toBeInTheDocument();
    });
  });

  it('일정을 삭제하고 더 이상 조회되지 않는지 확인한다', async () => {
    const initialEvent: Event = {
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
    };

    const mockHandlers = setupMockHandlerDeletion([initialEvent]);
    mockHandlers.setup();

    renderApp();

    await waitFor(() => {
      expect(screen.getByText('기존 회의')).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByLabelText('Delete event')[0];
    await user.click(deleteButton);

    const eventList = screen.getByTestId('event-list');
    await waitFor(() => {
      expect(within(eventList).queryByText('기존 회의')).not.toBeInTheDocument();
    });
  });
});

describe('일정 뷰', () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
    vi.setSystemTime(new Date('2024-10-01'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('월별 뷰에 일정이 없으면, 일정이 표시되지 않아야 한다.', async () => {
    server.use(http.get('/api/events', () => HttpResponse.json({ events: [] })));

    renderApp();

    await user.selectOptions(screen.getByLabelText('view'), 'month');

    const eventList = screen.getByTestId('event-list');
    expect(within(eventList).queryByRole('article')).not.toBeInTheDocument();
  });

  it('월별 뷰에 일정이 정확히 표시되는지 확인한다', async () => {
    const mockEvent = {
      id: '1',
      title: '월간 회의',
      date: '2024-10-15',
      startTime: '09:00',
      endTime: '10:00',
      description: '정기 월간 회의',
      location: '회의실 A',
      category: '업무',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    };

    server.use(http.get('/api/events', () => HttpResponse.json({ events: [mockEvent] })));

    renderApp();

    await user.selectOptions(screen.getByLabelText('view'), 'month');

    const eventList = screen.getByTestId('event-list');
    expect(within(eventList).getByText('월간 회의')).toBeInTheDocument();
    expect(within(eventList).getByText('2024-10-15')).toBeInTheDocument();
    expect(within(eventList).getByText('09:00 - 10:00')).toBeInTheDocument();
    expect(within(eventList).getByText('정기 월간 회의')).toBeInTheDocument();
    expect(within(eventList).getByText('회의실 A')).toBeInTheDocument();
  });
});

describe('검색 기능', () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
    server.resetHandlers();
  });

  it('검색어를 지우면 모든 일정이 다시 표시되어야 한다', async () => {
    const mockEvents = [
      {
        id: '1',
        title: '검색용 회의',
        date: '2024-10-15',
        startTime: '09:00',
        endTime: '10:00',
        description: '검색 테스트용 미팅',
        location: '회의실 B',
        category: '업무',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 10,
      },
    ];

    const mockHandlers = setupMockHandlerCreation(mockEvents);
    mockHandlers.setup();

    renderApp();

    await user.type(screen.getByLabelText('일정 검색'), '존재하지 않는');
    await user.clear(screen.getByLabelText('일정 검색'));

    const eventList = screen.getByTestId('event-list');
    await waitFor(() => {
      expect(within(eventList).getByText('검색용 회의')).toBeInTheDocument();
    });
  });
});

describe('일정 충돌', () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('겹치는 시간에 새 일정을 추가할 때 경고가 표시된다', async () => {
    renderApp();

    await user.type(screen.getByLabelText('제목'), '충돌 회의');
    await user.type(screen.getByLabelText('날짜'), '2024-10-15');
    await user.type(screen.getByLabelText('시작 시간'), '09:00');
    await user.type(screen.getByLabelText('종료 시간'), '10:00');

    await user.click(screen.getByTestId('event-submit-button'));

    expect(screen.getByText(/일정이 겹칩니다/)).toBeInTheDocument();
  });
});

it('notificationTime을 10으로 하면 지정 시간 10분 전 알람 텍스트가 노출된다', async () => {
  const user = userEvent.setup();
  vi.useFakeTimers();

  renderApp();

  await user.type(screen.getByLabelText('제목'), '알림 테스트');
  await user.type(screen.getByLabelText('날짜'), '2024-10-01');
  await user.type(screen.getByLabelText('시작 시간'), '10:00');
  await user.selectOptions(screen.getByLabelText('알림 설정'), '10');

  await user.click(screen.getByTestId('event-submit-button'));

  vi.setSystemTime(new Date('2024-10-01T09:50:00'));
  vi.advanceTimersByTime(1000);

  await waitFor(() => {
    expect(screen.getByText('10분 후 알림 테스트 일정이 시작됩니다.')).toBeInTheDocument();
  });

  vi.useRealTimers();
});

import { Event } from '../types';
import { fillZero } from '../utils/dateUtils';

export const assertDate = (date1: Date, date2: Date) => {
  expect(date1.toISOString()).toBe(date2.toISOString());
};

export const parseHM = (timestamp: number) => {
  const date = new Date(timestamp);
  const h = fillZero(date.getHours());
  const m = fillZero(date.getMinutes());
  return `${h}:${m}`;
};

interface HasIdType {
  id: string;
}

export const createNewId = <T extends HasIdType>(list: T[]) => {
  if (list.length === 0) {
    return '1';
  }

  return (Number(list[list.length - 1].id) + 1).toString();
};

export const sortEventList = (events: Event[]) => {
  return events.sort((a, b) => Number(a.id) - Number(b.id));
};

export const deleteData = <T extends HasIdType>(list: T[], id: string) => {
  return list.filter((item) => item.id !== id);
};

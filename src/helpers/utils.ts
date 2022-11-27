import { randomBytes } from 'crypto';
import { NullableFieldBadRequestException } from './errors';

export const getCode = (count: number = 3) => {
  return String(parseInt(randomBytes(count).toString('hex'), 16)).slice(
    0,
    count * 2,
  );
};

export const mapFromArray = <T>(
  array: T[],
  keyStrategy: (v: T) => string | number,
) => {
  const map: Record<string | number, T | undefined> = {};

  for (const item of array) {
    map[keyStrategy(item)] = item;
  }
  return map;
};

export const filterObjectNulls = (obj: Object) => {
  const newObj = { ...obj };

  for (const key in newObj) {
    if (newObj[key] === null) {
      delete newObj[key];
    }
  }

  return newObj;
};

export const testIsHaveNulls = (body: Object, input: Object) => {
  if (!(Object.keys(body).length === Object.keys(input).length)) {
    throw new NullableFieldBadRequestException();
  }
};

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

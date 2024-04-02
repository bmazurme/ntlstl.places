import { Regexp } from './validator';

test('email is corrected', () => {
  expect(!!'email@gmail.com'.match(Regexp.EMAIL)).toEqual(true);
  expect(!!'email@yandex.ru'.match(Regexp.EMAIL)).toEqual(true);
  expect(!!'email@yandex'.match(Regexp.EMAIL)).toEqual(false);
  expect(!!'email@yandex.'.match(Regexp.EMAIL)).toEqual(false);
});

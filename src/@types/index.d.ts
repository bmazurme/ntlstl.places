declare module '*.css';

type Action<T> = {
  type: string;
  payload: T;
};

type Reducer<T> = (state: T, action: Action<T>) => T;

type User = {
  _id: string;
  name: string;
  about: string;
  avatar: string;
  defaultEmail: string;
  password: string;
};

type Like = {
  _id: string,
  user: User | null,
}

 type Card = {
  _id: string,
  name: string,
  link: string,
  likes: string[],
  userId: string | null,
  createdAt: Date
}

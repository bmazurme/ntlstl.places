declare module '*.css';
declare module 'image-to-webp';
declare module 'sharp-multer';

type Action<T> = {
  type: string;
  payload: T;
};

type Reducer<T> = (state: T, action: Action<T>) => T;

type User = {
  id: string;
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
};

type Like = {
  id: string,
  user: User | null,
}

type Card = {
  id: string,
  name: string,
  link: string,
  likes: string[],
  user_id: string | null,
  createdAt: Date
}

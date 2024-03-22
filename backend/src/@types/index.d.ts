// declare module 'image-to-webp';
// declare module 'sharp-multer';

type Action<T> = {
  type: string;
  payload: T;
};

type Reducer<T> = (state: T, action: Action<T>) => T;

type User = {
  id: number;
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
};

type Like = {
  id: number;
  user: User | null;
};

type Card = {
  id: string;
  name: string;
  link: string;
  // likes: string[];
  user_id: number | null;
  createdAt: Date;
  user: { name: string; };
  likes: { user_id: number; }[];
};

import { Timestamp } from '@angular/fire/firestore';

export interface Game {
  id: string;
  name: string;
  type: string;
  description: string;
  price: number;
  coverImage: string;
  sold: number;
  createdAt: Date;
}

export interface GameCategory {
  id: string;
  name: string;
}

export interface CreateGameCategory {
  name: string;
}

export interface UpdateGameCategory {
  name: string;
}

export interface AppUser {
  id: string;
  email: string;
  username: string;
  profileUrl: string;
  role: 'member' | 'admin';
  wallet: number;
}

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  limit: number;
  usedCount: number;
}

export interface IUserTopupHistory {
  id: string;
  amount: number;
  createdAt: Timestamp;
}

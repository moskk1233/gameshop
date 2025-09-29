export interface Game {
  id: number;
  name: string;
  type: string;
  description: string;
  price: number;
  coverImage: string;
  sold: number;
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
  username: string
  profileUrl: string;
  role: 'user' | 'admin';
  wallet: number;
}

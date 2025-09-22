import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface Game {
  id: number;
  name: string;
  price: number;
  coverImage: string;
  sold: number;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  games: Game[] = [
    { id: 1, name: 'Delta Force', price: 150, coverImage: '/game.jpg', sold: 9 },
    { id: 2, name: 'One Piece', price: 150, coverImage: '/game.jpg', sold: 100 },
    { id: 3, name: 'Dota 2', price: 150, coverImage: '/game.jpg', sold: 421 },
    { id: 4, name: 'One Puch Man', price: 150, coverImage: '/game.jpg', sold: 2 },
    { id: 5, name: 'Battle Field 2', price: 150, coverImage: '/game.jpg', sold: 0 },
    { id: 6, name: 'Naruto: Shippuden', price: 150, coverImage: '/game.jpg', sold: 1 },
    { id: 7, name: 'Roblox Studio', price: 150, coverImage: '/game.jpg', sold: 0 },
    { id: 8, name: 'Grand Theft Auto 6', price: 150, coverImage: '/game.jpg', sold: 0 },
    { id: 9, name: 'Grand Theft Auto 5', price: 150, coverImage: '/game.jpg', sold: 10 },
    { id: 10, name: 'Saint Row', price: 150, coverImage: '/game.jpg', sold: 5 },
    { id: 11, name: 'Rock Man', price: 150, coverImage: '/game.jpg', sold: 3 },
    { id: 12, name: 'Spiderman 2', price: 150, coverImage: '/game.jpg', sold: 0 },
    { id: 13, name: 'Hero of Newerst', price: 150, coverImage: '/game.jpg', sold: 0 },
    { id: 14, name: 'Elsword', price: 150, coverImage: '/game.jpg', sold: 0 },
    { id: 15, name: 'Roblox Player', price: 150, coverImage: '/game.jpg', sold: 1 },
    { id: 16, name: 'Hollow Knight', price: 150, coverImage: '/game.jpg', sold: 0 },
    { id: 17, name: 'Hollow Knight: Silksong', price: 150, coverImage: '/game.jpg', sold: 9 },
    { id: 18, name: 'Among Us', price: 150, coverImage: '/game.jpg', sold: 0 },
    { id: 19, name: 'The Sim', price: 150, coverImage: '/game.jpg', sold: 0 },
    { id: 20, name: 'BioShock', price: 150, coverImage: '/game.jpg', sold: 0 },
  ];

  getGames(): Observable<Game[]> {
    return of(this.games);
  }

  getGameById(id: number): Observable<Game | undefined> {
    const game = this.games.find(game => game.id === id);
    return of(game);
  }

  getTrendingGames(): Observable<Game[]> {
    const games = [...this.games].sort((a, b) => b.sold - a.sold);
    return of(games.slice(0, 10));
  }
}

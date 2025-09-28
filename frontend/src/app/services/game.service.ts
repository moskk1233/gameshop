import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Game } from '../types';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  games: Game[] = [
    {
      id: 1,
      name: 'Delta Force',
      price: 150,
      coverImage: '/game.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis tellus et dui ullamcorper eleifend. Morbi in vehicula elit, quis fringilla metus. Sed convallis velit nec tellus bibendum, sit amet condimentum dolor dapibus. Ut mollis massa sapien, in suscipit purus tincidunt a. Aenean finibus, arcu id elementum bibendum, sem lacus euismod odio, ac sollicitudin nisi dui sit amet dolor. Fusce mollis, magna eget feugiat fermentum, odio urna tempor nibh, quis dictum sapien risus nec orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam ullamcorper ac turpis et congue. Praesent mauris turpis, sollicitudin consequat ornare nec, congue quis velit. Fusce laoreet imperdiet ex, id pellentesque massa vehicula sed. In in turpis metus. Donec quis pharetra leo, non sollicitudin sem. Vestibulum sapien turpis, eleifend vel maximus et, tempor maximus lectus.',
      type: 'FPS',
      sold: 9,
    },
    {
      id: 2,
      name: 'One Piece',
      price: 150,
      coverImage: '/game.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis tellus et dui ullamcorper eleifend. Morbi in vehicula elit, quis fringilla metus. Sed convallis velit nec tellus bibendum, sit amet condimentum dolor dapibus. Ut mollis massa sapien, in suscipit purus tincidunt a. Aenean finibus, arcu id elementum bibendum, sem lacus euismod odio, ac sollicitudin nisi dui sit amet dolor. Fusce mollis, magna eget feugiat fermentum, odio urna tempor nibh, quis dictum sapien risus nec orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam ullamcorper ac turpis et congue. Praesent mauris turpis, sollicitudin consequat ornare nec, congue quis velit. Fusce laoreet imperdiet ex, id pellentesque massa vehicula sed. In in turpis metus. Donec quis pharetra leo, non sollicitudin sem. Vestibulum sapien turpis, eleifend vel maximus et, tempor maximus lectus.',
      type: 'FPS',
      sold: 100,
    },
    {
      id: 3,
      name: 'Dota 2',
      price: 150,
      coverImage: '/game.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis tellus et dui ullamcorper eleifend. Morbi in vehicula elit, quis fringilla metus. Sed convallis velit nec tellus bibendum, sit amet condimentum dolor dapibus. Ut mollis massa sapien, in suscipit purus tincidunt a. Aenean finibus, arcu id elementum bibendum, sem lacus euismod odio, ac sollicitudin nisi dui sit amet dolor. Fusce mollis, magna eget feugiat fermentum, odio urna tempor nibh, quis dictum sapien risus nec orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam ullamcorper ac turpis et congue. Praesent mauris turpis, sollicitudin consequat ornare nec, congue quis velit. Fusce laoreet imperdiet ex, id pellentesque massa vehicula sed. In in turpis metus. Donec quis pharetra leo, non sollicitudin sem. Vestibulum sapien turpis, eleifend vel maximus et, tempor maximus lectus.',
      type: 'FPS',
      sold: 421,
    },
    {
      id: 4,
      name: 'One Puch Man',
      price: 150,
      coverImage: '/game.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis tellus et dui ullamcorper eleifend. Morbi in vehicula elit, quis fringilla metus. Sed convallis velit nec tellus bibendum, sit amet condimentum dolor dapibus. Ut mollis massa sapien, in suscipit purus tincidunt a. Aenean finibus, arcu id elementum bibendum, sem lacus euismod odio, ac sollicitudin nisi dui sit amet dolor. Fusce mollis, magna eget feugiat fermentum, odio urna tempor nibh, quis dictum sapien risus nec orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam ullamcorper ac turpis et congue. Praesent mauris turpis, sollicitudin consequat ornare nec, congue quis velit. Fusce laoreet imperdiet ex, id pellentesque massa vehicula sed. In in turpis metus. Donec quis pharetra leo, non sollicitudin sem. Vestibulum sapien turpis, eleifend vel maximus et, tempor maximus lectus.',
      type: 'FPS',
      sold: 2,
    },
    {
      id: 5,
      name: 'Battle Field 2',
      price: 150,
      coverImage: '/game.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis tellus et dui ullamcorper eleifend. Morbi in vehicula elit, quis fringilla metus. Sed convallis velit nec tellus bibendum, sit amet condimentum dolor dapibus. Ut mollis massa sapien, in suscipit purus tincidunt a. Aenean finibus, arcu id elementum bibendum, sem lacus euismod odio, ac sollicitudin nisi dui sit amet dolor. Fusce mollis, magna eget feugiat fermentum, odio urna tempor nibh, quis dictum sapien risus nec orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam ullamcorper ac turpis et congue. Praesent mauris turpis, sollicitudin consequat ornare nec, congue quis velit. Fusce laoreet imperdiet ex, id pellentesque massa vehicula sed. In in turpis metus. Donec quis pharetra leo, non sollicitudin sem. Vestibulum sapien turpis, eleifend vel maximus et, tempor maximus lectus.',
      type: 'FPS',
      sold: 0,
    },
    {
      id: 6,
      name: 'Naruto: Shippuden',
      price: 150,
      coverImage: '/game.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis tellus et dui ullamcorper eleifend. Morbi in vehicula elit, quis fringilla metus. Sed convallis velit nec tellus bibendum, sit amet condimentum dolor dapibus. Ut mollis massa sapien, in suscipit purus tincidunt a. Aenean finibus, arcu id elementum bibendum, sem lacus euismod odio, ac sollicitudin nisi dui sit amet dolor. Fusce mollis, magna eget feugiat fermentum, odio urna tempor nibh, quis dictum sapien risus nec orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam ullamcorper ac turpis et congue. Praesent mauris turpis, sollicitudin consequat ornare nec, congue quis velit. Fusce laoreet imperdiet ex, id pellentesque massa vehicula sed. In in turpis metus. Donec quis pharetra leo, non sollicitudin sem. Vestibulum sapien turpis, eleifend vel maximus et, tempor maximus lectus.',
      type: 'FPS',
      sold: 1,
    },
    {
      id: 7,
      name: 'Roblox Studio',
      price: 150,
      coverImage: '/game.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis tellus et dui ullamcorper eleifend. Morbi in vehicula elit, quis fringilla metus. Sed convallis velit nec tellus bibendum, sit amet condimentum dolor dapibus. Ut mollis massa sapien, in suscipit purus tincidunt a. Aenean finibus, arcu id elementum bibendum, sem lacus euismod odio, ac sollicitudin nisi dui sit amet dolor. Fusce mollis, magna eget feugiat fermentum, odio urna tempor nibh, quis dictum sapien risus nec orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam ullamcorper ac turpis et congue. Praesent mauris turpis, sollicitudin consequat ornare nec, congue quis velit. Fusce laoreet imperdiet ex, id pellentesque massa vehicula sed. In in turpis metus. Donec quis pharetra leo, non sollicitudin sem. Vestibulum sapien turpis, eleifend vel maximus et, tempor maximus lectus.',
      type: 'FPS',
      sold: 0,
    },
    {
      id: 8,
      name: 'Grand Theft Auto 6',
      price: 150,
      coverImage: '/game.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis tellus et dui ullamcorper eleifend. Morbi in vehicula elit, quis fringilla metus. Sed convallis velit nec tellus bibendum, sit amet condimentum dolor dapibus. Ut mollis massa sapien, in suscipit purus tincidunt a. Aenean finibus, arcu id elementum bibendum, sem lacus euismod odio, ac sollicitudin nisi dui sit amet dolor. Fusce mollis, magna eget feugiat fermentum, odio urna tempor nibh, quis dictum sapien risus nec orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam ullamcorper ac turpis et congue. Praesent mauris turpis, sollicitudin consequat ornare nec, congue quis velit. Fusce laoreet imperdiet ex, id pellentesque massa vehicula sed. In in turpis metus. Donec quis pharetra leo, non sollicitudin sem. Vestibulum sapien turpis, eleifend vel maximus et, tempor maximus lectus.',
      type: 'FPS',
      sold: 0,
    },
    {
      id: 9,
      name: 'Grand Theft Auto 5',
      price: 150,
      coverImage: '/game.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis tellus et dui ullamcorper eleifend. Morbi in vehicula elit, quis fringilla metus. Sed convallis velit nec tellus bibendum, sit amet condimentum dolor dapibus. Ut mollis massa sapien, in suscipit purus tincidunt a. Aenean finibus, arcu id elementum bibendum, sem lacus euismod odio, ac sollicitudin nisi dui sit amet dolor. Fusce mollis, magna eget feugiat fermentum, odio urna tempor nibh, quis dictum sapien risus nec orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam ullamcorper ac turpis et congue. Praesent mauris turpis, sollicitudin consequat ornare nec, congue quis velit. Fusce laoreet imperdiet ex, id pellentesque massa vehicula sed. In in turpis metus. Donec quis pharetra leo, non sollicitudin sem. Vestibulum sapien turpis, eleifend vel maximus et, tempor maximus lectus.',
      type: 'FPS',
      sold: 10,
    },
    {
      id: 10,
      name: 'Saint Row',
      price: 150,
      coverImage: '/game.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis tellus et dui ullamcorper eleifend. Morbi in vehicula elit, quis fringilla metus. Sed convallis velit nec tellus bibendum, sit amet condimentum dolor dapibus. Ut mollis massa sapien, in suscipit purus tincidunt a. Aenean finibus, arcu id elementum bibendum, sem lacus euismod odio, ac sollicitudin nisi dui sit amet dolor. Fusce mollis, magna eget feugiat fermentum, odio urna tempor nibh, quis dictum sapien risus nec orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam ullamcorper ac turpis et congue. Praesent mauris turpis, sollicitudin consequat ornare nec, congue quis velit. Fusce laoreet imperdiet ex, id pellentesque massa vehicula sed. In in turpis metus. Donec quis pharetra leo, non sollicitudin sem. Vestibulum sapien turpis, eleifend vel maximus et, tempor maximus lectus.',
      type: 'FPS',
      sold: 5,
    },
    {
      id: 11,
      name: 'Rock Man',
      price: 150,
      coverImage: '/game.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis tellus et dui ullamcorper eleifend. Morbi in vehicula elit, quis fringilla metus. Sed convallis velit nec tellus bibendum, sit amet condimentum dolor dapibus. Ut mollis massa sapien, in suscipit purus tincidunt a. Aenean finibus, arcu id elementum bibendum, sem lacus euismod odio, ac sollicitudin nisi dui sit amet dolor. Fusce mollis, magna eget feugiat fermentum, odio urna tempor nibh, quis dictum sapien risus nec orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam ullamcorper ac turpis et congue. Praesent mauris turpis, sollicitudin consequat ornare nec, congue quis velit. Fusce laoreet imperdiet ex, id pellentesque massa vehicula sed. In in turpis metus. Donec quis pharetra leo, non sollicitudin sem. Vestibulum sapien turpis, eleifend vel maximus et, tempor maximus lectus.',
      type: 'FPS',
      sold: 3,
    },
    {
      id: 12,
      name: 'Spiderman 2',
      price: 150,
      coverImage: '/game.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis tellus et dui ullamcorper eleifend. Morbi in vehicula elit, quis fringilla metus. Sed convallis velit nec tellus bibendum, sit amet condimentum dolor dapibus. Ut mollis massa sapien, in suscipit purus tincidunt a. Aenean finibus, arcu id elementum bibendum, sem lacus euismod odio, ac sollicitudin nisi dui sit amet dolor. Fusce mollis, magna eget feugiat fermentum, odio urna tempor nibh, quis dictum sapien risus nec orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam ullamcorper ac turpis et congue. Praesent mauris turpis, sollicitudin consequat ornare nec, congue quis velit. Fusce laoreet imperdiet ex, id pellentesque massa vehicula sed. In in turpis metus. Donec quis pharetra leo, non sollicitudin sem. Vestibulum sapien turpis, eleifend vel maximus et, tempor maximus lectus.',
      type: 'FPS',
      sold: 0,
    },
    {
      id: 13,
      name: 'Hero of Newerst',
      price: 150,
      coverImage: '/game.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis tellus et dui ullamcorper eleifend. Morbi in vehicula elit, quis fringilla metus. Sed convallis velit nec tellus bibendum, sit amet condimentum dolor dapibus. Ut mollis massa sapien, in suscipit purus tincidunt a. Aenean finibus, arcu id elementum bibendum, sem lacus euismod odio, ac sollicitudin nisi dui sit amet dolor. Fusce mollis, magna eget feugiat fermentum, odio urna tempor nibh, quis dictum sapien risus nec orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam ullamcorper ac turpis et congue. Praesent mauris turpis, sollicitudin consequat ornare nec, congue quis velit. Fusce laoreet imperdiet ex, id pellentesque massa vehicula sed. In in turpis metus. Donec quis pharetra leo, non sollicitudin sem. Vestibulum sapien turpis, eleifend vel maximus et, tempor maximus lectus.',
      type: 'FPS',
      sold: 0,
    },
    {
      id: 14,
      name: 'Elsword',
      price: 150,
      coverImage: '/game.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis tellus et dui ullamcorper eleifend. Morbi in vehicula elit, quis fringilla metus. Sed convallis velit nec tellus bibendum, sit amet condimentum dolor dapibus. Ut mollis massa sapien, in suscipit purus tincidunt a. Aenean finibus, arcu id elementum bibendum, sem lacus euismod odio, ac sollicitudin nisi dui sit amet dolor. Fusce mollis, magna eget feugiat fermentum, odio urna tempor nibh, quis dictum sapien risus nec orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam ullamcorper ac turpis et congue. Praesent mauris turpis, sollicitudin consequat ornare nec, congue quis velit. Fusce laoreet imperdiet ex, id pellentesque massa vehicula sed. In in turpis metus. Donec quis pharetra leo, non sollicitudin sem. Vestibulum sapien turpis, eleifend vel maximus et, tempor maximus lectus.',
      type: 'FPS',
      sold: 0,
    },
    {
      id: 15,
      name: 'Roblox Player',
      price: 150,
      coverImage: '/game.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis tellus et dui ullamcorper eleifend. Morbi in vehicula elit, quis fringilla metus. Sed convallis velit nec tellus bibendum, sit amet condimentum dolor dapibus. Ut mollis massa sapien, in suscipit purus tincidunt a. Aenean finibus, arcu id elementum bibendum, sem lacus euismod odio, ac sollicitudin nisi dui sit amet dolor. Fusce mollis, magna eget feugiat fermentum, odio urna tempor nibh, quis dictum sapien risus nec orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam ullamcorper ac turpis et congue. Praesent mauris turpis, sollicitudin consequat ornare nec, congue quis velit. Fusce laoreet imperdiet ex, id pellentesque massa vehicula sed. In in turpis metus. Donec quis pharetra leo, non sollicitudin sem. Vestibulum sapien turpis, eleifend vel maximus et, tempor maximus lectus.',
      type: 'FPS',
      sold: 1,
    },
    {
      id: 16,
      name: 'Hollow Knight',
      price: 150,
      coverImage: '/game.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis tellus et dui ullamcorper eleifend. Morbi in vehicula elit, quis fringilla metus. Sed convallis velit nec tellus bibendum, sit amet condimentum dolor dapibus. Ut mollis massa sapien, in suscipit purus tincidunt a. Aenean finibus, arcu id elementum bibendum, sem lacus euismod odio, ac sollicitudin nisi dui sit amet dolor. Fusce mollis, magna eget feugiat fermentum, odio urna tempor nibh, quis dictum sapien risus nec orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam ullamcorper ac turpis et congue. Praesent mauris turpis, sollicitudin consequat ornare nec, congue quis velit. Fusce laoreet imperdiet ex, id pellentesque massa vehicula sed. In in turpis metus. Donec quis pharetra leo, non sollicitudin sem. Vestibulum sapien turpis, eleifend vel maximus et, tempor maximus lectus.',
      type: 'FPS',
      sold: 0,
    },
    {
      id: 17,
      name: 'Hollow Knight: Silksong',
      price: 150,
      coverImage: '/game.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis tellus et dui ullamcorper eleifend. Morbi in vehicula elit, quis fringilla metus. Sed convallis velit nec tellus bibendum, sit amet condimentum dolor dapibus. Ut mollis massa sapien, in suscipit purus tincidunt a. Aenean finibus, arcu id elementum bibendum, sem lacus euismod odio, ac sollicitudin nisi dui sit amet dolor. Fusce mollis, magna eget feugiat fermentum, odio urna tempor nibh, quis dictum sapien risus nec orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam ullamcorper ac turpis et congue. Praesent mauris turpis, sollicitudin consequat ornare nec, congue quis velit. Fusce laoreet imperdiet ex, id pellentesque massa vehicula sed. In in turpis metus. Donec quis pharetra leo, non sollicitudin sem. Vestibulum sapien turpis, eleifend vel maximus et, tempor maximus lectus.',
      type: 'FPS',
      sold: 9,
    },
    {
      id: 18,
      name: 'Among Us',
      price: 150,
      coverImage: '/game.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis tellus et dui ullamcorper eleifend. Morbi in vehicula elit, quis fringilla metus. Sed convallis velit nec tellus bibendum, sit amet condimentum dolor dapibus. Ut mollis massa sapien, in suscipit purus tincidunt a. Aenean finibus, arcu id elementum bibendum, sem lacus euismod odio, ac sollicitudin nisi dui sit amet dolor. Fusce mollis, magna eget feugiat fermentum, odio urna tempor nibh, quis dictum sapien risus nec orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam ullamcorper ac turpis et congue. Praesent mauris turpis, sollicitudin consequat ornare nec, congue quis velit. Fusce laoreet imperdiet ex, id pellentesque massa vehicula sed. In in turpis metus. Donec quis pharetra leo, non sollicitudin sem. Vestibulum sapien turpis, eleifend vel maximus et, tempor maximus lectus.',
      type: 'FPS',
      sold: 0,
    },
    {
      id: 19,
      name: 'The Sim',
      price: 150,
      coverImage: '/game.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis tellus et dui ullamcorper eleifend. Morbi in vehicula elit, quis fringilla metus. Sed convallis velit nec tellus bibendum, sit amet condimentum dolor dapibus. Ut mollis massa sapien, in suscipit purus tincidunt a. Aenean finibus, arcu id elementum bibendum, sem lacus euismod odio, ac sollicitudin nisi dui sit amet dolor. Fusce mollis, magna eget feugiat fermentum, odio urna tempor nibh, quis dictum sapien risus nec orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam ullamcorper ac turpis et congue. Praesent mauris turpis, sollicitudin consequat ornare nec, congue quis velit. Fusce laoreet imperdiet ex, id pellentesque massa vehicula sed. In in turpis metus. Donec quis pharetra leo, non sollicitudin sem. Vestibulum sapien turpis, eleifend vel maximus et, tempor maximus lectus.',
      type: 'FPS',
      sold: 0,
    },
    {
      id: 20,
      name: 'BioShock',
      price: 150,
      coverImage: '/game.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis tellus et dui ullamcorper eleifend. Morbi in vehicula elit, quis fringilla metus. Sed convallis velit nec tellus bibendum, sit amet condimentum dolor dapibus. Ut mollis massa sapien, in suscipit purus tincidunt a. Aenean finibus, arcu id elementum bibendum, sem lacus euismod odio, ac sollicitudin nisi dui sit amet dolor. Fusce mollis, magna eget feugiat fermentum, odio urna tempor nibh, quis dictum sapien risus nec orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam ullamcorper ac turpis et congue. Praesent mauris turpis, sollicitudin consequat ornare nec, congue quis velit. Fusce laoreet imperdiet ex, id pellentesque massa vehicula sed. In in turpis metus. Donec quis pharetra leo, non sollicitudin sem. Vestibulum sapien turpis, eleifend vel maximus et, tempor maximus lectus.',
      type: 'FPS',
      sold: 0,
    },
  ];

  getGames(): Observable<Game[]> {
    return of(this.games);
  }

  getGameById(id: number): Observable<Game | undefined> {
    const game = this.games.find((game) => game.id === id);
    return of(game);
  }

  getTrendingGames(): Observable<Game[]> {
    const games = [...this.games].sort((a, b) => b.sold - a.sold);
    return of(games.slice(0, 10));
  }
}

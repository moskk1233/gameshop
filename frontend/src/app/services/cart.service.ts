import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Game } from '../types';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  carts: Omit<Game, 'sold'>[] = [
    {
      id: '1',
      name: 'Delta Force',
      price: 150,
      coverImage: '/game.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis tellus et dui ullamcorper eleifend. Morbi in vehicula elit, quis fringilla metus. Sed convallis velit nec tellus bibendum, sit amet condimentum dolor dapibus. Ut mollis massa sapien, in suscipit purus tincidunt a. Aenean finibus, arcu id elementum bibendum, sem lacus euismod odio, ac sollicitudin nisi dui sit amet dolor. Fusce mollis, magna eget feugiat fermentum, odio urna tempor nibh, quis dictum sapien risus nec orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam ullamcorper ac turpis et congue. Praesent mauris turpis, sollicitudin consequat ornare nec, congue quis velit. Fusce laoreet imperdiet ex, id pellentesque massa vehicula sed. In in turpis metus. Donec quis pharetra leo, non sollicitudin sem. Vestibulum sapien turpis, eleifend vel maximus et, tempor maximus lectus.',
      type: 'FPS',
      createdAt: new Date(),
    },
    {
      id: '2',
      name: 'One Piece',
      price: 150,
      coverImage: '/game.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis tellus et dui ullamcorper eleifend. Morbi in vehicula elit, quis fringilla metus. Sed convallis velit nec tellus bibendum, sit amet condimentum dolor dapibus. Ut mollis massa sapien, in suscipit purus tincidunt a. Aenean finibus, arcu id elementum bibendum, sem lacus euismod odio, ac sollicitudin nisi dui sit amet dolor. Fusce mollis, magna eget feugiat fermentum, odio urna tempor nibh, quis dictum sapien risus nec orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam ullamcorper ac turpis et congue. Praesent mauris turpis, sollicitudin consequat ornare nec, congue quis velit. Fusce laoreet imperdiet ex, id pellentesque massa vehicula sed. In in turpis metus. Donec quis pharetra leo, non sollicitudin sem. Vestibulum sapien turpis, eleifend vel maximus et, tempor maximus lectus.',
      type: 'FPS',
      createdAt: new Date(),
    },
    {
      id: '3',
      name: 'Dota 2',
      price: 150,
      coverImage: '/game.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis tellus et dui ullamcorper eleifend. Morbi in vehicula elit, quis fringilla metus. Sed convallis velit nec tellus bibendum, sit amet condimentum dolor dapibus. Ut mollis massa sapien, in suscipit purus tincidunt a. Aenean finibus, arcu id elementum bibendum, sem lacus euismod odio, ac sollicitudin nisi dui sit amet dolor. Fusce mollis, magna eget feugiat fermentum, odio urna tempor nibh, quis dictum sapien risus nec orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam ullamcorper ac turpis et congue. Praesent mauris turpis, sollicitudin consequat ornare nec, congue quis velit. Fusce laoreet imperdiet ex, id pellentesque massa vehicula sed. In in turpis metus. Donec quis pharetra leo, non sollicitudin sem. Vestibulum sapien turpis, eleifend vel maximus et, tempor maximus lectus.',
      type: 'FPS',
      createdAt: new Date(),
    },
    {
      id: '4',
      name: 'One Puch Man',
      price: 150,
      coverImage: '/game.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis tellus et dui ullamcorper eleifend. Morbi in vehicula elit, quis fringilla metus. Sed convallis velit nec tellus bibendum, sit amet condimentum dolor dapibus. Ut mollis massa sapien, in suscipit purus tincidunt a. Aenean finibus, arcu id elementum bibendum, sem lacus euismod odio, ac sollicitudin nisi dui sit amet dolor. Fusce mollis, magna eget feugiat fermentum, odio urna tempor nibh, quis dictum sapien risus nec orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam ullamcorper ac turpis et congue. Praesent mauris turpis, sollicitudin consequat ornare nec, congue quis velit. Fusce laoreet imperdiet ex, id pellentesque massa vehicula sed. In in turpis metus. Donec quis pharetra leo, non sollicitudin sem. Vestibulum sapien turpis, eleifend vel maximus et, tempor maximus lectus.',
      type: 'FPS',
      createdAt: new Date(),
    },
    {
      id: '5',
      name: 'Battle Field 2',
      price: 150,
      coverImage: '/game.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis tellus et dui ullamcorper eleifend. Morbi in vehicula elit, quis fringilla metus. Sed convallis velit nec tellus bibendum, sit amet condimentum dolor dapibus. Ut mollis massa sapien, in suscipit purus tincidunt a. Aenean finibus, arcu id elementum bibendum, sem lacus euismod odio, ac sollicitudin nisi dui sit amet dolor. Fusce mollis, magna eget feugiat fermentum, odio urna tempor nibh, quis dictum sapien risus nec orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam ullamcorper ac turpis et congue. Praesent mauris turpis, sollicitudin consequat ornare nec, congue quis velit. Fusce laoreet imperdiet ex, id pellentesque massa vehicula sed. In in turpis metus. Donec quis pharetra leo, non sollicitudin sem. Vestibulum sapien turpis, eleifend vel maximus et, tempor maximus lectus.',
      type: 'FPS',
      createdAt: new Date(),
    },
    {
      id: '6',
      name: 'Naruto: Shippuden',
      price: 150,
      coverImage: '/game.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis tellus et dui ullamcorper eleifend. Morbi in vehicula elit, quis fringilla metus. Sed convallis velit nec tellus bibendum, sit amet condimentum dolor dapibus. Ut mollis massa sapien, in suscipit purus tincidunt a. Aenean finibus, arcu id elementum bibendum, sem lacus euismod odio, ac sollicitudin nisi dui sit amet dolor. Fusce mollis, magna eget feugiat fermentum, odio urna tempor nibh, quis dictum sapien risus nec orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam ullamcorper ac turpis et congue. Praesent mauris turpis, sollicitudin consequat ornare nec, congue quis velit. Fusce laoreet imperdiet ex, id pellentesque massa vehicula sed. In in turpis metus. Donec quis pharetra leo, non sollicitudin sem. Vestibulum sapien turpis, eleifend vel maximus et, tempor maximus lectus.',
      type: 'FPS',
      createdAt: new Date(),
    },
  ];

  getCarts() {
    return of(this.carts);
  }

  addItem(game: Game) {
    this.carts.push(game);
  }

  removeItem(id: string) {
    this.carts = this.carts.filter((item) => item.id !== id);
  }

  getTotalPrice() {
    return this.carts.reduce((total, item) => total + item.price, 0);
  }

  getItemCount() {
    return this.carts.length;
  }
}

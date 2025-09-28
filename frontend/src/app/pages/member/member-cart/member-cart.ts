import { Component, inject } from '@angular/core';
import { MemberCartCard } from '../../../components/member-cart/member-cart-card/member-cart-card';
import { CartService } from '../../../services/cart.service';
import { LucideAngularModule, TicketIcon } from 'lucide-angular';
import { MemberCartCoupon } from '../../../components/member-cart/member-cart-coupon/member-cart-coupon';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-member-cart',
  imports: [MemberCartCard, MemberCartCoupon, LucideAngularModule, AsyncPipe],
  templateUrl: './member-cart.html',
  styleUrl: './member-cart.css',
})
export class MemberCart {
  readonly TicketIcon = TicketIcon;

  cartService = inject(CartService);

  onDeleteCartItem(id: number) {
    this.cartService.removeItem(id);
  }
}

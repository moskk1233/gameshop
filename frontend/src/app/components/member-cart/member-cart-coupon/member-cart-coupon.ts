import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  LucideAngularModule,
  ReceiptTextIcon,
  TicketIcon,
} from 'lucide-angular';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-member-cart-coupon',
  imports: [LucideAngularModule, DecimalPipe],
  templateUrl: './member-cart-coupon.html',
  styleUrl: './member-cart-coupon.css',
})
export class MemberCartCoupon {
  readonly TicketIcon = TicketIcon;
  readonly ReceiptTextIcon = ReceiptTextIcon;

  cartService = inject(CartService);
}

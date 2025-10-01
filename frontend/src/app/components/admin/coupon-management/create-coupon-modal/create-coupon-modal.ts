import { Component, inject, output } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { LucideAngularModule, SaveIcon } from 'lucide-angular';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

export interface CreateCoupon {
  code: FormControl<string | null>;
  discount: FormControl<number | null>;
  limit: FormControl<number | null>;
}

@Component({
  selector: 'app-create-coupon-modal',
  imports: [LucideAngularModule, ReactiveFormsModule],
  templateUrl: './create-coupon-modal.html',
  styleUrl: './create-coupon-modal.css',
})
export class CreateCouponModal {
  readonly SaveIcon = SaveIcon;

  modalService = inject(ModalService);
  fb = inject(FormBuilder);

  couponForm = this.fb.group<CreateCoupon>({
    code: this.fb.control('', [Validators.required, Validators.minLength(1)]),
    discount: this.fb.control(null, [Validators.required, Validators.min(1)]),
    limit: this.fb.control(null, [Validators.required, Validators.min(1)]),
  });

  createCoupon = output<FormGroup<CreateCoupon>>();

  onCouponCreate() {
    this.createCoupon.emit(this.couponForm);
  }
}

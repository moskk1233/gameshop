import { Component, inject, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../../../services/modal.service';
import { LucideAngularModule, SaveIcon } from 'lucide-angular';

@Component({
  selector: 'app-edit-coupon-modal',
  imports: [FormsModule, LucideAngularModule],
  templateUrl: './edit-coupon-modal.html',
  styleUrl: './edit-coupon-modal.css',
})
export class EditCouponModal {
  readonly SaveIcon = SaveIcon;

  modalService = inject(ModalService);

  id = input.required<string>();
  code = model<string>();
  discount = model<number>();
  limit = model<number>();

  editSubmit = output<{
    code: string;
    discount: number;
    limit: number;
  }>();

  onEditSubmit() {
    this.editSubmit.emit({
      code: this.code()!,
      discount: this.discount()!,
      limit: this.limit()!,
    });
  }
}

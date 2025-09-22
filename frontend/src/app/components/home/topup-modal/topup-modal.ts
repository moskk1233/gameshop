import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TopupService } from '../../../services/topup.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-topup-modal',
  imports: [FormsModule],
  templateUrl: './topup-modal.html',
  styleUrl: './topup-modal.css',
})
export class TopupModal {
  topupService = inject(TopupService);

  submitClicked = output<number>();

  topupAmounts = [100, 200, 500];

  selectedAmount = signal<number | null>(null);
  customAmount = signal<number | null>(null);

  selectAmount = (amount: number) => {
    this.selectedAmount.set(amount);
  };

  handleOnSubmit = () => {
    if (!this.selectedAmount()) {
      Swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: 'กรุณาเลือกจำนวนเงินที่ต้องการเติม',
        icon: 'error',
      });
      return;
    }

    this.submitClicked.emit(this.selectedAmount()!);
  };
}

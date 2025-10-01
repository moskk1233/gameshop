import { Component, inject, signal } from '@angular/core';
import { AdminHeader } from '../../../components/admin/admin-header/admin-header';
import {
  LucideAngularModule,
  PenIcon,
  PlusIcon,
  TrashIcon,
} from 'lucide-angular';
import { ModalService } from '../../../services/modal.service';
import {
  CreateCoupon,
  CreateCouponModal,
} from '../../../components/admin/coupon-management/create-coupon-modal/create-coupon-modal';
import { EditCouponModal } from '../../../components/admin/coupon-management/edit-coupon-modal/edit-coupon-modal';
import { FormGroup } from '@angular/forms';
import swal from '../../../utils/swal';
import { CouponService } from '../../../services/coupon.service';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Coupon } from '../../../types';

@Component({
  selector: 'app-coupon-management',
  imports: [
    AdminHeader,
    LucideAngularModule,
    CreateCouponModal,
    EditCouponModal,
    AsyncPipe,
    DecimalPipe,
  ],
  templateUrl: './coupon-management.html',
  styleUrl: './coupon-management.css',
})
export class CouponManagement {
  readonly PlusIcon = PlusIcon;
  readonly TrashIcon = TrashIcon;
  readonly PenIcon = PenIcon;

  modalService = inject(ModalService);
  couponService = inject(CouponService);

  coupon = signal<Coupon | null>(null);

  coupons$ = this.couponService.getCoupons();

  async onCreateCouponSubmit(formGroup: FormGroup<CreateCoupon>) {
    if (formGroup.invalid) {
      swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: 'กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน',
        icon: 'error',
      });
      return;
    }

    const response = await this.couponService.createCoupon(
      formGroup.controls.code.value!,
      formGroup.controls.discount.value!,
      formGroup.controls.limit.value!,
    );

    this.modalService.isCreateCouponModalOpen.set(false);

    if (response.success) {
      swal.fire({
        title: 'สำเร็จ',
        text: response.message,
        icon: 'success',
      });
    } else {
      swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: response.message,
        icon: 'error',
      });
    }
  }

  async openEditCouponModal(id: string) {
    const coupon = await this.couponService.getCoupon(id);

    if (!coupon) {
      swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่พบคูปองนี้',
        icon: 'error',
      });
      return;
    }
    this.coupon.set(coupon);
    this.modalService.isEditCouponModalOpen.set(true);
  }

  async onEditCouponSubmit(
    id: string,
    coupon: {
      code: string;
      discount: number;
      limit: number;
    },
  ) {
    const response = await this.couponService.updateCoupon(id, coupon);
    this.modalService.isEditCouponModalOpen.set(false);

    if (response.success) {
      swal.fire({
        title: 'สำเร็จ',
        text: response.message,
        icon: 'success',
      });
    } else {
      swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: response.message,
        icon: 'error',
      });
    }
  }

  async onCouponDelete(id: string) {
    const swalRes = await swal.fire({
      title: 'คำเตือน',
      text: 'ต้องการลบคูปองนี้หรือไม่',
      icon: 'warning',
      showCancelButton: true,
    });

    if (!swalRes.isConfirmed) return;

    const response = await this.couponService.deleteCoupon(id);

    if (response.success) {
      swal.fire({
        title: 'สำเร็จ',
        text: response.message,
        icon: 'success',
      });
    } else {
      swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: response.message,
        icon: 'error',
      });
    }
  }
}

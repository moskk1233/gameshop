import { Component, inject, OnInit, signal } from '@angular/core';
import { AdminHeader } from '../../../components/admin/admin-header/admin-header';
import {
  LucideAngularModule,
  PenIcon,
  PlusIcon,
  TrashIcon,
} from 'lucide-angular';
import { CreateModal } from '../../../components/admin/category-management/create-modal/create-modal';
import { ModalService } from '../../../services/modal.service';
import { GameCategoryService } from '../../../services/game-category.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { GameCategory } from '../../../types';
import { AsyncPipe } from '@angular/common';
import { EditModal } from '../../../components/admin/category-management/edit-modal/edit-modal';

@Component({
  selector: 'app-category-management',
  imports: [
    AdminHeader,
    LucideAngularModule,
    CreateModal,
    EditModal,
    AsyncPipe,
  ],
  templateUrl: './category-management.html',
  styleUrl: './category-management.css',
})
export class CategoryManagement implements OnInit {
  readonly PlusIcon = PlusIcon;
  readonly TrashIcon = TrashIcon;
  readonly PenIcon = PenIcon;

  gameCategories$!: Observable<GameCategory[]>;

  modalService = inject(ModalService);
  gameCategoryService = inject(GameCategoryService);

  gameCategory = signal<GameCategory | null>(null);

  async onCategoryCreate(name: string) {
    const response = await this.gameCategoryService.createCategory({ name });
    if (response.success) {
      Swal.fire({
        title: 'สำเร็จ',
        text: response.message,
        icon: 'success',
      });
    } else {
      Swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: response.message,
        icon: 'error',
      });
    }
  }

  async onCategoryDelete(id: string) {
    const swalRes = await Swal.fire({
      title: 'แจ้งเตือน',
      text: 'ต้องการลบประเภทเกมใช่หรือไม่',
      icon: 'warning',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
      showCancelButton: true,
    });
    if (!swalRes.isConfirmed) return;

    const response = await this.gameCategoryService.deleteCategory(id);

    if (response.success) {
      Swal.fire({
        title: 'สำเร็จ',
        text: response.message,
        icon: 'success',
      });
    } else {
      Swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: response.message,
        icon: 'error',
      });
    }
  }

  async openEditGameCategoryModal(id: string) {
    const category = await this.gameCategoryService.getCategory(id);

    if (!category) {
      Swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่พบข้อมูลประเภทเกมที่จะแก้ไข',
        icon: 'error',
      });
      return;
    }
    this.gameCategory.set(category);
    this.modalService.isEditGameCategoryModalOpen.set(true);
  }

  async onCategoryEditSubmit(id: string, name: string) {
    const response = await this.gameCategoryService.updateCategory(id, {
      name,
    });
    this.modalService.isEditGameCategoryModalOpen.set(false);
    if (response.success) {
      Swal.fire({
        title: 'สำเร็จ',
        text: response.message,
        icon: 'success',
      });
    } else {
      Swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: response.message,
        icon: 'error',
      });
    }
  }

  ngOnInit(): void {
    this.gameCategories$ = this.gameCategoryService.getCategories();
  }
}

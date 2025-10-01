import { Component, inject, output, signal } from '@angular/core';
import { LucideAngularModule, SaveIcon } from 'lucide-angular';
import { ModalService } from '../../../../services/modal.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-modal',
  imports: [LucideAngularModule, FormsModule],
  templateUrl: './create-modal.html',
  styleUrl: './create-modal.css',
})
export class CreateModal {
  readonly SaveIcon = SaveIcon;

  modalService = inject(ModalService);
  name = signal('');

  categorySubmit = output<string>();

  onCategoryCreate() {
    this.categorySubmit.emit(this.name());
    this.modalService.isCreateGameCategoryModalOpen.set(false);
  }
}

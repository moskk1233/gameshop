import { Component, inject, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, SaveIcon } from 'lucide-angular';
import { ModalService } from '../../../../services/modal.service';
import { UpdateGameCategory } from '../../../../types';

@Component({
  selector: 'app-edit-modal',
  imports: [FormsModule, LucideAngularModule],
  templateUrl: './edit-modal.html',
  styleUrl: './edit-modal.css',
})
export class EditModal {
  readonly SaveIcon = SaveIcon;

  modalService = inject(ModalService);

  id = input.required<string>();
  name = model('');

  categorySubmit = output<UpdateGameCategory>();

  onCategorySubmit = () => {
    this.categorySubmit.emit({ name: this.name() });
  };
}

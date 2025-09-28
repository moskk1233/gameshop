import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  isCreateGameCategoryModalOpen = signal(false);
  isEditGameCategoryModalOpen = signal(false);
}

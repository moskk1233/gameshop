import { Component, inject } from '@angular/core';
import { MemberSidebar } from '../../components/common/member-sidebar/member-sidebar';
import { RouterOutlet } from '@angular/router';
import { TopupModal } from '../../components/home/topup-modal/topup-modal';
import { TopupService } from '../../services/topup.service';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-member-layout',
  imports: [MemberSidebar, RouterOutlet, TopupModal],
  templateUrl: './member-layout.html',
  styleUrl: './member-layout.css',
})
export class MemberLayout {
  topupService = inject(TopupService);
  userService = inject(UserService);

  onTopupSubmit = (amount: number) => {
    this.userService.userProfile.wallet += amount;
    this.topupService.set(false);
    Swal.fire({
      title: 'สำเร็จ',
      text: 'เติมเงินสำเร็จ',
      icon: 'success',
    });
  };
}

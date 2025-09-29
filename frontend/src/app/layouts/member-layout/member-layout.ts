import { Component, inject } from '@angular/core';
import { MemberSidebar } from '../../components/common/member-sidebar/member-sidebar';
import { RouterOutlet } from '@angular/router';
import { TopupModal } from '../../components/home/topup-modal/topup-modal';
import { TopupService } from '../../services/topup.service';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { switchMap, take } from 'rxjs';

@Component({
  selector: 'app-member-layout',
  imports: [MemberSidebar, RouterOutlet, TopupModal],
  templateUrl: './member-layout.html',
  styleUrl: './member-layout.css',
})
export class MemberLayout {
  topupService = inject(TopupService);
  userService = inject(UserService);
  authService = inject(AuthService);

  onTopupSubmit = (amount: number) => {
    this.authService.currentUser$
      .pipe(
        take(1),
        switchMap((user) => this.userService.topup(user!.id, amount)),
      )
      .subscribe((response) => {
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
      });
  };
}

import { Component } from '@angular/core';
import { MemberSidebar } from '../../components/common/member-sidebar/member-sidebar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-member-layout',
  imports: [MemberSidebar, RouterOutlet],
  templateUrl: './member-layout.html',
  styleUrl: './member-layout.css',
})
export class MemberLayout {
}

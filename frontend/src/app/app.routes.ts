import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { MemberLayout } from './layouts/member-layout/member-layout';

export const routes: Routes = [
  {
    path: "",
    component: MemberLayout,
    children: [
      {
        path: "",
        component: Home
      }
    ]
  }
];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from '@core/security/auth.guard';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/login.module')
        .then(m => m.LoginModule)
  }, {
    path: '',
    component: LayoutComponent,
    // children: [
    //   {
    //     path: 'my-profile',
    //     component: MyProfileComponent,
    //     canActivate: [AuthGuard],
    //   }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

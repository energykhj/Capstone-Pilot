import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import { PostComponent } from './components/post/post.component';
import { AuthService } from './Auth/auth.service';

const routes: Routes = [
  {path: 'main', component:MainComponent},
  {path: '', redirectTo: '/main', pathMatch:'full'},
  {path: 'login', component:LogInComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'post', component:PostComponent, canActivate: [AuthService]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// export class RoutingModule { }

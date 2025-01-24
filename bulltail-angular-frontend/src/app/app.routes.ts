import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { authGuard } from '../services/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { EmodictComponent } from './components/emodict/emodict.component';
import { ImgpredComponent } from './components/imgpred/imgpred.component';

export const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'',
    component:LayoutComponent,
    canActivate:[authGuard],
    children:[
      {
        path:'home',
        component:HomeComponent
      },
      {
        path:'emodict',
        component:EmodictComponent
      },
      {
        path:'imgpred',
        component:ImgpredComponent
      }
    ]
  }
];

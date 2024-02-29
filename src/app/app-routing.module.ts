import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from './components/start-page/start-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';

export enum Paths {
  start = 'start',
  main = 'main',
}

const routes: Routes = [
  { path: '', redirectTo: Paths.start, pathMatch: 'full' },
  { path: Paths.start, component: StartPageComponent},
  { path: Paths.main, component: MainPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

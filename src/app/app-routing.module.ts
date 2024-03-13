import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ReviewComponent } from './review/review.component';
import { FrontpageComponent } from './frontpage/frontpage.component';


const routes: Routes = [
  { path : 'home', component: HomeComponent },
  { path : 'about', component : AboutComponent},
  { path : 'review', component : ReviewComponent},
  { path : 'frontpage', component : FrontpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

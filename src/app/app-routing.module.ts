import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngeboteComponent } from './components/pages/angebote/angebote.component';
import { PortfolioComponent } from './components/pages/portfolio/portfolio.component';
import { StartComponent } from './components/pages/start/start.component';

const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'angebote', component: AngeboteComponent },
  { path: 'portfolio', component: PortfolioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

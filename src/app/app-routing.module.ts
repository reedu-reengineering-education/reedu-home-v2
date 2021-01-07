import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhilosophieComponent } from './components/pages/about-us/philosophie/philosophie.component';
import { AngeboteComponent } from './components/pages/angebote/angebote.component';
import { PortfolioComponent } from './components/pages/portfolio/portfolio.component';
import { StartComponent } from './components/pages/start/start.component';

const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'angebote', component: AngeboteComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'philosophie', component: PhilosophieComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

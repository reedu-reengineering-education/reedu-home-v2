import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuszeichnungenComponent } from './components/pages/about-us/auszeichnungen/auszeichnungen.component';
import { JobItemComponent } from './components/pages/about-us/job-item/job-item.component';
import { JobsComponent } from './components/pages/about-us/jobs/jobs.component';
import { PhilosophieComponent } from './components/pages/about-us/philosophie/philosophie.component';
import { TeamComponent } from './components/pages/about-us/team/team.component';
import { AngeboteComponent } from './components/pages/angebote/angebote.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { ForschungComponent } from './components/pages/forschung/forschung.component';
import { ImprintComponent } from './components/pages/imprint/imprint.component';
import { PortfolioItemComponent } from './components/pages/portfolio-item/portfolio-item.component';
import { PortfolioComponent } from './components/pages/portfolio/portfolio.component';
import { PrivacyComponent } from './components/pages/privacy/privacy.component';
import { StartComponent } from './components/pages/start/start.component';
import { WorkshopsComponent } from './components/pages/workshops/workshops.component';

const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'angebote', component: AngeboteComponent },
  { path: 'angebote/:id', component: AngeboteComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'portfolio/:id', component: PortfolioItemComponent },
  { path: 'forschung', component: ForschungComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'philosophie', component: PhilosophieComponent },
  { path: 'auszeichnungen', component: AuszeichnungenComponent },
  { path: 'team', component: TeamComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'job/:filename', component: JobItemComponent },
  { path: 'workshops', component: WorkshopsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

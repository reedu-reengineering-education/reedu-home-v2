import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngeboteComponent } from './components/pages/angebote/angebote.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { ImprintComponent } from './components/pages/imprint/imprint.component';
import { PortfolioComponent } from './components/pages/portfolio/portfolio.component';
import { PrivacyComponent } from './components/pages/privacy/privacy.component';
import { StartComponent } from './components/pages/start/start.component';

const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'angebote', component: AngeboteComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'contact', component: ContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

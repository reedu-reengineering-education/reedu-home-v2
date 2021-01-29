import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StartComponent } from './components/pages/start/start.component';
import { AngeboteComponent } from './components/pages/angebote/angebote.component';
import { PortfolioComponent } from './components/pages/portfolio/portfolio.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { ImprintComponent } from './components/pages/imprint/imprint.component';
import { PrivacyComponent } from './components/pages/privacy/privacy.component';
import { PhilosophieComponent } from './components/pages/about-us/philosophie/philosophie.component';
import { AuszeichnungenComponent } from './components/pages/about-us/auszeichnungen/auszeichnungen.component';
import { TeamComponent } from './components/pages/about-us/team/team.component';
import { ContactCardComponent } from './components/contact-card/contact-card.component';
import { ForschungComponent } from './components/pages/forschung/forschung.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { PortfolioItemComponent } from './components/pages/portfolio-item/portfolio-item.component';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    StartComponent,
    AngeboteComponent,
    PortfolioComponent,
    FooterComponent,
    ContactComponent,
    ImprintComponent,
    PrivacyComponent,
    PhilosophieComponent,
    AuszeichnungenComponent,
    TeamComponent,
    ContactCardComponent,
    ForschungComponent,
    TabsComponent,
    ProjectCardComponent,
    PortfolioItemComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'de',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

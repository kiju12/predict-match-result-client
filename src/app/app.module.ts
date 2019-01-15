import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {MainComponent} from './components/main/main.component';
import {AddTeamComponent} from './components/add-team/add-team.component';
import {AddMatchComponent} from './components/add-match/add-match.component';
import {RouterModule, Routes} from '@angular/router';
import {MainService} from './main.service';
import {FormsModule} from '@angular/forms';
import { PositionPipe } from './pipes/position.pipe';
import { TeamSelectComponent } from './components/team-select/team-select.component';
import {CommonModule} from '@angular/common';

const appRoutes: Routes = [
  {path: 'main', component: MainComponent},
  {path: 'add-team', component: AddTeamComponent},
  {path: 'add-match', component: AddMatchComponent},
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AddTeamComponent,
    AddMatchComponent,
    PositionPipe,
    TeamSelectComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

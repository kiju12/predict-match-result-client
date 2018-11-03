import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'predict-match-result-client';
  teams: TeamData[] = [];

  constructor(private http: HttpClient) {
  }

  loadTeams() {
    this.http
      .get<TeamData[]>('http://localhost:8080/api/teams/availibleToPredict')
      .subscribe(teams => {
        this.teams = teams;
      });
  }

  deleteTeams() {
    this.teams = [];
  }
}

interface TeamData {
  id: number;
  name: string;
  linkToImage: string;
}

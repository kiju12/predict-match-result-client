import {Component, EventEmitter, OnInit} from '@angular/core';
import {MainService} from '../../main.service';
import {Team} from '../../model/team';
import {MatchResult} from '../../model/result';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  teamLoading = true;

  teams: Team[] = [];

  homeTeamId = 0;
  homeTeamData: Team;

  awayTeamId = 0;
  awayTeamData: Team;

  predictResultMessage: string;

  resetEvent: EventEmitter<null> = new EventEmitter();

  constructor(private service: MainService) {
  }

  ngOnInit() {
    this.service
      .getTeamsAvailibleToPredict()
      .subscribe(teams => {
        this.teams = teams;
        this.teamLoading = false;
      });
  }

  onHomeTeamSelectChange = (id) => {
    this.homeTeamId = id;
    if (this.homeTeamData) {
      this.homeTeamData.selected = false;
    }

    this.homeTeamData = this.teams.find(team => team.id == this.homeTeamId);

    if (this.homeTeamData) {
      this.homeTeamData.selected = true;
    }
  };

  onAwayTeamSelectChange = (id) => {
    this.awayTeamId = id;
    if (this.awayTeamData) {
      this.awayTeamData.selected = false;
    }

    this.awayTeamData = this.teams.find(team => team.id == this.awayTeamId);

    if (this.awayTeamData) {
      this.awayTeamData.selected = true;
    }
  };

  predict() {
    this.service.predict(this.homeTeamId, this.awayTeamId)
      .subscribe(response => this.onPredict(response.result as MatchResult));
  }

  private onPredict(result: MatchResult) {
    switch (result) {

      case MatchResult.HOME: {
        this.predictResultMessage = `Wytypowano drużynę ${this.homeTeamData.name}`;
        break;
      }

      case MatchResult.AWAY: {
        this.predictResultMessage = `Wytypowano drużynę ${this.awayTeamData.name}`;
        break;
      }

      case MatchResult.DRAW: {
        this.predictResultMessage = 'Wytypowano remis';
        break;
      }

      case MatchResult.I_DONT_KNOW: {
        this.predictResultMessage = 'Nie można wytypować, wybierz inne drużyny';
        break;
      }
    }
  }

  reset() {
    this.homeTeamData.selected = false;
    this.awayTeamData.selected = false;

    this.homeTeamId = 0;
    delete this.homeTeamData;

    this.awayTeamId = 0;
    delete this.awayTeamData;

    delete this.predictResultMessage;
    this.resetEvent.emit(null);
  }

}

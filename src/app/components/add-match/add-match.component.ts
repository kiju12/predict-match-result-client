import {Component, ElementRef, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {MainService} from '../../main.service';
import {Team} from '../../model/team';
import {MatchData} from '../../model/match';

@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.css']
})
export class AddMatchComponent implements OnInit {

  matchesSaved = false;

  @ViewChild('homeInput') homeInput: ElementRef;

  resetEvent: EventEmitter<null> = new EventEmitter();

  teamsLoading = true;

  homeTeamId = 0;
  awayTeamId = 0;

  teams: Team[] = [];

  homeGoals = 0;
  awayGoals = 0;
  matchesData: MatchData[] = [];

  constructor(private service: MainService) {
  }

  ngOnInit() {
    this.service.getAllTeamNames().subscribe(teams => {
      this.teams = teams;
      this.teamsLoading = false;
    });
  }

  send() {
    this.service.saveMatches(this.homeTeamId, this.awayTeamId, this.matchesData)
      .subscribe(res => this.onMatchesSaved());
  }

  private onMatchesSaved() {
    this.matchesSaved = true;
    this.homeGoals = 0;
    this.awayGoals = 0;
    this.matchesData = [];
    this.resetEvent.emit(null);
  }

  remove(matchData) {
    this.matchesData = this.matchesData.filter(eachMatchData => eachMatchData !== matchData);
  }

  add() {
    if (this.homeGoals >= 0 && this.awayGoals >= 0) {
      this.matchesData.push({
        homeGoals: this.homeGoals,
        awayGoals: this.awayGoals
      });
    }

    this.homeGoals = 0;
    this.awayGoals = 0;
    this.homeInput.nativeElement.focus();
  }

  onHomeTeamSelectChange = (id) => {
    let find = this.teams.find(team => team.id == this.homeTeamId);
    if (find) {
      find.selected = false;
    }

    this.homeTeamId = id;

    let find2 = this.teams.find(team => team.id == this.homeTeamId);
    if (find2) {
      find2.selected = true;
    }
  };

  onAwayTeamSelectChange = (id) => {
    let find = this.teams.find(team => team.id == this.awayTeamId);
    if (find) {
      find.selected = false;
    }

    this.awayTeamId = id;

    let find2 = this.teams.find(team => team.id == this.awayTeamId);
    if (find2) {
      find2.selected = true;
    }
  };


}

import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FetchedTeam, Team} from './model/team';
import {tap} from 'rxjs/operators';
import {MatchData} from './model/match';


@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) {
  }

  getTeamsAvailibleToPredict(): Observable<Team[]> {
    return this.http.get<Team[]>('/api/teams');
  }

  predict(homeTeamId: number, awayTeamId: number) {
    return this.http.get<any>('/api/predict',
      {
        params: new HttpParams()
          .set('homeTeamId', `${homeTeamId}`)
          .set('awayTeamId', `${awayTeamId}`)
      });
  }

  getAllTeamNames() {
    return this.http.get<any>('/api/teams/names');
  }

  saveMatches(homeTeamId: number, awayTeamId: number, matchesData: MatchData[]) {
    return this.http.post<any>('/api/teams/matches', {
      homeTeamId: homeTeamId,
      awayTeamId: awayTeamId,
      matches: matchesData
    });
  }

  fetchTeam(fifaId: number, defNumber: number, helpNumber: number, attNumber: number) {
    return this.http.post<FetchedTeam>('/api/teams', {
      fifaId: fifaId,
      formation: {
        numerOfDefensivePlayers: defNumber,
        numerOfHelpPlayers: helpNumber,
        numerOfAttackPlayers: attNumber
      }
    });
  }
}

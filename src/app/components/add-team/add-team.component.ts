import {Component, OnInit} from '@angular/core';
import {MainService} from '../../main.service';
import {FetchedTeam} from '../../model/team';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {

  fetchingInProgress = false;

  fetchedTeam: FetchedTeam;
  fetchError = false;

  fifaId = 0;
  defNumber = 0;
  helpNumber = 0;
  attNumber = 0;

  constructor(private service: MainService) {
  }

  ngOnInit() {
  }

  reset() {
    this.fetchingInProgress = false;
    delete this.fetchedTeam;
    this.fetchError = false;
    this.fifaId = 0;
    this.defNumber = 0;
    this.helpNumber = 0;
    this.attNumber = 0;
  }

  fetchTeam() {
    this.fetchingInProgress = true;
    this.service.fetchTeam(this.fifaId, this.defNumber, this.helpNumber, this.attNumber)
      .subscribe(fetchedTeam => {
        this.fetchedTeam = fetchedTeam;
        this.fetchingInProgress = false;
        this.fetchError = false;
      }, err => {
        this.reset();
        this.fetchingInProgress = false;
        this.fetchError = true;
      });
  }

  isNotValid() {
    return this.fifaId < 1 ||
      this.defNumber < 1 ||
      this.helpNumber < 1 ||
      this.attNumber < 1 ||
      this.defNumber + this.helpNumber + this.attNumber !== 10;
  }
}

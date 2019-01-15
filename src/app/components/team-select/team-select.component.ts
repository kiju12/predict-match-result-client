import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Team} from '../../model/team';

@Component({
  selector: 'app-team-select',
  templateUrl: './team-select.component.html',
  styleUrls: ['./team-select.component.css']
})
export class TeamSelectComponent implements OnInit {

  @Input() teams: Team[];
  @Input() disable: boolean;
  @Input() resetEvent: EventEmitter<null> = new EventEmitter();
  @Output() homeSelectChange: EventEmitter<number> = new EventEmitter();
  @Output() awaySelectChange: EventEmitter<number> = new EventEmitter();


  homeTeamId = 0;
  awayTeamId = 0;

  onHomeTeamSelectChange() {
    this.homeSelectChange.emit(this.homeTeamId);
  }

  onAwayTeamSelectChange() {
    this.awaySelectChange.emit(this.awayTeamId);
  }

  constructor() { }

  ngOnInit() {
    this.resetEvent.subscribe(_ => {
      this.homeTeamId = 0;
      this.awayTeamId = 0;
    })
  }

}

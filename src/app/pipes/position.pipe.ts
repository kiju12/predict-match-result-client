import { Pipe, PipeTransform } from '@angular/core';
import { Position } from '../model/team';

@Pipe({
  name: 'position'
})
export class PositionPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case Position.GOALKEEPER: {
        return 'BR';
      }
      case Position.DEFENCE: {
        return 'OBR';
      }
      case Position.HELP: {
        return 'POM';
      }
      case Position.ATTACK: {
        return 'ATT';
      }
    }
  }

}

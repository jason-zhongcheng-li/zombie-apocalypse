import { Coordinate } from './Coordinate';
import { Creature } from './Creature';

export class Zombie extends Creature {

  /*
    Since creature can be transformed to zombie,
    then Zombie class extends Creature class.
  */
  constructor(coordinate: Coordinate) {
    super(coordinate);
  }

  /*
    Zombie inherites getter of coordinate from parent class Creature.
    It has setter of coordinate which is not accessable to Creature.
    Which means Zombie is able to move/walk while Creature is not.
  */
  public setCoordinate(coordinate: Coordinate) {
    this.coordinate = coordinate;
  }
}